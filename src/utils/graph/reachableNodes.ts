import { type Graph } from "./Graph";

/**
 * every node reachable from `seeds` by following edges in their own direction
 * (the seeds themselves are included).
 */
export const reachableNodes = <N, E>(
  graph: Graph<N, E>,
  seeds: Iterable<N>,
): Set<N> => {
  const reached = new Set<N>();
  const queue: N[] = [];
  for (const seed of seeds) {
    if (!reached.has(seed)) {
      reached.add(seed);
      queue.push(seed);
    }
  }
  for (let head = 0; head < queue.length; head++) {
    graph.forEachEdgeFrom(queue[head], (to) => {
      if (!reached.has(to)) {
        reached.add(to);
        queue.push(to);
      }
    });
  }
  return reached;
};
