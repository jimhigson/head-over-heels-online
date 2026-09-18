import { baselineFromTop, type Contour, px } from "./fontUnits";

/** the box a rule's drawing is held within, in font units */
export type InkBounds = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

/**
 * The box, which is the character's own ink across but its whole cell down.
 *
 * The two axes are not the same problem. Across, a glyph is measured against
 * its neighbours - its advance width comes from where its ink ends - so
 * anything drawn past that reaches into the character alongside. Down, a
 * glyph shares its space with nobody, and overshooting is what round and
 * pointed shapes are supposed to do: a caret's apex is where its two 45
 * degree sides cross, which is above the topmost row its art inks, and a
 * taper's point falls below the last row of its stroke
 */
export const inkBounds = (bitmap: boolean[][]): InkBounds | undefined => {
  const inkCells = bitmap.flatMap((cells, row) =>
    cells.flatMap((isInked, col) => (isInked ? [{ col, row }] : [])),
  );
  if (inkCells.length === 0) {
    return undefined;
  }
  return {
    left: Math.min(...inkCells.map(({ col }) => col)) * px,
    right: (Math.max(...inkCells.map(({ col }) => col)) + 1) * px,
    top: baselineFromTop * px,
    bottom: (baselineFromTop - bitmap.length) * px,
  };
};

/**
 * No rule may make a glyph wider than its own art. Several draw past the cell
 * they claim on purpose - a round hole is wider than the square it replaces,
 * a slope runs on to meet its neighbour - and at the side of a glyph that
 * would reach into the character alongside. Clipping every contour to the box
 * above, once all the rules have had their say, holds each glyph to the width
 * the spritesheet drew it at while leaving it free to overshoot vertically.
 */
export const clipToInk = (
  contour: Contour,
  bounds: InkBounds | undefined,
): Contour => {
  if (bounds === undefined) {
    return contour;
  }
  // A contour holding curve controls is held inside the box by moving the
  // points that stray, which keeps the curve a curve. A straight-sided one
  // is cut against each side properly instead: moving a corner would shear
  // the whole shape - it is what made a '/' thinner than the stroke the art
  // draws - whereas cutting it leaves the sides where they are and puts a
  // short edge along the bound, which is what the box is for
  if (contour.some((point) => point.length === 3)) {
    return contour.map((point) => {
      const [pointX, pointY] = point;
      const held: [number, number] = [
        Math.min(Math.max(pointX, bounds.left), bounds.right),
        Math.min(Math.max(pointY, bounds.bottom), bounds.top),
      ];
      return point.length === 3 ? [...held, 0] : held;
    });
  }
  const sides = [
    { axis: 0, limit: bounds.left, keepAbove: true },
    { axis: 0, limit: bounds.right, keepAbove: false },
    { axis: 1, limit: bounds.bottom, keepAbove: true },
    { axis: 1, limit: bounds.top, keepAbove: false },
  ] as const;
  let clipped: Array<[number, number]> = contour.map(([x, y]) => [x, y]);
  for (const { axis, limit, keepAbove } of sides) {
    const inside = (point: [number, number]) =>
      keepAbove ? point[axis] >= limit : point[axis] <= limit;
    const source = clipped;
    clipped = [];
    for (const [index, here] of source.entries()) {
      const previous = source[(index - 1 + source.length) % source.length];
      const hereIn = inside(here);
      if (inside(previous) !== hereIn) {
        const t = (limit - previous[axis]) / (here[axis] - previous[axis]);
        clipped.push([
          previous[0] + (here[0] - previous[0]) * t,
          previous[1] + (here[1] - previous[1]) * t,
        ]);
      }
      if (hereIn) {
        clipped.push(here);
      }
    }
    if (clipped.length === 0) {
      return [];
    }
  }
  // a corner cut exactly where the outline already turns lands the crossing
  // on top of the point that follows it, and a segment of no length is not
  // something to hand a rasteriser
  return clipped.filter((here, index) => {
    const previous = clipped[(index - 1 + clipped.length) % clipped.length];
    return here[0] !== previous[0] || here[1] !== previous[1];
  });
};
