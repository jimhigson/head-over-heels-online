import { type VectorPoint } from "./glyphOverrides";

/**
 * The directions a straight side of a hand-authored glyph is meant to run in:
 * flat, upright, 45 degrees, and the two isometric slopes. These are what the
 * art is drawn on, so the editor names a side that runs along one of them and
 * snaps towards them - but a side may be aimed anywhere, because a shape has
 * to be able to pass through angles it does not settle on
 */
export const legalSlopes = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1],
] as const satisfies readonly VectorPoint[];

export type Slope = (typeof legalSlopes)[number];

const gcd = (a: number, b: number): number =>
  b === 0 ? Math.abs(a) : gcd(b, a % b);

/**
 * the direction a segment runs in, reduced to its smallest whole-number form
 * so it can be compared against {@link legalSlopes} - undefined for a segment
 * of no length, or one whose direction is not a whole-number ratio
 */
export const slopeOf = (
  [fromX, fromY]: VectorPoint,
  [toX, toY]: VectorPoint,
): Slope | undefined => {
  const dx = toX - fromX;
  const dy = toY - fromY;
  // authored points sit on half-pixel steps, so double before reducing
  const wholeX = dx * 2;
  const wholeY = dy * 2;
  if (!Number.isInteger(wholeX) || !Number.isInteger(wholeY)) {
    return undefined;
  }
  const divisor = gcd(wholeX, wholeY);
  if (divisor === 0) {
    return undefined;
  }
  const unitX = wholeX / divisor;
  const unitY = wholeY / divisor;
  return legalSlopes.find(([x, y]) => x === unitX && y === unitY);
};

/** the direction a segment runs in, at whatever angle it was drawn */
export const directionOf = (
  [fromX, fromY]: VectorPoint,
  [toX, toY]: VectorPoint,
): undefined | VectorPoint =>
  toX === fromX && toY === fromY ? undefined : [toX - fromX, toY - fromY];

/** what a side running along a preferred slope is called where it is drawn */
export const slopeLabel = ([x, y]: Slope): string =>
  y === 0 ? "H"
  : x === 0 ? "V"
  : Math.abs(x) === Math.abs(y) ? "45"
  : Math.abs(x) > Math.abs(y) ? "2:1"
  : "1:2";

/** where two lines cross, each given as a point on it and a direction */
export const linesIntersection = (
  [throughX, throughY]: VectorPoint,
  [dirX, dirY]: VectorPoint,
  [otherThroughX, otherThroughY]: VectorPoint,
  [otherDirX, otherDirY]: VectorPoint,
): undefined | VectorPoint => {
  const determinant = dirX * otherDirY - dirY * otherDirX;
  if (determinant === 0) {
    return undefined;
  }
  const alongOther =
    ((otherThroughX - throughX) * dirY - (otherThroughY - throughY) * dirX) /
    determinant;
  return [
    otherThroughX + otherDirX * alongOther,
    otherThroughY + otherDirY * alongOther,
  ];
};
