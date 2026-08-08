import { expect, test } from "vitest";

import { Graph } from "./Graph";
import { reachableNodes } from "./reachableNodes";

const graph = new Graph<string>();
graph.beginRebuild(["a", "b", "c", "x", "y"]);
graph.addEdge("a", "b");
graph.addEdge("b", "c");
graph.addEdge("x", "y");
graph.finalise();

test("follows edges directionally from the seed", () => {
  expect(reachableNodes(graph, ["a"])).toEqual(new Set(["a", "b", "c"]));
});

test("does not reach a separate component", () => {
  expect(reachableNodes(graph, ["a"]).has("x")).toBe(false);
});

test("is directed - from an outgoing-less node you reach only itself", () => {
  expect(reachableNodes(graph, ["c"])).toEqual(new Set(["c"]));
});
