import {
  type CornerTreatment,
  type VectorContour,
  type VectorPoint,
} from "./glyphOverrides";
import { directionOf, legalSlopes, type Slope, slopeOf } from "./slopes";

/** authored points sit on this grid, in glyph pixels */
export const snapGrid = 0.5;

export const snapped = (value: number): number =>
  Math.round(value / snapGrid) * snapGrid;

/**
 * a side of a contour as the whole straight line it lies on, written
 * `a·x + b·y = c` with `a, b` taken from its slope. Editing a contour means
 * moving and re-aiming these lines; the corners are wherever consecutive ones
 * cross, which is what lets a side be moved without disturbing the angle of
 * either side beside it
 */
export type SideLine = { a: number; b: number; c: number };

export const lineThrough = (
  [throughX, throughY]: VectorPoint,
  [slopeX, slopeY]: VectorPoint,
): SideLine => ({
  a: slopeY,
  b: -slopeX,
  c: slopeY * throughX - slopeX * throughY,
});

export const linesCross = (
  line: SideLine,
  other: SideLine,
): undefined | VectorPoint => {
  const determinant = line.a * other.b - other.a * line.b;
  if (determinant === 0) {
    return undefined;
  }
  return [
    (line.c * other.b - other.c * line.b) / determinant,
    (line.a * other.c - other.a * line.c) / determinant,
  ];
};

const projectedOnto = (line: SideLine, [x, y]: VectorPoint): VectorPoint => {
  const overshoot =
    (line.a * x + line.b * y - line.c) / (line.a ** 2 + line.b ** 2);
  return [x - line.a * overshoot, y - line.b * overshoot];
};

const at = (index: number, length: number): number =>
  ((index % length) + length) % length;

/** the side running from point `index` to the next one */
export const sideAt = (
  contour: VectorContour,
  index: number,
): SideLine | undefined => {
  const { points } = contour;
  const from = points[at(index, points.length)];
  const to = points[at(index + 1, points.length)];
  // the line a side lies on, whatever angle it was aimed at - a corner is
  // where two of these cross, and a side off the preferred slopes is still a
  // side, so reading only the preferred ones here would leave its corners
  // with nothing to be the crossing of.
  //
  // A preferred slope is taken in its smallest whole-number form, because
  // that is what makes the line's offset read in grid steps; a free angle has
  // no such form, and its offset is simply a distance
  const direction = slopeOf(from, to) ?? directionOf(from, to);
  return direction === undefined ? undefined : lineThrough(from, direction);
};

const isCurve = (contour: VectorContour, index: number): boolean =>
  (contour.curves ?? []).includes(at(index, contour.points.length));

/**
 * Put a side on a new line and let its two corners follow.
 *
 * A corner between two straight sides is where their lines cross, so it moves
 * on its own and both sides keep the angle they were drawn at. A corner where
 * a curve joins is not a crossing - the curve simply starts somewhere along
 * the side - so that end slides to the nearest point of the new line instead,
 * and the curve follows it.
 */
const withSideOn = (
  contour: VectorContour,
  index: number,
  line: SideLine,
): VectorContour => {
  const { points } = contour;
  const count = points.length;
  const startIndex = at(index, count);
  const endIndex = at(index + 1, count);
  const before = sideAt(contour, index - 1);
  const after = sideAt(contour, index + 1);

  const start =
    isCurve(contour, index - 1) || before === undefined ?
      projectedOnto(line, points[startIndex])
    : linesCross(before, line);
  const end =
    isCurve(contour, index + 1) || after === undefined ?
      projectedOnto(line, points[endIndex])
    : linesCross(line, after);
  if (start === undefined || end === undefined) {
    return contour;
  }
  return {
    ...contour,
    points: points.map((point, pointIndex) =>
      pointIndex === startIndex ? start
      : pointIndex === endIndex ? end
      : point,
    ),
  };
};

/**
 * Slide a side sideways by a drag, keeping its direction.
 *
 * Along a preferred slope the offsets whose line passes through grid points
 * are exactly the multiples of the grid step, so snapping the offset holds
 * every corner on the grid wherever two sides cross on it. At any other angle
 * that is not true of any offset, and the side simply goes where it is put.
 */
export const translateSide = (
  contour: VectorContour,
  index: number,
  [byX, byY]: VectorPoint,
): VectorContour => {
  const line = sideAt(contour, index);
  if (line === undefined) {
    return contour;
  }
  const { points } = contour;
  const onPreferredSlope =
    slopeOf(
      points[at(index, points.length)],
      points[at(index + 1, points.length)],
    ) !== undefined;
  const moved = line.c + line.a * byX + line.b * byY;
  return withSideOn(contour, index, {
    ...line,
    c: onPreferredSlope ? snapped(moved) : moved,
  });
};

/**
 * turn a side to the next preferred slope round, pivoting about its midpoint.
 * A side aimed off them turns from the one it is nearest, so the button walks
 * the list from wherever the side happens to point
 */
export const turnSide = (
  contour: VectorContour,
  index: number,
  by: -1 | 1,
): VectorContour => {
  const { points } = contour;
  const count = points.length;
  const from = points[at(index, count)];
  const to = points[at(index + 1, count)];
  const direction = directionOf(from, to);
  if (direction === undefined) {
    return contour;
  }
  const wasAt = legalSlopes.indexOf(
    slopeOf(from, to) ?? nearestLegalSlope(direction),
  );
  const turned = legalSlopes[at(wasAt + by, legalSlopes.length)];
  const midpoint: VectorPoint = [
    snapped((from[0] + to[0]) / 2),
    snapped((from[1] + to[1]) / 2),
  ];
  return withSideOn(contour, index, lineThrough(midpoint, turned));
};

/**
 * Move one corner by a drag, leaving every other corner where it is.
 *
 * The corner lands on the grid the art is drawn on, so a corner dropped
 * anywhere still meets its neighbours somewhere exact. Its two sides take
 * whatever angles that leaves them at - which the editor names where they
 * come out on a preferred slope and leaves alone where they do not.
 */
export const movePoint = (
  contour: VectorContour,
  index: number,
  [byX, byY]: VectorPoint,
): VectorContour => {
  const { points } = contour;
  const moved = at(index, points.length);
  const [wasX, wasY] = points[moved];
  return {
    ...contour,
    points: points.map((point, pointIndex) =>
      pointIndex === moved ? [snapped(wasX + byX), snapped(wasY + byY)] : point,
    ),
  };
};

/** put a corner in the middle of a side, so it can be aimed separately */
export const splitSide = (
  contour: VectorContour,
  index: number,
): VectorContour => {
  const { points, curves = [], corners = {} } = contour;
  const count = points.length;
  const startIndex = at(index, count);
  const from = points[startIndex];
  const to = points[at(index + 1, count)];
  const midpoint: VectorPoint = [
    snapped((from[0] + to[0]) / 2),
    snapped((from[1] + to[1]) / 2),
  ];
  const inserted = startIndex + 1;
  return {
    ...contour,
    points: points.toSpliced(inserted, 0, midpoint),
    curves: curves.map((curve) => (curve >= inserted ? curve + 1 : curve)),
    corners: Object.fromEntries(
      Object.entries(corners).map(([pointIndex, treatment]) => [
        Number(pointIndex) >= inserted ?
          String(Number(pointIndex) + 1)
        : pointIndex,
        treatment,
      ]),
    ),
  };
};

/** take a corner out, leaving its two sides to meet each other */
export const removeCorner = (
  contour: VectorContour,
  index: number,
): VectorContour => {
  const { points, curves = [], corners = {} } = contour;
  if (points.length <= 3) {
    return contour;
  }
  const removed = at(index, points.length);
  // both sides that met at the corner are gone, replaced by the one joining
  // what is left either side of it - and that join is a straight line, so a
  // curve on either of them has nothing left to curve between
  const beforeRemoved = at(removed - 1, points.length);
  return {
    ...contour,
    points: points.toSpliced(removed, 1),
    curves: curves
      .filter((curve) => curve !== removed && curve !== beforeRemoved)
      .map((curve) => (curve > removed ? curve - 1 : curve)),
    corners: Object.fromEntries(
      Object.entries(corners)
        .filter(([pointIndex]) => Number(pointIndex) !== removed)
        .map(([pointIndex, treatment]) => [
          Number(pointIndex) > removed ?
            String(Number(pointIndex) - 1)
          : pointIndex,
          treatment,
        ]),
    ),
  };
};

export const toggleCurve = (
  contour: VectorContour,
  index: number,
): VectorContour => {
  const curves = contour.curves ?? [];
  const side = at(index, contour.points.length);
  return {
    ...contour,
    curves:
      curves.includes(side) ?
        curves.filter((curve) => curve !== side)
      : [...curves, side].sort((a, b) => a - b),
  };
};

export const setCorner = (
  contour: VectorContour,
  index: number,
  treatment: CornerTreatment | undefined,
): VectorContour => {
  const corners = { ...(contour.corners ?? {}) };
  const key = String(at(index, contour.points.length));
  if (treatment === undefined) {
    delete corners[key];
  } else {
    corners[key] = treatment;
  }
  return { ...contour, corners };
};

/** the legal slope nearest a direction, for aiming a side by dragging */
export const nearestLegalSlope = ([x, y]: VectorPoint): Slope => {
  const angle = Math.atan2(y, x);
  const distance = (slope: Slope) => {
    const difference = Math.abs(
      ((Math.atan2(slope[1], slope[0]) - angle + Math.PI * 3) % (Math.PI * 2)) -
        Math.PI,
    );
    return difference;
  };
  return legalSlopes.reduce((best, slope) =>
    distance(slope) < distance(best) ? slope : best,
  );
};
