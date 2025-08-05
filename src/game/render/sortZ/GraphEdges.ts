export type Graph<NodeId, Edge> = Map<NodeId, Map<NodeId, Edge>>;

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

/**
 * Checks if an edge exists from one node to another
 */
export const hasEdge = <N, E>(edges: Graph<N, E>, from: N, to: N): boolean => {
  const toMap = edges.get(from);
  return toMap !== undefined && toMap.has(to);
};

/**
 * Gets the edge data between two nodes
 */
export const getEdge = <T, E>(
  edges: Graph<T, E>,
  from: T,
  to: T,
): E | undefined => {
  return edges.get(from)?.get(to);
};

/**
 * Iterates through all edges in the graph, yielding each edge as a tuple
 */
export const iterateEdges = function* <T, E>(
  /**
   * The graph to iterate through
   */
  edges: Graph<T, E>,
): Generator<[T, T, E], void, unknown> {
  for (const [from, toMap] of edges) {
    for (const [to, edgeData] of toMap) {
      yield [from, to, edgeData];
    }
  }
};

/**
 * Formats a Graph structure as a string with => and {} notation
 */
export const graphToString = <T, E>(edges: Graph<T, E>): string => {
  if (edges.size === 0) return "{}";

  const lines: string[] = ["{"];
  for (const [from, toMap] of edges) {
    if (toMap.size === 0) continue;
    const targets = Array.from(toMap.entries())
      .map(
        ([to, data]) =>
          `${String(to)}${data !== true ? `:${String(data)}` : ""}`,
      )
      .join(", ");
    lines.push(`  ${String(from)} => { ${targets} }`);
  }
  lines.push("}");
  return lines.join("\n");
};
