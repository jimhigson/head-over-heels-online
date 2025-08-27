//# allFunctionsCalledOnLoad

/**
 *
 * fork/update of toposort:
 *      [git](https://github.com/marcelklehr/toposort)
 *      [npm](https://www.npmjs.com/package/toposort)
 * and @types/toposort:
 *      [npm](https://www.npmjs.com/package/@types/toposort)
 *
 * - converted to typescript
 * - marks links as broken on finding cycles (no longer throws)
 *
 * Topological sorting function
 *
 * @param {Array} edges
 * @returns {Array}
 */

import type { ZGraph } from "../GraphEdges";

import { emptySet } from "../../../../utils/empty";

/**
 * @param edges An array of directed edges describing a graph. An edge looks
 * like this: `Map{ from => Map{to => edge} }`
 * @param N The type of the nodes in the graph
 * @returns a list of vertices, sorted from "start" to "end"
 * @note automatically breaks cycles by marking edges as broken
 */
export const toposort = <N>(graph: ZGraph<N>): N[] => {
  // Mark all edges as not broken on entry
  for (const [, toMap] of graph) {
    for (const [to] of toMap) {
      toMap.set(to, false);
    }
  }

  const nodes = Array.from(uniqueNodes(graph));

  let cursor = nodes.length;
  let i = cursor;

  const sorted = new Array(cursor);
  const visited: Record<number, boolean> = {};
  const nodeIndexLookup = makeNodeIndexLookup(nodes);

  while (i--) {
    if (!visited[i]) visit(nodes[i], i, new Set(), null);
  }

  return sorted;

  function visit(node: N, i: number, predecessors: Set<N>, parent: N | null) {
    if (predecessors.has(node)) {
      // We've found a cycle - mark the edge from parent to this node as broken
      if (parent !== null) {
        const parentEdges = graph.get(parent);
        if (parentEdges?.has(node)) {
          parentEdges.set(node, true);
        }
      }
      return; // Skip this node since we're breaking the edge
    }

    if (visited[i]) return;
    visited[i] = true;

    const sourceMap = graph.get(node);
    const outgoingNodes = Array.from(
      sourceMap?.entries() ?? (emptySet as Set<[N, boolean]>),
    );

    if ((i = outgoingNodes.length)) {
      predecessors.add(node);
      do {
        const [child, broken] = outgoingNodes[--i];
        if (broken) {
          // skip broken links:
          continue;
        }
        visit(child, nodeIndexLookup.get(child)!, predecessors, node);
      } while (i);
      predecessors.delete(node);
    }

    sorted[--cursor] = node;
  }
};

function uniqueNodes<N>(edges: ZGraph<N>): Set<N> {
  const res = new Set<N>();

  for (const [source, targets] of edges.entries()) {
    res.add(source);
    for (const target of targets.keys()) {
      res.add(target);
    }
  }

  return res;
}

function makeNodeIndexLookup<T>(arr: ReadonlyArray<T>): Map<T, number> {
  const res = new Map();
  for (let i = 0, len = arr.length; i < len; i++) {
    res.set(arr[i], i);
  }
  return res;
}
