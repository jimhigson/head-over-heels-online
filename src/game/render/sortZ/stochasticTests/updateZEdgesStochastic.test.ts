import { expect, test } from "vitest";

import { graphEdgeStrings } from "../__test__/graphEdgeStrings";
import { runTest } from "./runTest";

test("updateZEdges correctness", () => {
  // pins the final graph as sorted canonical edge strings - a pure edge-SET
  // representation, so the snapshot cannot drift on iteration/serialisation
  // order when the implementation changes; only a genuine edge difference
  // fails it
  expect(graphEdgeStrings(runTest())).toMatchSnapshot();
});
