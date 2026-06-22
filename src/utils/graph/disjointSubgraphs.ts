import { type Graph } from "./Graph";

/**
 * partition the graph's nodes into connected components, treating an edge as a
 * connection (in either direction) only when `includeEdge` returns true. Nodes
 * with no included edge form their own singleton component.
 */
export const disjointSubgraphs = <N, E>(
  graph: Graph<N, E>,
  includeEdge: (edge: E) => boolean = () => true,
): N[][] => {
  const parent = new Map<N, N>();
  const find = (node: N): N => {
    let root = node;
    while ((parent.get(root) ?? root) !== root) {
      root = parent.get(root)!;
    }
    let current = node;
    while (current !== root) {
      const next = parent.get(current) ?? current;
      parent.set(current, root);
      current = next;
    }
    return root;
  };
  const union = (a: N, b: N): void => {
    parent.set(find(a), find(b));
  };

  const allNodes = new Set<N>();
  for (const [from, tos] of graph) {
    allNodes.add(from);
    for (const to of tos.keys()) {
      allNodes.add(to);
    }
  }
  for (const node of allNodes) {
    parent.set(node, node);
  }
  for (const [from, tos] of graph) {
    for (const [to, edge] of tos) {
      if (includeEdge(edge)) {
        union(from, to);
      }
    }
  }

  const byRoot = new Map<N, N[]>();
  for (const node of allNodes) {
    const root = find(node);
    const group = byRoot.get(root) ?? [];
    group.push(node);
    byRoot.set(root, group);
  }
  return [...byRoot.values()];
};
