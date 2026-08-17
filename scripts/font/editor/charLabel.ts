/**
 * A character written so it can be pasted into a message and read back
 * unambiguously.
 *
 * Most of the font is ordinary typing, which needs nothing more than the
 * character itself. The rest - arrows, dingbats, the odd private-use icon -
 * survives neither a terminal nor a chat reliably, and several of them look
 * alike at a glance, so those carry their escape as well as their glyph.
 */
export const charLabel = (char: string): string => {
  const code = char.codePointAt(0);
  if (code === undefined || (code >= 0x20 && code <= 0x7e)) {
    return `"${char}"`;
  }
  const escaped =
    code > 0xff_ff ?
      `\\u{${code.toString(16).toUpperCase()}}`
    : `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`;
  return `"${char}" ${escaped}`;
};
