/** a directed graph: each node maps to the nodes it has an edge to, with edge data */
export type Graph<Node, Edge> = Map<Node, Map<Node, Edge>>;

/**
 * add a directed edge `from`→`to` carrying `edgeData`.
 * this is a noop if the edge already exists
 */
export const addEdge = <N, E>(
  edges: Graph<N, E>,
  from: N,
  to: N,
  edgeData: E,
) => {
  if (!edges.has(from)) {
    edges.set(from, new Map());
  }
  edges.get(from)!.set(to, edgeData);
  return edges; // for chaining
};
