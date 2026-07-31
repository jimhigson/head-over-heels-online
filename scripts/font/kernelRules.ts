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
 * the cells a rule claims and redraws, as pattern-relative coordinates. The
 * pattern is the wider window the rule reads for context; the active site is
 * the part it actually takes over. Any shape is allowed, not only a
 * rectangle - the cells of a staircase run lie on a diagonal.
 *
 * The first cell listed is the anchor: a match is reported at its position,
 * and the action's geometry is placed from it. Sample windows of neighbouring
 * matches may overlap freely - only active sites are exclusive.
 */
export type KernelActiveSite = readonly (readonly [number, number])[];

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
  | { type: "roundedCorner"; corner: CornerName }
  /**
   * the claimed cells are one tread of a staircase - one cell across for
   * every `treadHeight` down. The square step is recut as the straight line
   * the staircase approximates, which passes through the tread's middle
   */
  | {
      type: "diagonalEdge";
      /** which side of this edge the ink lies on */
      ink: "left" | "right";
      /** which way the edge moves as it descends */
      step: "left" | "right";
      /** cells down per cell across: 1 is 45 degrees, 2 is a 1:2 slope */
      treadHeight: number;
      /**
       * how far, in cells, the line reaches sideways from the blocky edge at
       * the top of the tread and at the bottom. Half a cell lands on the
       * midpoint of a step, where the neighbouring tread's line meets it
       * exactly; a whole cell lands on a straight edge's own column, which is
       * what a run does where it abuts one, leaving no horizontal jog
       */
      topReach: number;
      bottomReach: number;
    }
  /**
   * the claimed cell is a lone cell beyond the end of a wider stroke - the
   * point of a ''', a '!', or the tip of an arrow. It is recut as a triangle
   * of the same area with sides at 45 degrees, so the stroke comes to a
   * proper point
   */
  | { type: "taperPoint"; towards: "up" | "down" };

export type KernelRule = {
  name: string;
  /**
   * rows of the sample window, every row the same length. Each character is
   * `#` ink (white in the source art), `.` no-ink (black, and everything
   * outside the glyph), or `?` either - for cells the rule does not care about
   */
  pattern: readonly string[];
  activeSite: KernelActiveSite;
  /**
   * cells outside the active site that the action's geometry also reaches
   * into, as pattern-relative coordinates. They are claimed alongside the
   * active site, so no later rule can take one as its own active site and
   * redraw a cell this one has already shaped
   */
  alsoClaims?: readonly (readonly [number, number])[];
  action: KernelRuleAction;
};

/**
 * where along its staircase a tread sits. A run may simply stop (`start`,
 * `end`), in which case the line carries on to where it would have gone; or
 * it may run into a straight edge (`junctionStart`, `junctionEnd`), where it
 * instead meets that edge's own column so no step of horizontal is left
 * between the two
 */
type RunPosition = "start" | "middle" | "end" | "junctionStart" | "junctionEnd";

/**
 * One tread of a staircase, as a rule. A tread is recognised from the row
 * above it and the row below: on the side the run continues towards, the edge
 * has moved one cell along, and on the side it came from, one cell back. At
 * the two ends of a run there is no tread beyond, so that row instead
 * requires the edge's own column to be clear - which is what lets a run be
 * straightened along its whole length rather than stopping a tread short at
 * each end.
 */
const staircaseRule = (
  ink: "left" | "right",
  step: "left" | "right",
  /** cells down per cell across: 1 is 45 degrees, 2 is a 1:2 slope */
  treadHeight: number,
  position: RunPosition,
): KernelRule => {
  const inkRight = ink === "right";
  const stepDir = step === "right" ? 1 : -1;
  const columns = [-2, -1, 0, 1, 2];
  const edgeColumn = 2;

  /**
   * a row in which the edge sits at `edgeOffset`: the cell there has ink and
   * the one just outside it does not. Nothing else in the row is constrained,
   * so a stroke may be any width without defeating the pattern
   */
  const rowWithEdgeAt = (edgeOffset: number) =>
    columns
      .map((offset) =>
        offset === edgeOffset ? "#"
        : offset === edgeOffset - (inkRight ? 1 : -1) ? "."
        : "?",
      )
      .join("");
  // past the end of a run the edge's own column is clear, along with
  // everything outside it; what lies further in is whatever the glyph does next
  const beyondRun = columns
    .map((offset) =>
      (
        inkRight ? offset <= 0 : offset >= 0
      ) ?
        "."
      : "?",
    )
    .join("");

  const treadRows = new Array(treadHeight).fill(rowWithEdgeAt(0));
  const nextTreadRows = new Array(treadHeight).fill(rowWithEdgeAt(stepDir));
  const previousTreadRows = new Array(treadHeight).fill(
    rowWithEdgeAt(-stepDir),
  );

  // a run's first and last treads are told from a lone step - which is a cut
  // corner, not a slope - by looking a whole tread further along: the run has
  // to keep stepping the same way for the tread beyond the neighbouring one.
  // A junction is told from a tread by the edge holding its column for longer
  // than a tread is tall, which is a straight edge rather than another step
  const straightRun = new Array(treadHeight + 1);
  const pattern =
    position === "start" ?
      [beyondRun, ...treadRows, ...nextTreadRows, rowWithEdgeAt(2 * stepDir)]
    : position === "end" ?
      [
        rowWithEdgeAt(-2 * stepDir),
        ...previousTreadRows,
        ...treadRows,
        beyondRun,
      ]
    : position === "junctionStart" ?
      [
        ...straightRun.fill(rowWithEdgeAt(-stepDir)),
        ...treadRows,
        rowWithEdgeAt(stepDir),
      ]
    : position === "junctionEnd" ?
      [
        rowWithEdgeAt(-stepDir),
        ...treadRows,
        ...straightRun.fill(rowWithEdgeAt(stepDir)),
      ]
    : [rowWithEdgeAt(-stepDir), ...treadRows, rowWithEdgeAt(stepDir)];
  const activeY =
    position === "end" ? 1 + treadHeight
    : position === "junctionStart" ? treadHeight + 1
    : 1;

  // the notch is the cleared cell the edge steps away from; claiming it stops
  // a corner rule taking it as its own active site part way down a slope. It
  // only exists on the side the run carries on towards
  const notchIsBelow = inkRight === (step === "right");
  const runStops = (end: "top" | "bottom") =>
    end === "top" ?
      position === "start" || position === "junctionStart"
    : position === "end" || position === "junctionEnd";
  const hasNotch = !runStops(notchIsBelow ? "bottom" : "top");
  const notch: ReadonlyArray<readonly [number, number]> = [
    [edgeColumn, notchIsBelow ? activeY + treadHeight : activeY - 1],
  ];

  // where a run meets a straight edge the line reaches that edge's column, so
  // the two join with no horizontal between them
  const reach = (end: "top" | "bottom") =>
    position === (end === "top" ? "junctionStart" : "junctionEnd") ? 1 : 0.5;

  return {
    name: `staircase1to${treadHeight}Ink${inkRight ? "Right" : "Left"}Step${stepDir > 0 ? "Right" : "Left"}${position}`,
    pattern,
    // the tread's own cells, top one first so it anchors the geometry
    activeSite: Array.from(
      { length: treadHeight },
      (_, i) => [edgeColumn, activeY + i] as const,
    ),
    ...(hasNotch ? { alsoClaims: notch } : {}),
    action: {
      type: "diagonalEdge",
      ink,
      step,
      treadHeight,
      topReach: reach("top"),
      bottomReach: reach("bottom"),
    },
  };
};

/**
 * every staircase tread rule, taller treads first so a 1:2 slope is never
 * read as a pair of 45 degree steps
 */
const staircaseRules: readonly KernelRule[] = [2, 1].flatMap((treadHeight) =>
  (["right", "left"] as const).flatMap((ink) =>
    (["left", "right"] as const).flatMap((step) =>
      // the junction variants come before `middle`, which a tread abutting a
      // straight edge would otherwise match, taking the midpoint anchor and
      // leaving a step of horizontal behind
      (["junctionStart", "junctionEnd", "middle", "start", "end"] as const).map(
        (position) => staircaseRule(ink, step, treadHeight, position),
      ),
    ),
  ),
);

export const kernelRules: readonly KernelRule[] = [
  // a stroke tapering to a single cell - the point of a ''' or '!', and the
  // tip of an arrow. Listed before the staircase rules because a tip is where
  // two slopes converge: both would claim the one cell, and only the first
  // could have it, leaving the glyph lopsided. Taking it once and drawing
  // both sides of the point together keeps such glyphs symmetrical
  {
    name: "taperPointDown",
    pattern: ["###", ".#.", "..."],
    activeSite: [[1, 1]],
    action: { type: "taperPoint", towards: "down" },
  },
  {
    name: "taperPointUp",
    pattern: ["...", ".#.", "###"],
    activeSite: [[1, 1]],
    action: { type: "taperPoint", towards: "up" },
  },
  // staircase treads - the 1:2 slopes of '/', '\', '%', '7', 'v' and 'V', and
  // the 45 degree ones of 'Z', '`' and the arrows. Listed before the corner
  // rules so a staircase claims its cells first: a single step is locally
  // indistinguishable from a cut corner, and on a slope it is the line, not a
  // rounded corner, that is wanted
  ...staircaseRules,
  {
    // a two-cell-tall no-ink column with ink all around - eg the lower counter
    // of a 'B' or the counter of a 'Q'. Listed before isolatedHole so the
    // larger feature claims its cells first
    name: "verticalSlotHole",
    pattern: ["###", "#.#", "#.#", "###"],
    activeSite: [
      [1, 1],
      [1, 2],
    ],
    action: { type: "slotHole" },
  },
  {
    // a single no-ink cell with ink on all eight sides - eg the counter of an
    // 'o'. The full ring is what makes the round hole safe to draw as an
    // independent contour: it guarantees the circle, which is a little wider
    // than the cell it replaces, still lands inside solid ink
    name: "isolatedHole",
    pattern: ["###", "#.#", "###"],
    activeSite: [[1, 1]],
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
    activeSite: [[1, 1]],
    alsoClaims: [
      [2, 1],
      [3, 1],
      [1, 2],
      [1, 3],
    ],
    action: { type: "roundedCorner", corner: "topLeft" },
  },
  {
    name: "roundedCornerTopRight",
    pattern: ["?...", "##..", "?##.", "??#?"],
    activeSite: [[2, 1]],
    alsoClaims: [
      [1, 1],
      [0, 1],
      [2, 2],
      [2, 3],
    ],
    action: { type: "roundedCorner", corner: "topRight" },
  },
  {
    name: "roundedCornerBottomLeft",
    pattern: ["?#??", ".##?", "..##", "...?"],
    activeSite: [[1, 2]],
    alsoClaims: [
      [2, 2],
      [3, 2],
      [1, 1],
      [1, 0],
    ],
    action: { type: "roundedCorner", corner: "bottomLeft" },
  },
  {
    name: "roundedCornerBottomRight",
    pattern: ["??#?", "?##.", "##..", "?..."],
    activeSite: [[2, 2]],
    alsoClaims: [
      [1, 2],
      [0, 2],
      [2, 1],
      [2, 0],
    ],
    action: { type: "roundedCorner", corner: "bottomRight" },
  },
];

const cornerRuleNames = [
  "roundedCornerTopLeft",
  "roundedCornerTopRight",
  "roundedCornerBottomLeft",
  "roundedCornerBottomRight",
];

/**
 * Characters that opt out of a rule their shape defeats. Some features are
 * genuinely indistinguishable by pattern - the tail of a ',' and the end of a
 * '4' crossbar present edges of identical length in every direction, yet one
 * wants rounding and the other does not - so where no pattern can tell them
 * apart the character names the rules it sits out.
 */
const rulesDisabledForChar: { [char: string]: readonly string[] } = {
  // rounding the end of the crossbar reads as a blob rather than a bar
  "4": ["roundedCornerBottomRight"],
  // its strokes should stay crisp; rounding every corner softens the whole glyph
  "#": cornerRuleNames,
};

/** the rules that apply to one character, minus any it opts out of */
export const kernelRulesForChar = (char: string): readonly KernelRule[] => {
  const disabled = rulesDisabledForChar[char];
  return disabled === undefined ? kernelRules : (
      kernelRules.filter((rule) => !disabled.includes(rule.name))
    );
};

const emptyClaims: readonly (readonly [number, number])[] = [];

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
  /** the active site's anchor cell, in bitmap cell coords */
  x: number;
  y: number;
};

/**
 * Every match of `rules` against `bitmap`, greedily and rule-major: each rule
 * is scanned across the whole bitmap in turn, so earlier (more specific)
 * rules claim their cells before later ones are considered at all.
 *
 * Only the active site decides whether a match is allowed: a match is refused
 * if any cell it would draw over is already claimed. The wider
 * {@link KernelRule.alsoClaims} cells are recorded but do not themselves
 * refuse anything, because two actions may legitimately reach into opposite
 * ends of the same cell without their geometry meeting - as the two rounded
 * corners on the short left edge of a 'g' do.
 */
export const scanKernelRules = (
  bitmap: boolean[][],
  rules: readonly KernelRule[],
): KernelMatch[] => {
  const width = bitmapWidth(bitmap);
  const claimed = new Set<number>();
  const matches: KernelMatch[] = [];

  for (const rule of rules) {
    const [[anchorX, anchorY]] = rule.activeSite;
    for (let y = 0; y < bitmap.length; y++) {
      for (let x = 0; x < width; x++) {
        // the scan positions the anchor cell, so the window sits back from it
        // by wherever the anchor lies within the pattern
        const windowX = x - anchorX;
        const windowY = y - anchorY;
        if (!patternMatchesAt(bitmap, rule, windowX, windowY)) {
          continue;
        }
        const inBitmap = (cellX: number, cellY: number) =>
          cellX >= 0 && cellY >= 0 && cellX < width && cellY < bitmap.length;

        const activeCells: number[] = [];
        let reachesOutside = false;
        for (const [siteX, siteY] of rule.activeSite) {
          const cellX = windowX + siteX;
          const cellY = windowY + siteY;
          if (!inBitmap(cellX, cellY)) {
            // every cell a rule redraws has to be a cell of this glyph
            reachesOutside = true;
            break;
          }
          activeCells.push(cellY * width + cellX);
        }
        if (reachesOutside || activeCells.some((cell) => claimed.has(cell))) {
          continue;
        }
        for (const cell of activeCells) {
          claimed.add(cell);
        }
        for (const [claimX, claimY] of rule.alsoClaims ?? emptyClaims) {
          const cellX = windowX + claimX;
          const cellY = windowY + claimY;
          if (inBitmap(cellX, cellY)) {
            claimed.add(cellY * width + cellX);
          }
        }
        matches.push({ rule, x, y });
      }
    }
  }

  return matches;
};
