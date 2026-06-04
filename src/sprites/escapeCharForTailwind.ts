// some chars can't be written out into css classes by tailwind (well, they can but they
// get escapes, and then it gets messy calling them since the escaping you need to do in
// the html is different from the escaping in the stylesheet). To keep things simple,
// some chars are escaped by a lookup:
export const charReplacements = {
  " ": "space",
  ",": "comma",
  ";": "scolon",
  ":": "colon",
  ".": "dot",
  "'": "sQuote",
  "‘": "lQuote",
  "’": "rQuote",
  '"': "dQuote",
  "`": "backtick",
  $: "dollar",
  "<": "lt",
  ">": "gt",
  "?": "questMk",
  "!": "exclMk",
  "-": "hyph",
  "/": "slash",
  "\\": "bSlash",
  // Tailwind v4's addUtilities rejects escaped special characters in class
  // selectors (v3 allowed them via the e() helper), so every char that would
  // otherwise need CSS-escaping in a class name is mapped to a safe name here.
  "#": "hash",
  "%": "pct",
  "&": "amp",
  "(": "lParen",
  ")": "rParen",
  "*": "star",
  "+": "plus",
  "@": "at",
  "[": "lBracket",
  "]": "rBracket",
  "^": "caret",
} as const;

export const uppercaseCharReplacement = <
  C extends keyof typeof charReplacements,
>(
  c: C,
) => {
  return charReplacements[c].toUpperCase() as Uppercase<
    (typeof charReplacements)[C]
  >;
};

type ReplacedChar = keyof typeof charReplacements;

export const escapeCharForTailwind = <C extends string>(
  c: C,
): EscapedForTailwind<C> => {
  const lookupable = charReplacements as Record<string, string>;
  // Tailwind v4 only accepts plain [a-zA-Z0-9_-] class names for utilities, so
  // any value not in the lookup and not already class-safe (eg non-ASCII glyphs
  // like ⚡) is encoded by codepoint. The class-safe test allows multi-char
  // values too, since this is also fed already-escaped names (eg "DOT", from
  // uppercaseCharReplacement) which must pass through unchanged - matching on a
  // single char would wrongly codepoint-collapse them onto their first letter.
  // Applied identically wherever a texture id is built, so the plugin selectors
  // and the runtime class names still match.
  const replacement =
    lookupable[c] ??
    (/^[a-zA-Z0-9_-]+$/.test(c) ? c : `u${c.codePointAt(0)!.toString(16)}`);
  return replacement as EscapedForTailwind<C>;
};

export type EscapedForTailwind<S extends string> = string &
  {
    [K in S as number]: K extends ReplacedChar ? (typeof charReplacements)[K]
    : K;
  }[number];
