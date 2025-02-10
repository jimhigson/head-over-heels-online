/**
 *
 * fork/update of toposort:
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

export type GraphEdges<NodeId> = Map<NodeId, Set<NodeId>>;

export class CyclicDependencyError<T> extends Error {
  constructor(
    public cyclicDependency: Array<T>,
    public hasClosedCycle: boolean,
    options?: ErrorOptions,
  ) {
    super(
      `CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${cyclicDependency.join(" -> ")}`,
      options,
    );
  }
}

/**
 * @param edges An array of directed edges describing a graph. An edge looks
 *              like this: `[node1, node2]` (vertices needn't be strings but can
 *              be of any type).
 * @returns a list of vertices, sorted from "start" to "end"
 * @throws if there are any cycles in the graph
 */
export const toposort = <N>(outgoingEdges: GraphEdges<N>): N[] => {
  const nodes = uniqueNodes(outgoingEdges);

  let cursor = nodes.length;
  let i = cursor;

  const sorted = new Array(cursor);
  const visited: Record<number, boolean> = {};
  const nodeIndexLookup = makeNodeIndexLookup(nodes);

  while (i--) {
    if (!visited[i]) visit(nodes[i], i, new Set());
  }

  return sorted;

  function visit(node: N, i: number, predecessors: Set<N>) {
    if (predecessors.has(node)) {
      throw new CyclicDependencyError(
        [node],
        false, // can't describe a cycle with a single node
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
          visit(child, nodeIndexLookup.get(child)!, predecessors);
        } catch (e) {
          if (e instanceof CyclicDependencyError) {
            if (e.hasClosedCycle) {
              // the error already describes a loop - no need to add more nodes on the way up the call stack
              throw e;
            } else {
              throw new CyclicDependencyError<N>(
                [node, ...e.cyclicDependency],
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

function uniqueNodes<T>(edges: GraphEdges<T>): Array<T> {
  const res = new Set<T>();

  for (const [source, targets] of edges.entries()) {
    res.add(source);
    for (const target of targets) {
      res.add(target);
    }
  }

  return Array.from(res);
}

function makeNodeIndexLookup<T>(arr: ReadonlyArray<T>): Map<T, number> {
  const res = new Map();
  for (let i = 0, len = arr.length; i < len; i++) {
    res.set(arr[i], i);
  }
  return res;
}
