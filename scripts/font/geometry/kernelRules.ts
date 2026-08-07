import { cornerChoices, type CornerName } from "./corners";

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

export type KernelRuleAction =
  /**
   * the claimed cells are a hole in the ink, ringed all round - the counter
   * of an o, the lower one of a B. Redrawn as a rounded rectangle over the
   * same cells, with each corner round or square and its size set by the
   * rule's options
   */
  | { type: "hole"; cellsWide: number; cellsTall: number }
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
      /**
       * whether the edge this tread belongs to runs down the glyph (a slope
       * of one across per `treadHeight` down) or across it (the transpose,
       * `treadHeight` across per one down). On the horizontal axis `ink` and
       * `step` name directions in the transposed frame, where x and y swap:
       * "right" reads as "down"
       */
      axis: "horizontal" | "vertical";
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
   * the claimed cell is the cut-off corner of a shape, filled back not with a
   * quarter-circle but with a straight 45 degree chamfer joining the two
   * edges either side of it
   */
  | { type: "chamferCorner"; corner: CornerName }
  /**
   * the claimed cell is a lone cell below a stroke of unchanging width - the
   * point of a ''' or a '!'. It is recut as a triangle of the same area with
   * sides at 45 degrees, so the stroke comes to a proper point.
   *
   * A stroke that widens as it goes back from the point is a taper, not a
   * stroke that stops - the tip of an arrow, say - and that tip is made by
   * the two slopes converging on it, not by a rule of its own
   */
  | { type: "taperPoint" }
  /**
   * the claimed cell is a lone cell standing out from a straight edge, the
   * point where two curves meet. It is recut as a triangle of the same area
   * with two sides at 45 degrees, so the shape comes to a proper point
   */
  | { type: "apexPoint"; towards: "left" | "right" }
  /**
   * the claimed cell is a one-cell bite out of a surface with ink below it -
   * the inside of a 'v' where its two strokes meet. It is filled in and recut
   * as a V one cell wide coming to a point on the far edge, so the two
   * surfaces either side run into each other rather than into a square step
   */
  | { type: "valleyPoint" }
  /**
   * the claimed cell is a single cell bitten out of an otherwise straight
   * edge. It is recut as a V of the same area with sides at 45 degrees - a
   * mouth two cells wide across the edge, one cell deep
   */
  | { type: "notch"; opens: "down" | "left" | "right" | "up" }
  /**
   * the claimed cell is a square step in a pair of edges - the shoulder above
   * a '1' flag, the underside of a 'Y' arm where it meets the stem, the
   * corner of a 'P' bowl. What the 45 degree line does there is the rule's
   * mode
   */
  | { type: "chamferStep"; corner: CornerName }
  /**
   * the claimed cell is the cut-off corner of a shape whose edge does not
   * carry on past it - under the waist of an 'e', at the outer corner of a
   * 'q' tail. Rounded or cut straight, by mode
   */
  | { type: "waistedCorner"; corner: CornerName }
  /**
   * the claimed cell is ink whose own corner is exposed - nothing above it
   * and nothing beside it, as at the top left of the lower bowl of an '&'.
   * Unlike the other corner treatments there is no cut cell to fill first:
   * the corner is simply taken off the ink, rounded or straight, by option
   */
  | { type: "inkCorner"; corner: CornerName }
  /**
   * the claimed cell is ink with clear cells on the two sides meeting at
   * `corner`, and half of it is taken away along the diagonal - the plain
   * chamfer for putting a corner on a 45 degree step
   */
  | { type: "singleChamferSub"; corner: CornerName }
  /**
   * the claimed cell is clear with ink on the two sides meeting at `corner`,
   * and half of it is filled along the same diagonal - joining those two
   * neighbours across the gap between them
   */
  | { type: "singleChamferAdd"; corner: CornerName }
  /**
   * a one-cell bite recut as a half circle the width of the pixel, so the
   * surface dips in one round scoop rather than stepping in and out. The
   * claimed cell is the bite itself where `fills`, and the ink backing it
   * otherwise - which puts the scoop half a cell shallower or deeper
   */
  | {
      type: "uValley";
      opens: "down" | "left" | "right" | "up";
      fills: boolean;
    };

export type KernelRuleChoice = {
  name: string;
  /** shown in the editor beside the choice's name */
  description: string;
};

/**
 * one thing about a rule's drawing that is decided where it is used rather
 * than by the rule.
 *
 * The pattern says a feature is here; it cannot say what the letter means by
 * it. A step in an edge might want the whole edge straightened or just its
 * corner taken off; a hole might want any of its corners round or square.
 * Rather than a rule per treatment - which would mean many rules matching
 * identically and racing for the cell - one rule matches and its options are
 * answered at the cell.
 *
 * Options are independent of each other: a hole's corners and its scale are
 * separate questions, and answering one says nothing about the other
 */
export type KernelRuleOption = {
  /** what is being decided, eg "corners" or "scale" */
  name: string;
  description: string;
  /** what it can be set to, the first being what it is when nothing is said */
  choices: readonly KernelRuleChoice[];
};

export type KernelRule = {
  name: string;
  /** what this rule leaves to be decided where it is used */
  options?: readonly KernelRuleOption[];
  /**
   * true for a rule that fires nowhere until it is switched on at a
   * particular cell. Some treatments are wanted at one place in one glyph and
   * nowhere else - the rounding under an 'e', the chamfer on a 'q' tail - and
   * their local shape is too ordinary to pattern-match safely across the whole
   * font. Rather than naming the character in the rule, the rule is written
   * for the shape and switched on where it is wanted
   */
  defaultOff?: boolean;
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
 * How a straightened run ends where another run converges on it - the apex of
 * a caret, the tip of a v, the point of an arrow.
 *
 * Reaching a fixed half-tread past the last step lands both runs on the same
 * point, but that point is not on either run's own line: the other end of the
 * run is carried a whole cell to meet the edge it abuts, and the two unequal
 * reaches tilt the line off the angle its steps were cut at. Carrying each run
 * along its own line until the two cross keeps both at the angle the art draws
 * them at, and raises the apex to wherever that crossing falls
 */
/**
 * Where a run's line sits across the steps it stands for.
 *
 * The line has to pass somewhere between the outer corners of the staircase
 * and its inner ones, and halfway is the only place it takes as much area off
 * one side as it puts on the other. That is the right answer for a stroke
 * whose weight should not change, but it leaves the line's two ends half a
 * cell inside the pixel grid, so a slope meeting a square edge meets it half
 * a pixel short. Pushed to either extreme the ends land on pixel boundaries
 * and the join is exact, at the price of the stroke gaining or losing the
 * ribbon of triangles the line cuts.
 *
 * This moves the straight line a run draws. A run drawn as a curve instead -
 * one steeper than 45 degrees whose edge carries on as a 45 degree run - is
 * shaped by the tangents of the pieces either side of it, and takes its
 * position from them rather than from anything of its own to move
 */
export const slopeOption: KernelRuleOption = {
  name: "slope",
  description: "where the line sits across the steps",
  choices: [
    {
      name: "areaPreserving",
      description:
        "through the middle of the steps, leaving the ink area as it was",
    },
    {
      name: "add",
      description:
        "on the steps' outer corners, on the pixel grid - the stroke gains",
    },
    {
      name: "subtract",
      description:
        "on the steps' inner corners, on the pixel grid - the stroke loses",
    },
  ],
};

export const runTipOption: KernelRuleOption = {
  name: "tip",
  description: "where a run ends when another converges on it",
  choices: [
    {
      name: "keepAngle",
      description: "carry both lines on until they cross, raising the apex",
    },
    {
      name: "halfTread",
      description: "stop half a step past the last tread",
    },
  ],
};

/**
 * How far a run's line carries past the last tread at an end that abuts
 * something.
 *
 * A run that meets a straight edge reaches that edge's own column, so the two
 * join with no step of horizontal between them. Where what it meets is a
 * wider stroke rather than an edge, there is no column to aim at, and
 * reaching for one tilts the line off the angle its steps were cut at - so
 * the line instead carries the half tread that keeps that angle. Which of the
 * two is wanted is a matter of what lies at the run's other end, so it is
 * asked rather than assumed
 */
export const runEndOption: KernelRuleOption = {
  name: "runEnd",
  description: "how far the line carries past this end",
  choices: [
    {
      name: "toWhatItMeets",
      description: "on to the column of the edge it stops against",
    },
    {
      name: "halfTread",
      description: "half a step, holding the angle the treads were cut at",
    },
    {
      name: "noFurther",
      description: "stop on the tread's own column, square on the pixel grid",
    },
  ],
};

/**
 * Where a curved run stops at the end its edge carries on from.
 *
 * A slope steeper than 45 degrees is drawn as one curve, and normally that
 * curve hands over where the steeper slope gives way - the 45 degree run
 * beyond it draws its own straight line, and the pixel steps above that draw
 * theirs. Where the edge is one sweep rather than a slope meeting a corner,
 * the curve can instead swallow the 45 degree run whole and run on to the
 * corner past it, leaving the stroke a single unbroken arc from the bar it
 * leaves to the point it ends at
 */
export const curveEndOption: KernelRuleOption = {
  name: "curveEnd",
  description: "where the curve stops at its shallower end",
  choices: [
    {
      name: "atSlopeChange",
      description: "hand over where the 45 degree run takes the edge on",
    },
    {
      name: "atCorner",
      description: "swallow that run and carry on to the corner past it",
    },
  ],
};

/**
 * How big to draw a feature that cannot both keep its area and stay inside
 * the cells it replaces.
 *
 * Rounding a corner takes area away, so a shape holding its area has to grow
 * to pay for it, and grow past the cells it stands for. Which matters more is
 * a matter of the glyph: ink that is counted against its neighbours wants its
 * area, ink hemmed in by them wants to stay put
 */
export const scaleOption: KernelRuleOption = {
  name: "scale",
  description: "size against the cells this replaces",
  choices: [
    {
      name: "areaPreserving",
      description: "sized so its area is exactly the cells it replaces",
    },
    {
      name: "fitInPixel",
      description: "kept inside those cells, whatever that costs in area",
    },
  ],
};

/** which of a shape's four corners are rounded, in every combination */
export const cornersOption: KernelRuleOption = {
  name: "corners",
  description: "which corners are rounded rather than square",
  choices: cornerChoices,
};

/** every hole is asked the same two questions */
const holeOptions: readonly KernelRuleOption[] = [
  { ...cornersOption, choices: [...cornerChoices].reverse() },
  scaleOption,
];

/**
 * A bite out of an edge can be read more than one way, and the pixels around
 * it cannot say which: a symmetrical V treats both strokes as bending, a
 * wedge leaves one of them straight and slants only the other - which is what
 * the stem and leg of an 'R' want. All three take away exactly the pixel the
 * fill puts back, so the choice is about shape alone
 */
const notchShapeOption: KernelRuleOption = {
  name: "shape",
  description: "how the bite is cut",
  choices: [
    { name: "v", description: "symmetrical V, both sides at 45°" },
    {
      name: "wedgeSquareLow",
      description: "square on the left (or top) side, 45° on the other",
    },
    {
      name: "wedgeSquareHigh",
      description: "square on the right (or bottom) side, 45° on the other",
    },
  ],
};

/**
 * A step in an edge can be cut back two ways, and which is right depends on
 * whether the edges either side carry on straight. Where they do - the
 * shoulder of a '1', the arms of a 'Y' - the line can reach past the cell and
 * take away exactly the pixel the fill put back, straightening the whole
 * edge. Where they do not, as at the corner of a 'P' bowl, reaching out that
 * far cuts across ink that is not part of the step and leaves a spur, so the
 * cut stays inside the cell instead
 */
/**
 * a single cell bitten out of an otherwise straight edge - the waist of a
 * 'k', the four bites of an 'x', and one each in 'w' and 'B'. The column or
 * row just outside the edge has to be clear for the whole height of the
 * pattern, which is what makes the edge straight either side of the bite
 */
const notchRules: readonly KernelRule[] = (
  [
    { opens: "right", pattern: ["##.", "#..", "##."] },
    { opens: "left", pattern: [".##", "..#", ".##"] },
    { opens: "up", pattern: ["...", "#.#", "###"] },
    { opens: "down", pattern: ["###", "#.#", "..."] },
  ] as const
).map(({ opens, pattern }): KernelRule => ({
  name: `notchOpens${opens[0].toUpperCase()}${opens.slice(1)}`,
  options: [notchShapeOption],
  pattern,
  activeSite: [[1, 1]],
  action: { type: "notch", opens },
}));

/**
 * A one-cell bite recut as a half circle - the same place the V-shaped
 * {@link valleyRule} reads, rounded instead of pointed.
 *
 * Each direction comes in two, differing only in which cell they claim. The
 * additive one takes the bitten cell: it is filled in and the scoop taken out
 * of the surface, leaving a dip half a cell deep where the bite was a whole
 * one. The subtractive one takes the ink behind the bite and scoops that
 * instead, leaving the square bite as it was with a rounded floor half a cell
 * further in. Which reads better is a matter of the glyph, so both are here
 */
const uValleyRules: readonly KernelRule[] = (
  [
    { opens: "up", pattern: ["#.#", "?#?"], bite: [1, 0], backing: [1, 1] },
    { opens: "down", pattern: ["?#?", "#.#"], bite: [1, 1], backing: [1, 0] },
    {
      opens: "left",
      pattern: ["#?", ".#", "#?"],
      bite: [0, 1],
      backing: [1, 1],
    },
    {
      opens: "right",
      pattern: ["?#", "#.", "?#"],
      bite: [1, 1],
      backing: [0, 1],
    },
  ] as const
).flatMap(({ opens, pattern, bite, backing }): KernelRule[] => {
  const named = `${opens[0].toUpperCase()}${opens.slice(1)}`;
  return [
    {
      name: `uValleyAdd${named}`,
      defaultOff: true,
      pattern,
      activeSite: [bite],
      action: { type: "uValley", opens, fills: true },
    },
    {
      name: `uValleySub${named}`,
      defaultOff: true,
      pattern,
      activeSite: [backing],
      action: { type: "uValley", opens, fills: false },
    },
  ];
});

/**
 * The two halves of a step, cut off or filled in.
 *
 * Every 45 degree staircase is made of these, so both match all over the font
 * and neither does anything until it is switched on at a cell. What they are
 * for is the odd corner a staircase rule cannot reach - one step of a slope
 * that no run picks up, or a gap between two cells that should read as one
 * continuous diagonal.
 *
 * The window is the smallest that can tell which corner is meant: the cell
 * itself and its two orthogonal neighbours, with the cell diagonally across
 * left unread
 */
const singleChamferRules: readonly KernelRule[] = (
  [
    {
      corner: "topLeft",
      sub: ["?.", ".#"],
      subSite: [1, 1],
      add: ["?#", "#."],
      addSite: [1, 1],
    },
    {
      corner: "topRight",
      sub: [".?", "#."],
      subSite: [0, 1],
      add: ["#?", ".#"],
      addSite: [0, 1],
    },
    {
      corner: "bottomLeft",
      sub: [".#", "?."],
      subSite: [1, 0],
      add: ["#.", "?#"],
      addSite: [1, 0],
    },
    {
      corner: "bottomRight",
      sub: ["#.", ".?"],
      subSite: [0, 0],
      add: [".#", "#?"],
      addSite: [0, 0],
    },
  ] as const
).flatMap(({ corner, sub, subSite, add, addSite }): KernelRule[] => [
  {
    name: `singleChamferSub${corner[0].toUpperCase()}${corner.slice(1)}`,
    defaultOff: true,
    pattern: sub,
    activeSite: [subSite],
    action: { type: "singleChamferSub", corner },
  },
  {
    name: `singleChamferAdd${corner[0].toUpperCase()}${corner.slice(1)}`,
    defaultOff: true,
    pattern: add,
    activeSite: [addSite],
    action: { type: "singleChamferAdd", corner },
  },
]);

/**
 * Which way a point's sides carry on into the ink behind it.
 *
 * A side carried on takes the corner off the cell it runs into, so the taper
 * is unbroken rather than meeting a flat wall. Whether that is wanted depends
 * on what the shape does beyond the cell the rule can see: where the stroke
 * carries on it continues the point, and where it runs into the glyph's own
 * outer edge it only nicks a straight boundary
 */
export const pointCarryOption: KernelRuleOption = {
  name: "carryInto",
  description: "which sides run on into the ink behind the point",
  choices: [
    { name: "bothSides", description: "both, so the point tapers either way" },
    {
      name: "above",
      description: "only the side above, leaving the lower edge straight",
    },
    {
      name: "below",
      description: "only the side below, leaving the upper edge straight",
    },
    { name: "neither", description: "stop at the edge, leaving both straight" },
  ],
};

/**
 * A single cell standing proud of a straight edge, with clear cells above and
 * below it - the left point of an infinity sign, where two curves meet.
 *
 * It is redrawn as a triangle coming to a point, its two sides at 45 degrees.
 * A right-angled point reaching `d` out from its apex encloses d², so
 * reaching a whole cell gives it exactly the pixel it replaces - which makes
 * it two cells tall where the pixel was one, spilling half a cell into the
 * clear cell either side, where the edge it stands on carries on anyway
 */
const apexRules: readonly KernelRule[] = (
  [
    { towards: "left", pattern: ["?.#", ".##", "?.#"] },
    { towards: "right", pattern: ["#.?", "##.", "#.?"] },
  ] as const
).map(({ towards, pattern }): KernelRule => ({
  name: `apexPoints${towards[0].toUpperCase()}${towards.slice(1)}`,
  options: [pointCarryOption],
  // a cell standing off an edge is common - it is every arrow's tip, where
  // the two slopes meeting there already make the point between them - so
  // this is offered where the edge really does stop rather than taken
  defaultOff: true,
  pattern,
  activeSite: [[1, 1]],
  // the triangle reaches half a cell into the clear cell above and below, so
  // neither is left for another rule to draw something else in
  alsoClaims: [
    [1, 0],
    [1, 2],
  ],
  action: { type: "apexPoint", towards },
}));

/**
 * A one-cell bite out of a surface, with ink carrying on underneath it - the
 * inside of a 'v', where the two strokes meet.
 *
 * Where {@link notchRules} recut a bite as a mouth two cells wide, this comes
 * to a point one cell wide: sides at the 1:2 slope running from the corners of
 * the bitten cell down to the middle of its far edge. It takes half the pixel
 * the square bite took, so the surfaces either side meet at a point rather
 * than stepping down and back up.
 */
const valleyRule: KernelRule = {
  name: "valleyPoint",
  // read from below, a one-cell counter looks exactly like a bite out of a
  // surface - which is every bowl in the font - so this is offered at the
  // cell rather than taken wherever the two rows happen to line up
  defaultOff: true,
  pattern: ["#.#", "###"],
  // the bitten cell itself: it is what gets filled in and recut
  activeSite: [[1, 0]],
  action: { type: "valleyPoint" },
};

/**
 * half the width of the stroke the taper rule requires above the tip - the
 * pattern asks for three cells, so the point runs up to one and a half either
 * side of the tip cell's middle
 */
export const taperStrokeHalfWidth = 1.5;

/** the tallest tread any staircase rule matches - a 1:2 or 2:1 slope */
const longestTread = 2;

/**
 * where along its staircase a tread sits. A run may simply stop (`start`,
 * `end`), in which case the line carries on to where it would have gone; or
 * it may run into a straight edge (`junctionStart`, `junctionEnd`), where it
 * instead meets that edge's own column so no step of horizontal is left
 * between the two
 */
type RunPosition =
  | "end"
  | "junctionEnd"
  | "junctionStart"
  | "mergedStart"
  | "middle"
  | "shortJunctionEnd"
  | "shortJunctionStart"
  | "start";

/**
 * the positions that read less of a straight edge than a junction needs, and
 * so are offered rather than taken: each of them would misread an ordinary
 * slope somewhere, which is why none is on until a cell asks for it
 */
const shortJunctions: readonly RunPosition[] = [
  "shortJunctionStart",
  "shortJunctionEnd",
  "mergedStart",
];

/** the ends whose reach is a judgement about what the run stops against */
const reachIsAChoice: readonly RunPosition[] = [
  "junctionStart",
  "junctionEnd",
  "shortJunctionStart",
  "shortJunctionEnd",
  "mergedStart",
];

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

  // the ink carrying on across where the edge would be, so nothing can be read
  // from this row about where the run goes - what a run merging into a wider
  // stroke has beyond its outermost tread
  const wider = columns
    .map((offset) =>
      (
        inkRight ? offset >= 0 && offset <= 1 : offset <= 0 && offset >= -1
      ) ?
        "#"
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
  //
  // A junction is a genuinely straight edge, so it has to hold its column for
  // longer than any tread could. Were it merely longer than this tread, a 45
  // degree tread would read the 1:2 tread above it as a straight edge and
  // reach a whole cell into it, rather than meeting its line where the two
  // slopes change over - which is how a curve of mixed slopes stays smooth
  const straightRun = new Array(longestTread + 1);
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
    : position === "shortJunctionStart" ?
      // the edge holds its own column for one row before stepping away: a bar
      // two rows deep, of which the lower row is already the run's first tread
      [
        ...treadRows,
        ...treadRows,
        rowWithEdgeAt(stepDir),
        rowWithEdgeAt(2 * stepDir),
      ]
    : position === "shortJunctionEnd" ?
      // the run runs into something wider: below the last tread the edge does
      // not step on, it stays put or jumps back out. One tread above is all
      // the run there is to see - an arm meeting a stem may be two cells long
      // in total - so this asks for no more, and is offered rather than taken
      [rowWithEdgeAt(-stepDir), ...treadRows, wider]
    : position === "mergedStart" ?
      // the same the other way up: the run comes out of something wider, so
      // above the first tread there is no edge to read because the ink
      // carries straight past where it would be
      [wider, ...treadRows, rowWithEdgeAt(stepDir)]
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
    : position === "shortJunctionStart" ? treadHeight
    : 1;

  // the notch is the cleared cell the edge steps away from; claiming it stops
  // a corner rule taking it as its own active site part way down a slope. It
  // only exists on the side the run carries on towards
  const notchIsBelow = inkRight === (step === "right");
  const runStops = (end: "bottom" | "top") =>
    end === "top" ?
      position === "start" ||
      position === "junctionStart" ||
      position === "shortJunctionStart" ||
      position === "mergedStart"
    : position === "end" ||
      position === "junctionEnd" ||
      position === "shortJunctionEnd";
  const hasNotch = !runStops(notchIsBelow ? "bottom" : "top");
  const notch: ReadonlyArray<readonly [number, number]> = [
    [edgeColumn, notchIsBelow ? activeY + treadHeight : activeY - 1],
  ];

  // where a run meets a straight edge the line reaches that edge's column, so
  // the two join with no horizontal between them
  const reach = (end: "bottom" | "top") => {
    if (end === "top" && position === "shortJunctionStart") {
      // the first tread already sits on the bar's own column, so the line
      // starts where it is - carrying it further would tilt it off the angle
      // its steps were cut at
      return 0;
    }
    return (
        end === "top" ?
          position === "junctionStart"
        : position === "junctionEnd" || position === "shortJunctionEnd"
      ) ?
        1
      : 0.5;
  };

  return {
    name: `staircase1to${treadHeight}Ink${inkRight ? "Right" : "Left"}Step${stepDir > 0 ? "Right" : "Left"}${position}`,
    // only a slope steeper than 45 degrees is ever drawn as a curve, so only
    // those have an end for the curve to stop at
    options: [
      runTipOption,
      slopeOption,
      // only a slope steeper than 45 degrees is ever drawn as a curve, so only
      // those have an end for the curve to stop at
      ...(treadHeight > 1 ? [curveEndOption] : []),
      ...(reachIsAChoice.includes(position) ? [runEndOption] : []),
    ],
    // a two-row straight edge is not proof of a straight edge: a 1:2 tread
    // reads the same way, which is why a junction normally wants a row more
    // than any tread could account for. Where the bar really is only two rows
    // - as at both ends of a 'z' diagonal - the run can be joined up by
    // switching this on at the tread, rather than by loosening the rule for
    // every glyph
    defaultOff: shortJunctions.includes(position) || undefined,
    pattern,
    // the tread's own cells, top one first so it anchors the geometry
    activeSite: Array.from(
      { length: treadHeight },
      (_, i) => [edgeColumn, activeY + i] as const,
    ),
    ...(hasNotch ? { alsoClaims: notch } : {}),
    action: {
      type: "diagonalEdge",
      axis: "vertical",
      ink,
      step,
      treadHeight,
      topReach: reach("top"),
      bottomReach: reach("bottom"),
    },
  };
};

/**
 * the same rule with x and y swapped, turning a slope that runs down the
 * glyph into one that runs across it - a 1:2 becomes a 2:1. Patterns
 * transpose row-for-column, and every cell coordinate swaps with it
 */
const transposed = (rule: KernelRule): KernelRule => {
  const [firstRow] = rule.pattern;
  const swap = ([x, y]: readonly [number, number]) => [y, x] as const;
  if (rule.action.type !== "diagonalEdge") {
    throw new Error("only a diagonalEdge rule can be transposed");
  }
  return {
    ...rule,
    name: rule.name.replace("staircase1to", "staircaseFlat1to"),
    pattern: [...firstRow].map((_, column) =>
      rule.pattern.map((row) => row[column]).join(""),
    ),
    activeSite: rule.activeSite.map(swap),
    alsoClaims: rule.alsoClaims?.map(swap),
    action: { ...rule.action, axis: "horizontal" },
  };
};

/**
 * every staircase tread rule, longer treads first so a 1:2 or 2:1 slope is
 * never read as a pair of 45 degree steps. A 45 degree slope is its own
 * transpose, so only the two-cell treads are generated both ways round
 */
const verticalStaircaseRules: readonly KernelRule[] = [2, 1].flatMap(
  (treadHeight) =>
    (["right", "left"] as const).flatMap((ink) =>
      (["left", "right"] as const).flatMap((step) =>
        // the junction variants come before `middle`, which a tread abutting a
        // straight edge would otherwise match, taking the midpoint anchor and
        // leaving a step of horizontal behind
        (
          [
            "junctionStart",
            "junctionEnd",
            "shortJunctionStart",
            "shortJunctionEnd",
            "mergedStart",
            "middle",
            "start",
            "end",
          ] as const
        ).map((position) => staircaseRule(ink, step, treadHeight, position)),
      ),
    ),
);

const isTwoCellTread = (rule: KernelRule) =>
  rule.action.type === "diagonalEdge" && rule.action.treadHeight > 1;

/**
 * the two-cell treads both ways round before the 45 degree ones, so a 1:2 or
 * 2:1 slope is never read as a pair of 45 degree steps
 */
const staircaseRules: readonly KernelRule[] = [
  ...verticalStaircaseRules.filter(isTwoCellTread),
  ...verticalStaircaseRules.filter(isTwoCellTread).map(transposed),
  ...verticalStaircaseRules.filter((rule) => !isTwoCellTread(rule)),
];

export const kernelRules: readonly KernelRule[] = [
  // a stroke that stops at a single cell - the point of a ''' or a '!'. The
  // row two back must be no wider than the row before it: where a stroke does
  // widen, the cell is the tip of a taper and belongs to the slopes that meet
  // there
  {
    name: "taperPoint",
    pattern: [".###.", ".###.", "..#..", "....."],
    activeSite: [[2, 2]],
    action: { type: "taperPoint" },
  },
  // a single cell bitten out of an otherwise straight edge - the waist of a
  // 'k', the four bites of an 'x', and one each in 'w' and 'B'. The column or
  // row just outside the edge has to be clear for the whole height of the
  // pattern, which is what makes the edge straight either side of the bite
  ...notchRules,
  // a lone cell standing proud of a straight edge, brought to a point
  ...apexRules,
  // a one-cell bite with ink below it, brought to a point
  valleyRule,
  // half a cell taken off a step, or filled into one
  ...singleChamferRules,
  // a one-cell bite scooped into a half circle
  ...uValleyRules,
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
    options: holeOptions,
    pattern: ["###", "#.#", "#.#", "###"],
    activeSite: [
      [1, 1],
      [1, 2],
    ],
    action: { type: "hole", cellsWide: 1, cellsTall: 2 },
  },
  {
    // a two-by-two hole ringed by ink. Listed before the smaller holes, so
    // the largest feature that fits claims the cells
    name: "squareHole",
    options: holeOptions,
    pattern: ["####", "#..#", "#..#", "####"],
    activeSite: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2],
    ],
    action: { type: "hole", cellsWide: 2, cellsTall: 2 },
  },
  {
    // a single no-ink cell with ink on all eight sides - eg the counter of an
    // 'o'. The full ring is what makes the round hole safe to draw as an
    // independent contour: it guarantees the circle, which is a little wider
    // than the cell it replaces, still lands inside solid ink
    name: "isolatedHole",
    options: holeOptions,
    pattern: ["###", "#.#", "###"],
    activeSite: [[1, 1]],
    action: { type: "hole", cellsWide: 1, cellsTall: 1 },
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
  // a square step in a pair of edges, cut back to one 45 degree line. Off
  // until switched on: whether a step is a corner that should stay square or
  // a shoulder that should ramp is a matter of what the letter is doing,
  // which the surrounding cells cannot say
  ...(["topLeft", "topRight", "bottomLeft", "bottomRight"] as const).map(
    (corner): KernelRule => ({
      name: `chamferStep${corner[0].toUpperCase()}${corner.slice(1)}`,
      defaultOff: true,
      options: [scaleOption],
      pattern: [
        corner.startsWith("top") ? "?.?" : "?#?",
        corner.endsWith("Left") ? "..#" : "#..",
        corner.startsWith("top") ? "?#?" : "?.?",
      ],
      activeSite: [[1, 1]],
      action: { type: "chamferStep", corner },
    }),
  ),
  // ink whose own corner is exposed - nothing above it and nothing beside
  // it. Off until switched on: a stroke ending in a square corner is the
  // usual thing, and only the letter knows where one should be softened
  ...(["topLeft", "topRight", "bottomLeft", "bottomRight"] as const).map(
    (corner): KernelRule => ({
      name: `inkCorner${corner[0].toUpperCase()}${corner.slice(1)}`,
      defaultOff: true,
      options: [
        {
          name: "cut",
          description: "how the corner is taken off the ink",
          choices: [
            { name: "round", description: "a quarter circle within the cell" },
            { name: "chamfer", description: "straight across the cell at 45°" },
          ],
        },
      ],
      pattern: [
        corner.startsWith("top") ? "?.?" : "?#?",
        corner.endsWith("Left") ? ".##" : "##.",
        corner.startsWith("top") ? "?#?" : "?.?",
      ],
      activeSite: [[1, 1]],
      action: { type: "inkCorner", corner },
    }),
  ),
  // an outer corner whose edge does not carry on upwards - the corner under
  // the waist of an 'e', the outer corner of a 'q' tail. Too ordinary a shape
  // to treat wherever it occurs, so it is off until switched on at a cell
  {
    name: "waistedCorner",
    defaultOff: true,
    options: [
      {
        name: "cut",
        description: "how the corner is taken off",
        choices: [
          {
            name: "round",
            description: "a quarter circle, as other corners take",
          },
          { name: "diagonal", description: "straight across the cell at 45°" },
        ],
      },
    ],
    pattern: ["##?", "#..", "..."],
    activeSite: [[1, 1]],
    action: { type: "waistedCorner", corner: "bottomRight" },
  },
];

/**
 * the characters whose glyphs genuinely end in a point. Point detection is an
 * allow-list, never inferred from shape alone, and unlike every other rule it
 * cannot be switched on anywhere by an edit - no other character can grow a
 * point. The spritesheet-name entries are the same two glyphs' art under
 * their second entries
 */
const taperPointChars = new Set(["!", "'", "EXCLMK", "SQUOTE"]);

/**
 * the rules a character could possibly be shaped by. Only point detection is
 * gated here; everything else is decided per rule and per pixel by whatever
 * {@link RuleAllows} the caller supplies, so a rule can be off across a glyph
 * and on at one cell of it
 */
export const kernelRulesForChar = (char: string): readonly KernelRule[] =>
  kernelRules
    .filter((rule) => rule.name !== "taperPoint" || taperPointChars.has(char))
    // a rule that only ever fires where it is switched on is an instruction
    // about one cell, so it claims that cell ahead of the general rules that
    // might otherwise have taken it first
    .toSorted(
      (a, b) => Number(b.defaultOff ?? false) - Number(a.defaultOff ?? false),
    );

export const ruleNamed = (ruleName: string): KernelRule | undefined =>
  kernelRules.find((rule) => rule.name === ruleName);

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

/**
 * whether a rule could ever redraw a given cell of a glyph - true where its
 * pattern matches somewhere that puts one of its active-site cells here.
 *
 * This asks only about the art, not about what other rules did: a rule that
 * could claim a cell but loses the race to an earlier one still answers true,
 * because it is a rule the author might want to switch off here to let a
 * different one win. A rule that answers false can do nothing here whatever
 * it is set to, and so is worth hiding
 */
export const ruleCouldClaim = (
  bitmap: boolean[][],
  rule: KernelRule,
  x: number,
  y: number,
): boolean =>
  rule.activeSite.some(([siteX, siteY]) =>
    patternMatchesAt(bitmap, rule, x - siteX, y - siteY),
  );

/** an answer to each of a rule's options, keyed by option name */
export type RuleChoices = { [optionName: string]: string };

export type KernelMatch = {
  rule: KernelRule;
  /** the active site's anchor cell, in bitmap cell coords */
  x: number;
  y: number;
  /** what every one of the rule's options came out as for this match */
  choices: RuleChoices;
};

/** every option answered by its first choice - what a rule does unasked */
export const defaultChoices = (rule: KernelRule): RuleChoices =>
  Object.fromEntries(
    (rule.options ?? []).map((option) => [option.name, option.choices[0].name]),
  );

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
/**
 * whether a rule may take a particular set of cells. Called once per candidate
 * match with the cells the rule would redraw, so a decision can be made about
 * the rule, about the place, or about both
 */
export type RuleAllows = (
  ruleName: string,
  activeCells: ReadonlyArray<readonly [number, number]>,
) => boolean;

/** whatever has been chosen for a rule's options where it matched */
export type RuleChoicesAt = (
  ruleName: string,
  activeCells: ReadonlyArray<readonly [number, number]>,
) => RuleChoices;

export type RuleSettings = { allows: RuleAllows; choicesAt: RuleChoicesAt };

/** with nothing said about a character, every rule's own defaults stand */
const rulesOwnDefaults: RuleSettings = {
  allows: (ruleName) => !(ruleNamed(ruleName)?.defaultOff ?? false),
  choicesAt: () => ({}),
};

export const scanKernelRules = (
  bitmap: boolean[][],
  rules: readonly KernelRule[],
  { allows, choicesAt }: RuleSettings = rulesOwnDefaults,
): KernelMatch[] => {
  const width = bitmapWidth(bitmap);
  /**
   * what has claimed each cell. A plain claim (`"cell"`) is exclusive of
   * everything; a diagonalEdge rule claims only the side of the cell its edge
   * redraws, so two staircases converging on a point - the bottom of a
   * shield - may each take their own side of the shared tip cell
   */
  const claimed = new Map<number, Set<string>>();
  const matches: KernelMatch[] = [];

  for (const rule of rules) {
    const claimKey =
      rule.action.type === "diagonalEdge" ?
        `edge:${rule.action.axis}:${rule.action.ink}`
      : "cell";
    const blocked = (cell: number): boolean => {
      const cellClaims = claimed.get(cell);
      return (
        cellClaims !== undefined &&
        (claimKey === "cell" ?
          cellClaims.size > 0
        : cellClaims.has("cell") || cellClaims.has(claimKey))
      );
    };
    const claim = (cell: number, key: string) => {
      const existing = claimed.get(cell);
      if (existing === undefined) {
        claimed.set(cell, new Set([key]));
      } else {
        existing.add(key);
      }
    };
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

        const activeCells: Array<[number, number]> = [];
        let reachesOutside = false;
        for (const [siteX, siteY] of rule.activeSite) {
          const cellX = windowX + siteX;
          const cellY = windowY + siteY;
          if (!inBitmap(cellX, cellY)) {
            // every cell a rule redraws has to be a cell of this glyph
            reachesOutside = true;
            break;
          }
          activeCells.push([cellX, cellY]);
        }
        if (reachesOutside) {
          continue;
        }
        const cells = activeCells.map(
          ([cellX, cellY]) => cellY * width + cellX,
        );
        if (cells.some(blocked) || !allows(rule.name, activeCells)) {
          continue;
        }
        for (const cell of cells) {
          claim(cell, claimKey);
        }
        for (const [claimX, claimY] of rule.alsoClaims ?? emptyClaims) {
          const cellX = windowX + claimX;
          const cellY = windowY + claimY;
          if (inBitmap(cellX, cellY)) {
            claim(cellY * width + cellX, "cell");
          }
        }
        matches.push({
          rule,
          x,
          y,
          choices: {
            ...defaultChoices(rule),
            ...choicesAt(rule.name, activeCells),
          },
        });
      }
    }
  }

  return matches;
};
