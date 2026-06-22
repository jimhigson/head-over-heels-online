import { expect, test } from "vitest";

import { type Graph } from "./Graph";
import { reachableNodes } from "./reachableNodes";

const graph: Graph<string, number> = new Map([
  ["a", new Map([["b", 1]])],
  ["b", new Map([["c", 1]])],
  ["x", new Map([["y", 1]])],
]);

test("follows edges directionally from the seed", () => {
  expect(reachableNodes(graph, ["a"])).toEqual(new Set(["a", "b", "c"]));
});

test("does not reach a separate component", () => {
  expect(reachableNodes(graph, ["a"]).has("x")).toBe(false);
});

test("is directed - from an outgoing-less node you reach only itself", () => {
  expect(reachableNodes(graph, ["c"])).toEqual(new Set(["c"]));
});
