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
package ai.startree.thirdeye.datasource.comparison;

import ai.startree.thirdeye.datasource.comparison.Row.Metric;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class TimeOnTimeComparisonResponse {

  int numRows;

  Set<String> metrics = new TreeSet<>();

  Set<String> dimensions = new TreeSet<>();

  private final List<Row> rows;

  public TimeOnTimeComparisonResponse(List<Row> rows) {
    this.rows = rows;
    for (Row row : rows) {
      for (Metric metric : row.metrics) {
        metrics.add(metric.metricName);
      }
      dimensions.add(row.dimensionName);
    }
    numRows = rows.size();
  }

  public int getNumRows() {
    return numRows;
  }

  public Set<String> getMetrics() {
    return metrics;
  }

  public Set<String> getDimensions() {
    return dimensions;
  }

  public Row getRow(int index) {
    return rows.get(index);
  }

  static class Builder {

    List<Row> rows = new ArrayList<>();

    public void add(Row row) {
      rows.add(row);
    }

    TimeOnTimeComparisonResponse build() {
      return new TimeOnTimeComparisonResponse(rows);
    }
  }
}
