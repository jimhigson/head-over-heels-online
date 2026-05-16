export type Graph<Node, Edge> = Map<Node, Map<Node, Edge>>;

export type ZGraph<NodeId> = Graph<
  NodeId,
  // in a BackFrontGraph, the Edge is the boolean status of if the link has
  // been broken for cyclic dependencies
  boolean
>;

/**
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

export const deleteEdge = <N, E>(edges: Graph<N, E>, from: N, to: N) => {
  const toMap = edges.get(from);
  if (toMap !== undefined) {
    toMap.delete(to);
    if (toMap.size === 0) {
      edges.delete(from);
    }
  }
  return edges; // for chaining
};
