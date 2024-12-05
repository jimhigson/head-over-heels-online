/**
 *
 * Slight fork of toposort:
 *      [git](https://github.com/marcelklehr/toposort)
 *      [npm](https://www.npmjs.com/package/toposort)
 * and @types/toposort:
 *      [npm](https://www.npmjs.com/package/@types/toposort)
 *
 * - converted to typescript
 * - reports cyclic dependencies in thrown object
 *
 * Topological sorting function
 *
 * @param {Array} edges
 * @returns {Array}
 */

type Edges<T> = ReadonlyArray<[T, T]>;

export class CyclicDependencyError<T> extends Error {
  constructor(
    message: string,
    public cyclicDependency: Array<T>,
    public hasClosedCycle,
    options?: ErrorOptions,
  ) {
    super(message, options);
  }
}

/**
 * @param edges An array of directed edges describing a graph. An edge looks
 *              like this: `[node1, node2]` (vertices needn't be strings but can
 *              be of any type).
 * @returns a list of vertices, sorted from "start" to "end"
 * @throws if there are any cycles in the graph
 */
export const toposort = <T>(edges: Edges<T>): T[] => {
  return _toposort(uniqueNodes(edges), edges);
};

const _toposort = <T>(nodes: Array<T>, edges: Edges<T>) => {
  let cursor = nodes.length;
  let i = cursor;

  const sorted = new Array(cursor),
    visited: Record<number, boolean> = {},
    // Better data structures make algorithm much faster.
    outgoingEdges = makeOutgoingEdges(edges),
    nodesHash = makeNodesHash(nodes);

  // check for unknown nodes
  edges.forEach(function (edge) {
    if (!nodesHash.has(edge[0]) || !nodesHash.has(edge[1])) {
      throw new Error(
        "Unknown node. There is an unknown node in the supplied edges.",
      );
    }
  });

  while (i--) {
    if (!visited[i]) visit(nodes[i], i, new Set());
  }

  return sorted;

  function visit(node: T, i: number, predecessors: Set<T>) {
    if (predecessors.has(node)) {
      throw new CyclicDependencyError(
        "Cyclic dependency found - see .cyclicDependency of this error for details",
        [node],
        false, // can't describe a cycle with a single node
      );
    }

    if (!nodesHash.has(node)) {
      throw new Error(
        "Found unknown node. Make sure to provided all involved nodes. Unknown node: " +
          JSON.stringify(node),
      );
    }

    if (visited[i]) return;
    visited[i] = true;

    const outgoing = outgoingEdges.get(node) || new Set();
    const outgoingArray = Array.from(outgoing);

    if ((i = outgoingArray.length)) {
      predecessors.add(node);
      do {
        const child = outgoingArray[--i];
        try {
          visit(child, nodesHash.get(child), predecessors);
        } catch (e) {
          if (e instanceof CyclicDependencyError) {
            if (e.hasClosedCycle) {
              // the error already describes a loop - no need to add more nodes on the way up the call stack
              throw e;
            } else {
              throw new CyclicDependencyError<T>(
                e.message,
                [...e.cyclicDependency, node],
                e.cyclicDependency.includes(node),
              );
            }
          } else {
            throw e;
          }
        }
      } while (i);
      predecessors.delete(node);
    }

    sorted[--cursor] = node;
  }
};

function uniqueNodes<T>(arr: ReadonlyArray<[T, T]>): Array<T> {
  const res = new Set<T>();
  for (let i = 0, len = arr.length; i < len; i++) {
    const edge = arr[i];
    res.add(edge[0]);
    res.add(edge[1]);
  }
  return Array.from(res);
}

function makeOutgoingEdges<T>(arr: Edges<T>) {
  const edges = new Map<T, Set<T>>();
  for (let i = 0, len = arr.length; i < len; i++) {
    const edge = arr[i];
    if (!edges.has(edge[0])) edges.set(edge[0], new Set());
    if (!edges.has(edge[1])) edges.set(edge[1], new Set());
    edges.get(edge[0])!.add(edge[1]);
  }
  return edges;
}

function makeNodesHash<T>(arr: ReadonlyArray<T>) {
  const res = new Map();
  for (let i = 0, len = arr.length; i < len; i++) {
    res.set(arr[i], i);
  }
  return res;
}
