import { expect, test } from "vitest";

import { ZOrderGraph } from "./ZOrderGraph";

/**
 * build a ZOrderGraph from the Map-of-Maps fixture shape. Nodes take their
 * canonical order from first appearance (each row's source, then its
 * targets), matching how the pre-flat-graph toposort collected its node
 * universe from the same fixtures
 */
const graphFromMaps = <N>(edges: Map<N, Map<N, boolean>>): ZOrderGraph<N> => {
  const nodes = new Set<N>();
  for (const [source, targets] of edges) {
    nodes.add(source);
    for (const target of targets.keys()) {
      nodes.add(target);
    }
  }
  const graph = new ZOrderGraph<N>();
  graph.beginRebuild(nodes);
  for (const [source, targets] of edges) {
    for (const target of targets.keys()) {
      graph.addEdge(source, target);
    }
  }
  graph.finalise();
  return graph;
};

const isEdgeBroken = <N>(
  graph: ZOrderGraph<N>,
  from: N,
  to: N,
): boolean | undefined => {
  let result: boolean | undefined;
  graph.forEachEdgeFrom(from, (front, broken) => {
    if (front === to) {
      result = broken;
    }
  });
  return result;
};

const brokenEdgeCount = <N>(graph: ZOrderGraph<N>): number => {
  let count = 0;
  for (let i = 0; i < graph.nodeCount; i++) {
    graph.forEachEdgeFrom(graph.nodeAt(i), (_front, broken) => {
      if (broken) {
        count++;
      }
    });
  }
  return count;
};

test("acyclic graphs should be sorted correctly", () => {
  const graph = graphFromMaps(
    new Map([
      ["3", new Map([["2", false]])],
      ["2", new Map([["1", false]])],
      ["6", new Map([["5", false]])],
      [
        "5",
        new Map([
          ["2", false],
          ["4", false],
        ]),
      ],
    ]),
  );

  const result = graph.toposort();

  const validSolutions = [
    ["3", "6", "5", "2", "1", "4"],
    ["3", "6", "5", "2", "4", "1"],
    ["6", "3", "5", "2", "1", "4"],
    ["6", "5", "3", "2", "1", "4"],
    ["6", "5", "3", "2", "4", "1"],
    ["6", "5", "4", "3", "2", "1"],
  ];

  expect(result).toBeOneOf(validSolutions);
});

test("simple cyclic graphs should automatically break cycles", () => {
  const graph = graphFromMaps(
    new Map([
      ["foo", new Map([["bar", false]])],
      ["bar", new Map([["foo", false]])],
    ]),
  );

  // Should not throw
  const result = graph.toposort();

  // Should have broken one of the edges
  const fooToBar = isEdgeBroken(graph, "foo", "bar");
  const barToFoo = isEdgeBroken(graph, "bar", "foo");
  expect(fooToBar === true || barToFoo === true).toBe(true);

  // Result should contain both nodes
  expect(result).toHaveLength(2);
  expect(new Set(result)).toEqual(new Set(["foo", "bar"]));
});

test("toposort resets all edges to false on entry", () => {
  const graph = graphFromMaps(
    new Map([
      ["foo", new Map([["bar", false]])],
      ["bar", new Map([["foo", false]])],
    ]),
  );

  // a first run marks one edge of the cycle broken...
  graph.toposort();
  expect(brokenEdgeCount(graph)).toBe(1);

  // ...a second run must reset the flags and re-detect the cycle (never
  // accumulate breaks from earlier runs):
  const result = graph.toposort();
  expect(brokenEdgeCount(graph)).toBe(1);

  const fooToBar = isEdgeBroken(graph, "foo", "bar");
  const barToFoo = isEdgeBroken(graph, "bar", "foo");
  expect(fooToBar === true || barToFoo === true).toBe(true);

  expect(result).toHaveLength(2);
});

test("verify toposort produces valid topological ordering", () => {
  const graph = graphFromMaps(
    new Map([
      ["foo", new Map([["bar", false]])],
      ["bar", new Map([["ron", false]])],
      ["john", new Map([["bar", false]])],
      ["tom", new Map([["john", false]])],
      ["ron", new Map([["tom", false]])], // Creates a cycle
    ]),
  );

  const result = graph.toposort();

  // Verify it's a valid topological sort
  const nodeIndex = new Map<string, number>();
  result.forEach((node, index) => nodeIndex.set(node, index));

  // Check all non-broken edges are satisfied (from node should come before to node)
  for (let i = 0; i < graph.nodeCount; i++) {
    const from = graph.nodeAt(i);
    graph.forEachEdgeFrom(from, (to, broken) => {
      if (!broken) {
        // For non-broken edges, from should come before to
        const fromIndex = nodeIndex.get(from);
        const toIndex = nodeIndex.get(to);
        if (fromIndex !== undefined && toIndex !== undefined) {
          expect(fromIndex).toBeLessThan(toIndex);
        }
      }
    });
  }

  // All nodes should be present
  expect(result).toHaveLength(5);
  expect(new Set(result)).toEqual(
    new Set(["foo", "bar", "ron", "john", "tom"]),
  );
});

test("triangular dependency shouldn't throw an error", () => {
  const graph = graphFromMaps(
    new Map([
      [
        "a",
        new Map([
          ["b", false],
          ["c", false],
        ]),
      ],
      ["b", new Map([["c", false]])],
    ]),
  );

  const result = graph.toposort();

  expect(result).toEqual(["a", "b", "c"]);
});

test("giant graphs should sort quickly", () => {
  const fixture = new Map<number, Map<number, boolean>>();
  // 100,000 is far beyond what we actually need
  const nodeCount = 100_000;

  for (let i = 0; i < nodeCount; i++) {
    fixture.set(i, new Map([[i + 1, false]]));
  }
  const graph = graphFromMaps(fixture);

  const start = performance.now();
  const result = graph.toposort();
  const elapsedMs = performance.now() - start;

  expect(result).toHaveLength(nodeCount + 1); // Ensure all nodes are sorted

  console.log(`⏱️ toposort sorted ${nodeCount} in ${elapsedMs.toFixed(1)}ms`);
  expect(elapsedMs).toBeLessThan(1_000);
});

test("object keys should handle object nodes (not only strings)", () => {
  const o1 = { k1: "v1", nested: { k2: "v2" } };
  const o2 = { k2: "v2" };
  const o3 = { k3: "v3" };

  const graph = graphFromMaps(
    new Map<object, Map<object, boolean>>([
      [o1, new Map([[o2, false]])],
      [o2, new Map([[o3, false]])],
    ]),
  );

  const result = graph.toposort();

  expect(result).toEqual([o1, o2, o3]);
});
