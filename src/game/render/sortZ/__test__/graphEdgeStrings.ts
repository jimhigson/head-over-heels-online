import { type Graph } from "../../../../utils/graph/Graph";

/**
 * a graph's edges as sorted `"backId->frontId"` strings - a canonical,
 * order-insensitive representation for comparing edge SETS (eg the pipeline's
 * against the brute-force oracle's) and for snapshots. Broken flags are
 * excluded: they belong to toposort, not edge finding
 */
export const graphEdgeStrings = <N extends { id: string }>(
  graph: Graph<N>,
): string[] => {
  const edges: string[] = [];
  const n = graph.nodeCount;
  for (let i = 0; i < n; i++) {
    const behind = graph.nodeAt(i);
    graph.forEachEdgeFrom(behind, (front) => {
      edges.push(`${behind.id}->${front.id}`);
    });
  }
  return edges.sort();
};
