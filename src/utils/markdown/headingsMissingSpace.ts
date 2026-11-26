import {
  matchAllOutsideCode,
  replaceAllOutsideCode,
} from "./matchAllOutsideCode";

/**
 * a line of `#`s then text with no space between - markdown reads it as plain
 * text, so it shows its `#`s rather than being a heading
 */
const headingMissingSpaceRegex = /^#{1,6}[^\s#].*$/;

/**
 * every line in some markdown that was meant as a heading but has no space
 * after its `#`s
 */
export const headingsMissingSpace = (
  markdown: string,
): IteratorObject<string> =>
  matchAllOutsideCode(markdown, headingMissingSpaceRegex);

/**
 * the markdown with a space put after the `#`s of every line that is the given
 * heading missing its space
 */
export const withHeadingSpaceAdded = (
  markdown: string,
  heading: string,
): string =>
  replaceAllOutsideCode(markdown, headingMissingSpaceRegex, (line) =>
    line === heading ? line.replace(/^#+/, "$& ") : line,
  );
