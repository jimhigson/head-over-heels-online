import { renderToString } from "preact-render-to-string";
import { parse } from "snarkdown-in-react";
import { expect, test } from "vitest";

import { escapeMarkdown } from "./escapeMarkdown";

test("backslash-escapes markdown's punctuation", () => {
  expect(escapeMarkdown("head_homers_jump")).toBe("head\\_homers\\_jump");
});

test("leaves letters, digits and spaces alone", () => {
  expect(escapeMarkdown("room 12")).toBe("room 12");
});

test("an escaped id renders exactly as written, with no emphasis", () => {
  expect(renderToString(parse(escapeMarkdown("head_homers_jump")))).toEqual(
    "<p>head_homers_jump</p>",
  );
});

test("escaped text with every kind of markdown syntax renders exactly as written", () => {
  expect(
    renderToString(parse(escapeMarkdown("*a* **b** `c` [d](e) ~~f~~ #g _h_"))),
  ).toEqual("<p>*a* **b** `c` [d](e) ~~f~~ #g _h_</p>");
});
