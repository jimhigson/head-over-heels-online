import { expect, test } from "vitest";

import { runTest } from "./runTest";

test("updateZEdges correctness", () => {
  // this test can be used when the implementation changes to verify that the output is the same
  expect(runTest()).toMatchSnapshot();
});
