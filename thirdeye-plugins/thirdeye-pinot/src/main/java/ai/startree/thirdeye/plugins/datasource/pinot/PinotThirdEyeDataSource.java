/*
 * Copyright 2022 StarTree Inc
 *
 * Licensed under the StarTree Community License (the "License"); you may not use
 * this file except in compliance with the License. You may obtain a copy of the
 * License at http://www.startree.ai/legal/startree-community-license
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT * WARRANTIES OF ANY KIND,
 * either express or implied.
 * See the License for the specific language governing permissions and limitations under
 * the License.
 */
package ai.startree.thirdeye.plugins.datasource.pinot;

import static java.util.Objects.requireNonNull;

import ai.startree.thirdeye.spi.Constants;
import ai.startree.thirdeye.spi.datalayer.dto.DatasetConfigDTO;
import ai.startree.thirdeye.spi.datasource.DataSourceRequest;
import ai.startree.thirdeye.spi.datasource.RelationalQuery;
import ai.startree.thirdeye.spi.datasource.ThirdEyeDataSource;
import ai.startree.thirdeye.spi.datasource.ThirdEyeDataSourceContext;
import ai.startree.thirdeye.spi.datasource.macro.SqlExpressionBuilder;
import ai.startree.thirdeye.spi.datasource.macro.SqlLanguage;
import ai.startree.thirdeye.spi.datasource.resultset.ThirdEyeResultSet;
import ai.startree.thirdeye.spi.datasource.resultset.ThirdEyeResultSetGroup;
import ai.startree.thirdeye.spi.detection.v2.DataTable;
import com.google.common.base.Preconditions;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.google.common.cache.Weigher;
import com.google.common.collect.ImmutableList;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import javax.inject.Inject;
import javax.inject.Singleton;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class PinotThirdEyeDataSource implements ThirdEyeDataSource {

  public static final String HTTP_SCHEME = "http";
  public static final String HTTPS_SCHEME = "https";
  private static final Logger LOG = LoggerFactory.getLogger(PinotThirdEyeDataSource.class);

  private final String name;
  private final SqlExpressionBuilder sqlExpressionBuilder;
  private final SqlLanguage sqlLanguage;
  private final PinotDatasetOnboarder pinotDatasetOnboarder;
  private final LoadingCache<RelationalQuery, ThirdEyeResultSetGroup> pinotResponseCache;
  private final PinotConnectionManager pinotConnectionManager;

  @Inject
  public PinotThirdEyeDataSource(
      final ThirdEyeDataSourceContext context,
      final SqlExpressionBuilder sqlExpressionBuilder,
      final PinotSqlLanguage sqlLanguage,
      final PinotDatasetOnboarder pinotDatasetOnboarder,
      final PinotConnectionManager pinotConnectionManager,
      final PinotResponseCacheLoader pinotResponseCacheLoader) {
    this.sqlExpressionBuilder = sqlExpressionBuilder;
    this.sqlLanguage = sqlLanguage;
    this.pinotDatasetOnboarder = pinotDatasetOnboarder;

    this.name = context.getDataSourceDTO().getName();
    this.pinotConnectionManager = pinotConnectionManager;

    /* Uses LoadingCache to cache queries */
    pinotResponseCache = buildResponseCache(pinotResponseCacheLoader);
  }


  public static LoadingCache<RelationalQuery, ThirdEyeResultSetGroup> buildResponseCache(
      CacheLoader cacheLoader) {
    Preconditions.checkNotNull(cacheLoader, "A cache loader is required.");

    // ResultSetGroup Cache. The size of this cache is limited by the total number of buckets in all ResultSetGroup.
    // We estimate that 1 bucket (including overhead) consumes 1KB and this cache is allowed to use up to 50% of max
    // heap space.
    long maxBucketNumber = getApproximateMaxBucketNumber(
        Constants.DEFAULT_HEAP_PERCENTAGE_FOR_RESULTSETGROUP_CACHE);
    LOG.debug("Max bucket number for {}'s cache is set to {}", cacheLoader,
        maxBucketNumber);

    return CacheBuilder.newBuilder()
        .expireAfterWrite(15, TimeUnit.MINUTES)
        .maximumWeight(maxBucketNumber)
        .weigher(
            (Weigher<RelationalQuery, ThirdEyeResultSetGroup>) (relationalQuery, resultSetGroup) -> {
              int resultSetCount = resultSetGroup.size();
              int weight = 0;
              for (int idx = 0; idx < resultSetCount; ++idx) {
                ThirdEyeResultSet resultSet = resultSetGroup.get(idx);
                weight += ((resultSet.getColumnCount() + resultSet.getGroupKeyLength()) * resultSet
                    .getRowCount());
              }
              return weight;
            })
        .build(cacheLoader);
  }

  private static long getApproximateMaxBucketNumber(int percentage) {
    long jvmMaxMemoryInBytes = Runtime.getRuntime().maxMemory();
    if (jvmMaxMemoryInBytes == Long.MAX_VALUE) { // Check upper bound
      jvmMaxMemoryInBytes = Constants.DEFAULT_UPPER_BOUND_OF_RESULTSETGROUP_CACHE_SIZE_IN_MB
          * FileUtils.ONE_MB; // MB to Bytes
    } else { // Check lower bound
      long lowerBoundInBytes = Constants.DEFAULT_LOWER_BOUND_OF_RESULTSETGROUP_CACHE_SIZE_IN_MB
          * FileUtils.ONE_MB; // MB to Bytes
      if (jvmMaxMemoryInBytes < lowerBoundInBytes) {
        jvmMaxMemoryInBytes = lowerBoundInBytes;
      }
    }
    return (jvmMaxMemoryInBytes / 102400) * percentage;
  }

  @Override
  public void init(final ThirdEyeDataSourceContext context) {
    /* everything is now done in the constructor */
  }

  @Override
  public String getName() {
    return name;
  }

  /**
   * Returns the cached ResultSetGroup corresponding to the given Pinot query.
   *
   * @param pinotQuery the query that is specifically constructed for Pinot.
   * @return the corresponding ResultSetGroup to the given Pinot query.
   * @throws ExecutionException is thrown if failed to connect to Pinot or gets results from
   *     Pinot.
   */
  public ThirdEyeResultSetGroup executeSQL(final PinotQuery pinotQuery) throws ExecutionException {
    requireNonNull(pinotResponseCache,
        String.format("%s doesn't connect to Pinot or cache is not initialized.", getName()));

    try {
      return pinotResponseCache.get(pinotQuery);
    } catch (final ExecutionException e) {
      LOG.error("Failed to execute PQL: {}", pinotQuery.getQuery());
      throw e;
    }
  }

  @Override
  public List<String> getDatasets() throws Exception {
    throw new UnsupportedOperationException();
  }

  @Override
  public DataTable fetchDataTable(final DataSourceRequest request) throws Exception {
    try {
      // Use pinot SQL.
      final ThirdEyeResultSet thirdEyeResultSet = executeSQL(new PinotQuery(
          request.getQuery(),
          request.getTable(),
          true)).get(0);
      return new ThirdEyeResultSetDataTable(thirdEyeResultSet);
    } catch (final ExecutionException e) {
      throw e;
    }
  }

  @Override
  public boolean validate() {
    try {
      // Table name required to execute query against pinot broker.
      final ImmutableList<String> allTables = pinotDatasetOnboarder.getAllTables();
      if (allTables.isEmpty()) {
        /* Can't proceed if there are no tables but a successful response is returned as positive */
        return true;
      }

      final String table = allTables.get(0);
      final String query = String.format("select 1 from %s", table);

      final PinotQuery pinotQuery = new PinotQuery(query, table, true);

      /* Disable caching for validate queries */
      pinotResponseCache.refresh(pinotQuery);
      final ThirdEyeResultSetGroup result = executeSQL(pinotQuery);
      return result.get(0).getRowCount() == 1;
    } catch (final ExecutionException | IOException | ArrayIndexOutOfBoundsException e) {
      LOG.error("Exception while performing pinot datasource validation.", e);
    }
    return false;
  }

  @Override
  public List<DatasetConfigDTO> onboardAll() {
    try {
      return pinotDatasetOnboarder.onboardAll(name);
    } catch (final IOException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public DatasetConfigDTO onboardDataset(final String datasetName) {
    try {
      return pinotDatasetOnboarder.onboardTable(datasetName, name);
    } catch (final IOException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void close() {
    if (pinotConnectionManager != null) {
      pinotConnectionManager.close();
    }
  }

  @Override
  public SqlLanguage getSqlLanguage() {
    return sqlLanguage;
  }

  @Override
  public SqlExpressionBuilder getSqlExpressionBuilder() {
    return sqlExpressionBuilder;
  }
}
