import { test, expect } from "vitest";
import { toposort } from "./toposort";

test("acyclic graphs should be sorted correctly", () => {
  const edges = new Map([
    ["3", new Set(["2"])],
    ["2", new Set(["1"])],
    ["6", new Set(["5"])],
    ["5", new Set(["2", "4"])],
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

  expect(validSolutions).toContainEqual(result);
});

test("simple cyclic graphs should throw an exception", () => {
  const edges = new Map([
    ["foo", new Set(["bar"])],
    ["bar", new Set(["foo"])],
  ]);

  expect(() => toposort(edges)).toThrowError(
    "CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. bar -> foo -> bar",
  );
});

test("complex cyclic graphs should throw an exception", () => {
  const edges = new Map([
    ["foo", new Set(["bar"])],
    ["bar", new Set(["ron"])],
    ["john", new Set(["bar"])],
    ["tom", new Set(["john"])],
    ["ron", new Set(["tom"])],
  ]);

  expect(() => toposort(edges)).toThrowError(
    "CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. tom -> john -> bar -> ron -> tom",
  );
});

test("triangular dependency shouldn't throw an error", () => {
  const edges = new Map([
    ["a", new Set(["b", "c"])],
    ["b", new Set(["c"])],
  ]);

  const result = toposort(edges);

  expect(result).toEqual(["a", "b", "c"]);
});

test("giant graphs should sort quickly", () => {
  const graph = new Map<number, Set<number>>();
  const nodeCount = 100000;

  for (let i = 0; i < nodeCount; i++) {
    graph.set(i, new Set([i + 1]));
  }

  const start = Date.now();
  const result = toposort(graph);
  const elapsedSeconds = (Date.now() - start) / 1000;

  expect(result).toHaveLength(nodeCount + 1); // Ensure all nodes are sorted
  expect(elapsedSeconds).toBeLessThan(1);
});

test("object keys should handle object nodes", () => {
  const o1 = { k1: "v1", nested: { k2: "v2" } };
  const o2 = { k2: "v2" };
  const o3 = { k3: "v3" };

  const edges = new Map<object, Set<object>>([
    [o1, new Set([o2])],
    [o2, new Set([o3])],
  ]);

  const result = toposort(edges);

  expect(result).toEqual([o1, o2, o3]);
});
