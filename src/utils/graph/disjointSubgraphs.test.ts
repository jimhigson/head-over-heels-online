import { expect, test } from "vitest";

import { disjointSubgraphs } from "./disjointSubgraphs";
import { type Graph } from "./Graph";

const graph: Graph<string, string> = new Map([
  ["a", new Map([["b", "keep"]])],
  ["b", new Map([["c", "drop"]])],
  ["x", new Map([["y", "keep"]])],
]);

test("groups nodes connected by any edge", () => {
  const groups = disjointSubgraphs(graph).map((group) => new Set(group));
  expect(groups).toContainEqual(new Set(["a", "b", "c"]));
});

test("separates disconnected components", () => {
  expect(disjointSubgraphs(graph)).toHaveLength(2);
});

test("includeEdge controls which edges connect", () => {
  // dropping the b->c edge splits c off into its own component
  expect(disjointSubgraphs(graph, (edge) => edge === "keep")).toHaveLength(3);
});
