const separators = /[\s_\-./]/;

/**
 * Whether `text[i]` starts a "word": index 0, the character after a separator
 * (`_ - . /` or whitespace), or a camelCase hump (a non-uppercase character
 * followed by an uppercase one). Matches that land on boundaries are preferred
 * when several subsequence alignments are otherwise equally contiguous.
 */
const isBoundary = (text: string, i: number): boolean => {
  if (i === 0) {
    return true;
  }
  const previous = text[i - 1];
  const current = text[i];
  if (separators.test(previous)) {
    return true;
  }
  return !/[A-Z]/.test(previous) && /[A-Z]/.test(current);
};

type Match = {
  /** number of contiguous runs the matched indices form (fewer is better) */
  runs: number;
  /** how many matched indices fall on a word boundary (more is better) */
  boundaries: number;
  /** index of the first matched character (earlier is better) */
  firstIndex: number;
  indices: number[];
};

/**
 * Whether `a` is a strictly better alignment than `b`. This is the ranking the
 * search encodes: fewest runs first (so longer contiguous spans win), then the
 * most word-boundary starts, then the earliest start for determinism. All three
 * quantities accumulate along the alignment and future characters add the same
 * amount regardless of the path taken, so keeping only the best alignment per
 * cell is safe (principle of optimality holds).
 */
const isBetter = (a: Match, b: Match): boolean => {
  if (a.runs !== b.runs) {
    return a.runs < b.runs;
  }
  if (a.boundaries !== b.boundaries) {
    return a.boundaries > b.boundaries;
  }
  return a.firstIndex < b.firstIndex;
};

/**
 * Finds the indices of `text` (matched case-insensitively) that align `query`
 * as a subsequence, preferring the alignment with the fewest, longest
 * contiguous runs and then the most word-boundary starts. Returns `null` when
 * `query` is empty or isn't a subsequence of `text`.
 *
 * Used both to decide whether a command item is visible (a non-null result
 * means it matches the search) and to drive the highlight (the returned
 * indices). O(n²·m) over short identifiers, which is ample here.
 */
export const fuzzyMatch = (text: string, query: string): null | number[] => {
  if (query === "") {
    return null;
  }
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const n = lowerText.length;
  const m = lowerQuery.length;
  if (m > n) {
    return null;
  }

  // row[i] = best alignment of the query characters so far whose last matched
  // character sits at text index i. Seeded with the first query character.
  let previousRow: (Match | undefined)[] = new Array(n).fill(undefined);
  for (let i = 0; i < n; i++) {
    if (lowerText[i] === lowerQuery[0]) {
      previousRow[i] = {
        runs: 1,
        boundaries: isBoundary(text, i) ? 1 : 0,
        firstIndex: i,
        indices: [i],
      };
    }
  }

  for (let j = 1; j < m; j++) {
    const currentRow: (Match | undefined)[] = new Array(n).fill(undefined);
    for (let i = j; i < n; i++) {
      if (lowerText[i] !== lowerQuery[j]) {
        continue;
      }
      let best: Match | undefined;
      for (let k = j - 1; k < i; k++) {
        const from = previousRow[k];
        if (from === undefined) {
          continue;
        }
        const contiguous = k === i - 1;
        const candidate: Match = {
          runs: from.runs + (contiguous ? 0 : 1),
          boundaries: from.boundaries + (isBoundary(text, i) ? 1 : 0),
          firstIndex: from.firstIndex,
          indices: [...from.indices, i],
        };
        if (best === undefined || isBetter(candidate, best)) {
          best = candidate;
        }
      }
      currentRow[i] = best;
    }
    previousRow = currentRow;
  }

  let result: Match | undefined;
  for (const match of previousRow) {
    if (
      match !== undefined &&
      (result === undefined || isBetter(match, result))
    ) {
      result = match;
    }
  }
  return result?.indices ?? null;
};
