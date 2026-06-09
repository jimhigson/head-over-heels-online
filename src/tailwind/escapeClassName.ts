/**
 * Escapes a class name for safe use inside a CSS selector, matching the
 * behaviour of Tailwind v3's `e()` plugin helper (which is itself based on
 * `CSS.escape`). Tailwind v4's legacy plugin API no longer passes `e`, so the
 * sprite plugin uses this instead to keep the generated selectors identical.
 *
 * The HTML `class` attribute uses the unescaped name; only the selector side
 * needs escaping — so the value passed here is the already-sanitised id.
 */
export const escapeClassName = (value: string): string => {
  const string = String(value);
  const { length } = string;
  let index = -1;
  let result = "";
  const firstCodeUnit = string.charCodeAt(0);

  while (++index < length) {
    const codeUnit = string.charCodeAt(index);

    // NULL → REPLACEMENT CHARACTER
    if (codeUnit === 0x00_00) {
      result += "�";
      continue;
    }

    if (
      // control characters and DEL
      (codeUnit >= 0x00_01 && codeUnit <= 0x00_1f) ||
      codeUnit === 0x00_7f ||
      // a leading digit
      (index === 0 && codeUnit >= 0x00_30 && codeUnit <= 0x00_39) ||
      // a digit following a leading hyphen
      (index === 1 &&
        codeUnit >= 0x00_30 &&
        codeUnit <= 0x00_39 &&
        firstCodeUnit === 0x00_2d)
    ) {
      result += `\\${codeUnit.toString(16)} `;
      continue;
    }

    // a lone leading hyphen
    if (index === 0 && length === 1 && codeUnit === 0x00_2d) {
      result += `\\${string.charAt(index)}`;
      continue;
    }

    // safe characters: >= U+0080, `-`, `_`, [0-9], [A-Z], [a-z]
    if (
      codeUnit >= 0x00_80 ||
      codeUnit === 0x00_2d ||
      codeUnit === 0x00_5f ||
      (codeUnit >= 0x00_30 && codeUnit <= 0x00_39) ||
      (codeUnit >= 0x00_41 && codeUnit <= 0x00_5a) ||
      (codeUnit >= 0x00_61 && codeUnit <= 0x00_7a)
    ) {
      result += string.charAt(index);
      continue;
    }

    // everything else gets backslash-escaped
    result += `\\${string.charAt(index)}`;
  }

  return result;
};
