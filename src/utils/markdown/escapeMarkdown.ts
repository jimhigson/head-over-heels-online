/**
 * text made safe to put into markdown, so it shows exactly as written: every
 * ascii punctuation character is backslash-escaped, as CommonMark allows, so
 * none can start emphasis, links, code or anything else - eg an id
 * `head_homers_jump` stays as it is rather than gaining italics
 */
export const escapeMarkdown = (text: string): string =>
  text.replace(/[!-/:-@[-`{-~]/g, "\\$&");
