export type Run = { text: string; matched: boolean };

/**
 * Splits `text` into consecutive runs, marking each character group as matched
 * or not according to whether its index is in `matchedIndices`. Adjacent
 * characters of the same matched-ness are merged into a single run.
 */
export const runsOf = (
  text: string,
  matchedIndices: ReadonlySet<number>,
): Run[] => {
  const runs: Run[] = [];
  for (const [i, char] of Array.from(text).entries()) {
    const isMatch = matchedIndices.has(i);
    const last = runs.at(-1);
    if (last !== undefined && last.matched === isMatch) {
      last.text += char;
    } else {
      runs.push({ text: char, matched: isMatch });
    }
  }
  return runs;
};
