/**
 * markdown that shows as it is written: a backslash-escaped character, or code
 * (fenced, indented or inline)
 */
const shownAsWrittenRegex =
  /\\[!-/:-@[-`{-~]|^``` *\w*\n[\s\S]*?\n```$|(?:(?:^|\n+)(?:\t| {3,}).+)+\n*|`[^`].*?`/;

/**
 * matches markdown shown as written (in its `shownAsWritten` group) or else
 * `regex`, so `regex` never matches inside markdown shown as written
 */
const regexOutsideShownAsWritten = (regex: RegExp): RegExp =>
  new RegExp(
    `(?<shownAsWritten>${shownAsWrittenRegex.source})|${regex.source}`,
    "gm",
  );

/**
 * every match of `regex` (as multiline) in some markdown, except in code or
 * escaped characters
 */
export const matchAllOutsideCode = (
  markdown: string,
  regex: RegExp,
): IteratorObject<string> =>
  markdown
    .matchAll(regexOutsideShownAsWritten(regex))
    .filter(([, shownAsWritten]) => shownAsWritten === undefined)
    .map(([matched]) => matched);

/**
 * the markdown with every match of `regex` (as multiline) replaced, except in
 * code or escaped characters
 */
export const replaceAllOutsideCode = (
  markdown: string,
  regex: RegExp,
  replacement: (matched: string) => string,
): string =>
  markdown.replaceAll(
    regexOutsideShownAsWritten(regex),
    (matched, shownAsWritten: string | undefined) =>
      shownAsWritten === undefined ? replacement(matched) : matched,
  );
