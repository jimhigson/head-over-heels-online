import { expect, test } from "vitest";

import { type ZGraph } from "../GraphEdges";
import { formatZGraph } from "./dumpZGraph";

type TestNode = { id: string };

/**
 * pins the dump's emitted text format: this exact format is the stable
 * contract that keeps dumps diffable across builds, so it must not change
 * even when the live graph representation does (only the walking code in
 * formatZGraph may change).
 */
test("formatZGraph emits the stable dump format", () => {
  const a: TestNode = { id: "a" };
  const b: TestNode = { id: "b" };
  const c: TestNode = { id: "c" };

  // a chain a -> b -> c, plus an edge c -> a the renderer's sort had severed
  // to break the cycle:
  const graph: ZGraph<TestNode> = new Map([
    [a, new Map([[b, false]])],
    [b, new Map([[c, false]])],
    [c, new Map([[a, true]])],
  ]);

  expect(formatZGraph(graph)).toMatchInlineSnapshot(`
    "z-order draw graph
    3 nodes, 3 edges (1 broken)

    draw order (back to front):
      0: c
      1: a
      2: b

    edges (back -> front):
      a -> b
      b -> c
      c -> a  [broken]"
  `);
});

test("formatZGraph of no graph is an empty dump", () => {
  expect(formatZGraph(undefined)).toMatchInlineSnapshot(`
    "z-order draw graph
    0 nodes, 0 edges (0 broken)

    draw order (back to front):

    edges (back -> front):"
  `);
});
