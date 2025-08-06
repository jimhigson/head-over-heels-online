import { test, expect } from "vitest";
import { toposort } from "./toposort";

test("acyclic graphs should be sorted correctly", () => {
  const edges = new Map([
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
  ]);

  const result = toposort(edges);

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
  const edges = new Map([
    ["foo", new Map([["bar", false]])],
    ["bar", new Map([["foo", false]])],
  ]);

  // Should not throw
  const result = toposort(edges);

  // Should have broken one of the edges
  const fooToBar = edges.get("foo")?.get("bar");
  const barToFoo = edges.get("bar")?.get("foo");
  expect(fooToBar === true || barToFoo === true).toBe(true);

  // Result should contain both nodes
  expect(result).toHaveLength(2);
  expect(new Set(result)).toEqual(new Set(["foo", "bar"]));
});

test("toposort resets all edges to false on entry", () => {
  const edges = new Map([
    ["foo", new Map([["bar", true]])], // Pre-marked as broken
    ["bar", new Map([["foo", true]])], // Pre-marked as broken
  ]);

  // toposort should reset these to false and then detect the cycle
  const result = toposort(edges);

  // Should have found and broken the cycle again
  const fooToBar = edges.get("foo")?.get("bar");
  const barToFoo = edges.get("bar")?.get("foo");
  expect(fooToBar === true || barToFoo === true).toBe(true);

  expect(result).toHaveLength(2);
});

test("complex cyclic graphs should automatically break cycles", () => {
  const edges = new Map([
    ["foo", new Map([["bar", false]])],
    ["bar", new Map([["ron", false]])],
    ["john", new Map([["bar", false]])],
    ["tom", new Map([["john", false]])],
    ["ron", new Map([["tom", false]])],
  ]);

  // Should not throw
  const result = toposort(edges);

  // Should have broken at least one edge in the cycle
  const brokenEdges = [];
  for (const [from, toMap] of edges) {
    for (const [to, broken] of toMap) {
      if (broken) {
        brokenEdges.push(`${from}->${to}`);
      }
    }
  }
  expect(brokenEdges.length).toBeGreaterThanOrEqual(1);

  // Result should contain all nodes
  expect(result).toHaveLength(5);
  expect(new Set(result)).toEqual(
    new Set(["foo", "bar", "ron", "john", "tom"]),
  );
});

test("verify toposort produces valid topological ordering", () => {
  const edges = new Map([
    ["foo", new Map([["bar", false]])],
    ["bar", new Map([["ron", false]])],
    ["john", new Map([["bar", false]])],
    ["tom", new Map([["john", false]])],
    ["ron", new Map([["tom", false]])], // Creates a cycle
  ]);

  const result = toposort(edges);

  // Verify it's a valid topological sort
  const nodeIndex = new Map<string, number>();
  result.forEach((node, index) => nodeIndex.set(node, index));

  // Check all non-broken edges are satisfied (from node should come before to node)
  for (const [from, toMap] of edges) {
    for (const [to, broken] of toMap) {
      if (!broken) {
        // For non-broken edges, from should come before to
        const fromIndex = nodeIndex.get(from);
        const toIndex = nodeIndex.get(to);
        if (fromIndex !== undefined && toIndex !== undefined) {
          expect(fromIndex).toBeLessThan(toIndex);
        }
      }
    }
  }

  // All nodes should be present
  expect(result).toHaveLength(5);
  expect(new Set(result)).toEqual(
    new Set(["foo", "bar", "ron", "john", "tom"]),
  );
});

test("triangular dependency shouldn't throw an error", () => {
  const edges = new Map([
    [
      "a",
      new Map([
        ["b", false],
        ["c", false],
      ]),
    ],
    ["b", new Map([["c", false]])],
  ]);

  const result = toposort(edges);

  expect(result).toEqual(["a", "b", "c"]);
});

test("medium graphs should sort quickly", () => {
  const graph = new Map<number, Map<number, boolean>>();
  // 200 is a lot in the game engine
  const nodeCount = 200;

  for (let i = 0; i < nodeCount; i++) {
    graph.set(i, new Map([[i + 1, false]]));
  }

  const start = performance.now();
  const result = toposort(graph);
  const elapsedMs = performance.now() - start;

  expect(result).toHaveLength(nodeCount + 1); // Ensure all nodes are sorted

  console.log(`⏱️ toposort sorted ${nodeCount} in ${elapsedMs.toFixed(1)}ms`);
  expect(elapsedMs).toBeLessThan(1_000);
});
test("giant graphs should sort quickly", () => {
  const graph = new Map<number, Map<number, boolean>>();
  // 100,000 is far beyond what we actually need
  const nodeCount = 100_000;

  for (let i = 0; i < nodeCount; i++) {
    graph.set(i, new Map([[i + 1, false]]));
  }

  const start = performance.now();
  const result = toposort(graph);
  const elapsedMs = performance.now() - start;

  expect(result).toHaveLength(nodeCount + 1); // Ensure all nodes are sorted

  console.log(`⏱️ toposort sorted ${nodeCount} in ${elapsedMs.toFixed(1)}ms`);
  expect(elapsedMs).toBeLessThan(1_000);
});

test("object keys should handle object nodes (not only strings)", () => {
  const o1 = { k1: "v1", nested: { k2: "v2" } };
  const o2 = { k2: "v2" };
  const o3 = { k3: "v3" };

  const edges = new Map<object, Map<object, boolean>>([
    [o1, new Map([[o2, false]])],
    [o2, new Map([[o3, false]])],
  ]);

  const result = toposort(edges);

  expect(result).toEqual([o1, o2, o3]);
});
