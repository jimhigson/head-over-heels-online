/**
 * a point of a hand-authored outline, in glyph pixels with y measured down
 * from the top of the cell - the same space the pixel art is indexed in, so a
 * point at [3, 5] sits on the top-left corner of the cell at column 3, row 5
 */
export type VectorPoint = readonly [number, number];

export type CornerTreatment = "chamfer" | "round";

/**
 * how a corner is cut, and for a round one how big an arc where the kernel
 * rules' own is the wrong size.
 *
 * That arc is sized to hold a cut cell's area, which is most of a pixel, and
 * a corner sharper than a right angle reaches further along its edges the
 * sharper it gets - so on the points of a star it would reach past the arms
 * themselves. Naming a radius is how a shape too small or too sharp for the
 * usual arc still gets one
 */
export type CornerCut = { type: "round"; radiusPx: number } | CornerTreatment;

export const cornerCutKind = (cut: CornerCut): CornerTreatment =>
  typeof cut === "string" ? cut : cut.type;

export type VectorContour = {
  type: "contour";
  points: VectorPoint[];
  /**
   * indices of the segments drawn as a quadratic rather than a straight line.
   * Segment i runs from point i to point i+1; unless {@link controls} says
   * otherwise its control point is where the two neighbouring segments' lines
   * cross, so the curve leaves and arrives tangentially and no angle enters
   * the outline that the sides either side of it did not already imply
   */
  curves?: number[];
  /**
   * segment index → that curve's control point, for the curves whose tangents
   * are not both sides of this contour.
   *
   * A kernel-drawn curve is cut between the tangents of the two runs meeting
   * at it, and a run swallowed by the curve leaves no side behind to read a
   * tangent from - two parallel sides, or the wrong ones, and the crossing
   * either does not exist or is somewhere else. Naming the point is what lets
   * such a curve be held here at all, and so what lets a generated outline be
   * taken into vector mode without losing its shape
   */
  controls?: { [segmentIndex: string]: VectorPoint };
  /**
   * point index → how that corner is cut. A round takes the same arc the
   * kernel rules draw, a chamfer the same 45 degree cut, so a hand-authored
   * corner is indistinguishable from a generated one
   */
  corners?: { [pointIndex: string]: CornerCut };
};

/** a fixed-radius round hole, centred on one cell of the pixel grid */
export type VectorCircle = {
  type: "circle";
  cell: VectorPoint;
};

export type VectorShape = VectorCircle | VectorContour;

/** a cell of a glyph, as `"<x>,<y>"` - json objects can only be keyed by string */
export type PixelKey = `${number},${number}`;

export const pixelKey = (x: number, y: number): PixelKey => `${x},${y}`;

export const pixelAt = (key: PixelKey): [number, number] => {
  const [x, y] = key.split(",");
  return [Number(x), Number(y)];
};

/**
 * what one cell says about one rule. The two halves are independent: a cell
 * may pick a mode for a rule that already applies there without saying
 * anything about whether it should, and may block a rule without having an
 * opinion on how it would have drawn
 */
export type PixelRuleSetting = {
  /**
   * false blocks every match whose active site reaches this cell; true lets
   * the rule take this place even where it is otherwise off. Absent to
   * inherit whatever the character says
   */
  on?: boolean;
  /**
   * what this cell answers to the rule's options, keyed by option name. An
   * option not named here takes the rule's own first choice
   */
  options?: { [optionName: string]: string };
};

export type GlyphOverride = {
  /**
   * true to draw `shapes` instead of running the kernel rules. Turning it off
   * keeps the shapes, so a character can be switched back to its hand-drawn
   * outline without redrawing it
   */
  vectorMode?: boolean;
  /** kernel rules this character sits out, on top of its built-in opt-outs */
  disabledRules?: string[];
  /**
   * what individual cells say about individual rules, keyed by cell then by
   * rule name. A rule not named here inherits whatever the character says
   */
  pixelRules?: { [cell: PixelKey]: { [ruleName: string]: PixelRuleSetting } };
  /**
   * a hash of the pixel art the shapes were drawn over, so a change to the
   * spritesheet is reported rather than silently leaving a stale outline
   */
  artHash?: string;
  shapes?: VectorShape[];
};

/** keyed by the character itself, or by its spritesheet name for the multi-codepoint entries */
export type GlyphOverrides = { [char: string]: GlyphOverride };

/** a hash of a glyph's ink, stable across runs and machines */
export const artHashOf = (bitmap: boolean[][]): string => {
  let hash = 0x81_1c_9d_c5;
  for (const row of bitmap) {
    for (const cell of row) {
      hash ^= cell ? 1 : 0;
      hash = Math.imul(hash, 0x01_00_01_93);
    }
    hash ^= 0xff;
    hash = Math.imul(hash, 0x01_00_01_93);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
};

export const overrideForChar = (
  overrides: GlyphOverrides,
  char: string,
): GlyphOverride | undefined => overrides[char];
