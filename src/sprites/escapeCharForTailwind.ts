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
  "`": "backtick",
  "<": "lt",
  ">": "gt",
  "?": "questMk",
  "!": "exclMk",
  "-": "hyph",
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
  return (lookupable[c] ?? c) as EscapedForTailwind<C>;
};

export type EscapedForTailwind<S extends string> = string &
  {
    [K in S as number]: K extends ReplacedChar ? (typeof charReplacements)[K]
    : K;
  }[number];
