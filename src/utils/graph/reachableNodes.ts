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
    const outgoing = graph.get(queue[head]);
    if (outgoing === undefined) {
      continue;
    }
    for (const next of outgoing.keys()) {
      if (!reached.has(next)) {
        reached.add(next);
        queue.push(next);
      }
    }
  }
  return reached;
};
