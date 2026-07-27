import { type Graph } from "../../../../utils/graph/Graph";
import { type ZOrderGraph } from "../ZOrderGraph";

/**
 * a ZOrderGraph's edges as sorted `"backId->frontId"` strings - a canonical,
 * order-insensitive representation for comparing edge SETS (eg against the
 * brute-force oracle) and for snapshots. Broken flags are excluded: they
 * belong to toposort, not edge finding
 */
export const zOrderGraphEdgeStrings = <N extends { id: string }>(
  graph: ZOrderGraph<N>,
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

/**
 * the Map-of-Maps oracle graph's edges, in the same canonical form as
 * {@link zOrderGraphEdgeStrings} - for comparing the brute-force oracle
 * against the pipeline's edge set
 */
export const oracleGraphEdgeStrings = <N extends { id: string }>(
  graph: Graph<N, boolean>,
): string[] =>
  [...graph]
    .flatMap(([behind, fronts]) =>
      [...fronts.keys()].map((front) => `${behind.id}->${front.id}`),
    )
    .sort();
