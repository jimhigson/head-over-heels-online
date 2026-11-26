import { expect, test } from "vitest";

import {
  type MarkdownProblem,
  markdownValid,
} from "../model/json/verification/scrolls/markdownValid";
import { entries } from "../utils/entries";
import { markdownPages } from "./pages";

// scrolls show these pages, so they are held to the same checks as scrolls
// written into a campaign
test.for(
  entries(markdownPages).map(([pageName, markdown]) => ({
    pageName,
    markdown,
  })),
)("'$pageName' is valid markdown", ({ markdown }) => {
  expect(
    markdownValid(markdown).toArray(),
    "expected no markdown issues",
  ).toEqual<MarkdownProblem[]>([]);
});
