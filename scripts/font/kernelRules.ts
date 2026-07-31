/**
 * Kernel-based pattern rules for the smooth font. Each rule is a small
 * pattern matched directly against the glyph's pixel-art bitmap - not against
 * any upscaled or traced form of it. Where a rule matches, the cells of its
 * active site are claimed, and their plain square contribution to the outline
 * is replaced by the rule's action instead. Cells no rule claims stay
 * perfectly square, so the font is blocky by default and grows one exception
 * at a time as rules are added.
 */

/**
 * where a rule's active site sits within its pattern, in cells. The pattern
 * is the wider window the rule reads for context; the active site is the part
 * it actually claims and draws. Sample windows of neighbouring matches may
 * overlap freely - only active sites are exclusive.
 */
export type KernelActiveSite = {
  x: number;
  y: number;
  w: number;
  h: number;
};

/** which corner of its cell a {@link KernelRuleAction} roundedCorner curves */
export type CornerName = "bottomLeft" | "bottomRight" | "topLeft" | "topRight";

export type KernelRuleAction =
  /** the claimed cell is an isolated hole - carve it round rather than square */
  | { type: "circleHole" }
  /**
   * the claimed cells are a two-cell-tall hole - carve them as a single slot,
   * the same width as a round hole and with a semicircular cap at each end
   */
  | { type: "slotHole" }
  /**
   * the claimed cell is the cut-off corner of a shape - fill it in as far as
   * a quarter-circle spanning the cell exactly, so the two straight edges
   * either side of it meet as a rounded-rectangle corner
   */
  | { type: "roundedCorner"; corner: CornerName };

export type KernelRule = {
  name: string;
  /**
   * rows of the sample window, every row the same length. Each character is
   * `#` ink (white in the source art), `.` no-ink (black, and everything
   * outside the glyph), or `?` either - for cells the rule does not care about
   */
  pattern: readonly string[];
  activeSite: KernelActiveSite;
  action: KernelRuleAction;
};

export const kernelRules: readonly KernelRule[] = [
  {
    // a two-cell-tall no-ink column with ink all around - eg the lower counter
    // of a 'B' or the counter of a 'Q'. Listed before isolatedHole so the
    // larger feature claims its cells first
    name: "verticalSlotHole",
    pattern: ["###", "#.#", "#.#", "###"],
    activeSite: { x: 1, y: 1, w: 1, h: 2 },
    action: { type: "slotHole" },
  },
  {
    // a single no-ink cell with ink on all eight sides - eg the counter of an
    // 'o'. The full ring is what makes the round hole safe to draw as an
    // independent contour: it guarantees the circle, which is a little wider
    // than the cell it replaces, still lands inside solid ink
    name: "isolatedHole",
    pattern: ["###", "#.#", "###"],
    activeSite: { x: 1, y: 1, w: 1, h: 1 },
    action: { type: "circleHole" },
  },
  // the four cut-off corners of a box - eg all four corners of an 'o'. The
  // two edges meeting at the corner must be the outside of the shape, so the
  // row beyond the corner and the column beyond it are required to be empty;
  // without that a stem meeting a bowl (the junction in a 'b' or 'h') reads
  // as a corner too. Listed after isolatedHole, whose ring of ink would
  // otherwise also satisfy these, so an enclosed hole stays a circle. Each is
  // the top-left pattern reflected in x, y, or both
  {
    name: "roundedCornerTopLeft",
    pattern: ["...?", "..##", ".##?", "?#??"],
    activeSite: { x: 1, y: 1, w: 1, h: 1 },
    action: { type: "roundedCorner", corner: "topLeft" },
  },
  {
    name: "roundedCornerTopRight",
    pattern: ["?...", "##..", "?##.", "??#?"],
    activeSite: { x: 2, y: 1, w: 1, h: 1 },
    action: { type: "roundedCorner", corner: "topRight" },
  },
  {
    name: "roundedCornerBottomLeft",
    pattern: ["?#??", ".##?", "..##", "...?"],
    activeSite: { x: 1, y: 2, w: 1, h: 1 },
    action: { type: "roundedCorner", corner: "bottomLeft" },
  },
  {
    name: "roundedCornerBottomRight",
    pattern: ["??#?", "?##.", "##..", "?..."],
    activeSite: { x: 2, y: 2, w: 1, h: 1 },
    action: { type: "roundedCorner", corner: "bottomRight" },
  },
];

const bitmapWidth = (bitmap: boolean[][]): number => {
  const [firstRow] = bitmap;
  return firstRow?.length ?? 0;
};

/**
 * ink at a cell, reading everything outside the bitmap as no-ink - so a
 * pattern window may hang off the edge of the glyph without needing the
 * bitmap padded to each rule's own margin
 */
const inkAt = (bitmap: boolean[][], x: number, y: number): boolean =>
  x >= 0 &&
  y >= 0 &&
  y < bitmap.length &&
  x < bitmapWidth(bitmap) &&
  bitmap[y][x];

const patternMatchesAt = (
  bitmap: boolean[][],
  { pattern }: KernelRule,
  /** top-left of the pattern window, in bitmap cell coords - may be negative */
  windowX: number,
  windowY: number,
): boolean =>
  pattern.every((patternRow, dy) =>
    [...patternRow].every(
      (cell, dx) =>
        cell === "?" ||
        (cell === "#") === inkAt(bitmap, windowX + dx, windowY + dy),
    ),
  );

export type KernelMatch = {
  rule: KernelRule;
  /** top-left of the claimed active site, in bitmap cell coords */
  x: number;
  y: number;
};

/**
 * Every match of `rules` against `bitmap`, greedily and rule-major: each rule
 * is scanned across the whole bitmap in turn, so earlier (more specific)
 * rules claim their cells before later ones are considered at all. A match is
 * rejected if any cell of its active site is already claimed, which makes the
 * result depend on scan order wherever two active sites of the same rule can
 * overlap - patterns are written strictly enough that they cannot.
 */
export const scanKernelRules = (
  bitmap: boolean[][],
  rules: readonly KernelRule[],
): KernelMatch[] => {
  const width = bitmapWidth(bitmap);
  const claimed = new Set<number>();
  const matches: KernelMatch[] = [];

  for (const rule of rules) {
    const { activeSite } = rule;
    for (let y = 0; y + activeSite.h <= bitmap.length; y++) {
      for (let x = 0; x + activeSite.w <= width; x++) {
        if (
          !patternMatchesAt(bitmap, rule, x - activeSite.x, y - activeSite.y)
        ) {
          continue;
        }
        const cells: number[] = [];
        for (let dy = 0; dy < activeSite.h; dy++) {
          for (let dx = 0; dx < activeSite.w; dx++) {
            cells.push((y + dy) * width + x + dx);
          }
        }
        if (cells.some((cell) => claimed.has(cell))) {
          continue;
        }
        for (const cell of cells) {
          claimed.add(cell);
        }
        matches.push({ rule, x, y });
      }
    }
  }

  return matches;
};
