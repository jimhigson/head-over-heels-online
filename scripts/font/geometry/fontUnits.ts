import {
  hudCharTextureSize,
  hudLowercaseCharTextureSize,
} from "../../../src/sprites/spritesheet/spritesheetData/textureSizes";

export const unitsPerEm = 512;

/** font units per design pixel - 512/8 gives clean integer pixel boundaries */
export const px = unitsPerEm / hudCharTextureSize.h;

/** the baseline sits this many design pixels below the top of each cell */
export const baselineFromTop = hudCharTextureSize.h;

export const descenderPixels = hudLowercaseCharTextureSize.h - baselineFromTop;

/**
 * a closed contour in font units with the baseline at y=0. A point is
 * `[x, y]` (on-curve) or `[x, y, 0]` (an off-curve quadratic control -
 * TrueType implies on-curve midpoints between consecutive off-curve points,
 * so runs of them render as a smooth B-spline)
 */
export type Contour = Array<[number, number, 0] | [number, number]>;

/**
 * a point in glyph pixels, y measured down from the top of the cell. A third
 * element of 0 marks an off-curve quadratic control, the same convention as
 * {@link Contour}
 */
export type PixelPoint = [number, number, 0] | [number, number];

/** a glyph-pixel point to font units, flipping y to put the baseline at 0 */
export const toFontUnits = (point: PixelPoint): Contour[number] => {
  const x = point[0] * px;
  const y = baselineFromTop * px - point[1] * px;
  return point.length === 3 ? [x, y, 0] : [x, y];
};

/** the centre of a cell, in font units */
export const cellCentre = (col: number, row: number): [number, number] => [
  (col + 0.5) * px,
  baselineFromTop * px - (row + 0.5) * px,
];

/** twice the signed area of a closed polygon - positive when anticlockwise */
export const twiceSignedArea = (
  points: ReadonlyArray<readonly [number, number]>,
): number => {
  let total = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    total += x1 * y2 - x2 * y1;
  }
  return total;
};

/**
 * The area a contour encloses, exactly, in whatever units it is written in.
 *
 * TrueType puts an implied on-curve point midway between consecutive
 * off-curve ones, so those are written out before walking. A straight side
 * from A to B contributes A×B to twice the area; a quadratic from A through
 * control B to C contributes ⅔(A×B) + ⅓(A×C) + ⅔(B×C), which is the integral
 * of ½∮(x dy − y dx) along it
 */
export const contourArea = (contour: Contour): number => {
  const cross = (a: Contour[number], b: Contour[number]) =>
    a[0] * b[1] - a[1] * b[0];
  const walk: Contour = [];
  for (const [index, here] of contour.entries()) {
    const next = contour[(index + 1) % contour.length];
    walk.push(here);
    if (here.length === 3 && next.length === 3) {
      walk.push([(here[0] + next[0]) / 2, (here[1] + next[1]) / 2]);
    }
  }
  const from = walk.findIndex((point) => point.length === 2);
  const at = (step: number) => walk[(from + step) % walk.length];

  let twiceArea = 0;
  let step = 0;
  while (step < walk.length) {
    const start = at(step);
    const second = at(step + 1);
    if (second.length === 2) {
      twiceArea += cross(start, second);
      step += 1;
      continue;
    }
    const end = at(step + 2);
    twiceArea +=
      (2 / 3) * cross(start, second) +
      (1 / 3) * cross(start, end) +
      (2 / 3) * cross(second, end);
    step += 2;
  }
  return Math.abs(twiceArea / 2);
};

/** a closed contour wound the way non-zero fill needs to add or subtract it */
export const wound = (
  points: Array<[number, number]>,
  /** true to wind clockwise in y-up space, which fill adds */
  clockwise: boolean,
): Contour => {
  const isAnticlockwise = twiceSignedArea(points) > 0;
  return isAnticlockwise === clockwise ? [...points].reverse() : points;
};
