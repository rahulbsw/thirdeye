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
package ai.startree.thirdeye.detectionpipeline;

import static ai.startree.thirdeye.spi.util.SpiUtils.optional;
import static java.util.Collections.emptyList;

import ai.startree.thirdeye.spi.datalayer.dto.PlanNodeBean;
import ai.startree.thirdeye.spi.datalayer.dto.PlanNodeBean.InputBean;
import ai.startree.thirdeye.spi.detection.v2.DetectionResult;
import ai.startree.thirdeye.spi.detection.v2.Operator;
import ai.startree.thirdeye.spi.detection.v2.PlanNode;
import com.google.common.annotations.VisibleForTesting;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import org.joda.time.Interval;

@Singleton
public class PlanExecutor {

  public static final String ROOT_OPERATOR_KEY = "root";

  private final PlanNodeFactory planNodeFactory;

  @Inject
  public PlanExecutor(final PlanNodeFactory planNodeFactory) {
    this.planNodeFactory = planNodeFactory;
  }

  @VisibleForTesting
  public static void executePlanNode(final Map<String, PlanNode> pipelinePlanNodes,
      final Map<ContextKey, DetectionResult> context,
      final PlanNode node)
      throws Exception {
    for (final InputBean input : optional(node.getPlanNodeInputs()).orElse(emptyList())) {
      final ContextKey contextKey = key(input.getSourcePlanNode(), input.getSourceProperty());
      if (!context.containsKey(contextKey)) {
        final PlanNode inputPlanNode = pipelinePlanNodes.get(input.getSourcePlanNode());
        executePlanNode(pipelinePlanNodes, context, inputPlanNode);
      }
      if (!context.containsKey(contextKey)) {
        throw new RuntimeException("Missing context key - " + contextKey);
      }
      node.setInput(input.getTargetProperty(), context.get(contextKey));
    }
    final Operator operator = node.buildOperator();
    operator.execute();
    final Map<String, DetectionResult> outputs = operator.getOutputs();
    for (final Entry<String, DetectionResult> output : outputs.entrySet()) {
      context.put(key(node.getName(), output.getKey()), output.getValue());
    }
  }

  @VisibleForTesting
  static ContextKey key(final String name, final String key) {
    return new ContextKey(name, key);
  }

  public static Map<String, DetectionResult> getOutput(
      final Map<ContextKey, DetectionResult> context, final String nodeName) {
    final Map<String, DetectionResult> results = new HashMap<>();
    for (final ContextKey contextKey : context.keySet()) {
      if (contextKey.getNodeName().equals(nodeName)) {
        results.put(contextKey.getKey(), context.get(contextKey));
      }
    }
    return results;
  }

  /**
   * Main interface for running the pipeline.
   *
   * @param planNodeBeans The pipeline DAG as a list of nodes
   * @return The result map
   * @throws Exception All exceptions are to be handled by upstream consumer.
   */
  public Map<String, DetectionResult> runPipeline(final List<PlanNodeBean> planNodeBeans,
      final Interval detectionInterval)
      throws Exception {
    /* map of all the plan nodes constructed from beans(persisted objects) */
    final Map<String, PlanNode> pipelinePlanNodes = buildPlanNodeMap(
        planNodeBeans,
        detectionInterval);

    /* The context stores all the outputs from all the nodes */
    final Map<ContextKey, DetectionResult> context = new HashMap<>();

    /* Execute the DAG */
    final PlanNode rootNode = pipelinePlanNodes.get(ROOT_OPERATOR_KEY);
    executePlanNode(pipelinePlanNodes, context, rootNode);

    /* Return the output */
    return getOutput(context, rootNode.getName());
  }

  @VisibleForTesting
  Map<String, PlanNode> buildPlanNodeMap(final List<PlanNodeBean> planNodeBeans,
      final Interval detectionInterval) {
    final Map<String, PlanNode> pipelinePlanNodes = new HashMap<>();
    for (final PlanNodeBean planNodeBean : planNodeBeans) {
      final PlanNode planNode = planNodeFactory.build(
          planNodeBean,
          detectionInterval,
          pipelinePlanNodes
      );

      pipelinePlanNodes.put(planNodeBean.getName(), planNode);
    }
    return pipelinePlanNodes;
  }
}
