import {
  type CornerName,
  cornersClockwise,
  type RoundedCorners,
} from "./corners";
import { baselineFromTop, type Contour, contourArea, px } from "./fontUnits";

/** a quarter turn of a corner is drawn as this many quadratic segments */
const cornerArcSegments = 2;

/** the four corners of a rectangle, as which way each lies from its centre */
const cornerDirections = {
  topLeft: [-1, -1],
  topRight: [1, -1],
  bottomRight: [1, 1],
  bottomLeft: [-1, 1],
} as const satisfies { [K in CornerName]: readonly [number, number] };

/**
 * A rounded rectangle in glyph pixels, centred on `centre`, with only the
 * named corners rounded. The radius is half the shorter side, so a rounded
 * corner is as round as it can be - four of them on a square make a circle.
 *
 * Walked clockwise in the pixel grid's y-down space
 */
const roundedRectangle = (
  [centreX, centreY]: readonly [number, number],
  width: number,
  height: number,
  rounded: RoundedCorners,
): Array<[number, number, 0] | [number, number]> => {
  const radius = Math.min(width, height) / 2;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const points: Array<[number, number, 0] | [number, number]> = [];

  // walking clockwise in y-down, each corner's arc starts where it meets the
  // side the walk arrives along and ends on the side it leaves by, so every
  // one of them turns a quarter the same way round
  const quarterTurn = Math.PI / 2;
  const startAngles = {
    topLeft: Math.PI,
    topRight: 3 * quarterTurn,
    bottomRight: 0,
    bottomLeft: quarterTurn,
  } as const satisfies { [K in CornerName]: number };
  const step = quarterTurn / cornerArcSegments;
  const controlRadius = radius / Math.cos(step / 2);

  for (const corner of cornersClockwise) {
    const [towardsX, towardsY] = cornerDirections[corner];
    const cornerX = centreX + towardsX * halfWidth;
    const cornerY = centreY + towardsY * halfHeight;
    if (!rounded.has(corner)) {
      points.push([cornerX, cornerY]);
      continue;
    }
    // the arc's centre sits a radius in from both of the corner's sides
    const arcCentreX = cornerX - towardsX * radius;
    const arcCentreY = cornerY - towardsY * radius;
    const startAngle = startAngles[corner];
    const on = (angle: number, atRadius: number): [number, number] => [
      arcCentreX + atRadius * Math.cos(angle),
      arcCentreY + atRadius * Math.sin(angle),
    ];
    points.push(on(startAngle, radius));
    for (let segment = 0; segment < cornerArcSegments; segment++) {
      const [controlX, controlY] = on(
        startAngle + step * (segment + 0.5),
        controlRadius,
      );
      points.push([controlX, controlY, 0]);
      points.push(on(startAngle + step * (segment + 1), radius));
    }
  }
  // where the corners are rounded as far as they go, the sides between them
  // have no length at all and each arc starts where the last one ended - a
  // segment of nothing, which the outline is better off without. The two are
  // reached from different arc centres, so they agree to within rounding
  // rather than exactly
  const meetsAt = 1e-9;
  return points.filter((point, index) => {
    const previous = points[(index - 1 + points.length) % points.length];
    return (
      Math.abs(point[0] - previous[0]) > meetsAt ||
      Math.abs(point[1] - previous[1]) > meetsAt
    );
  });
};

/**
 * How much area one rounded corner takes off, per unit of radius squared.
 *
 * Measured from the drawn shape rather than taken as the true 1 − π/4, since
 * what is drawn is a pair of quadratics rather than a real quarter circle and
 * it is the drawn area that has to come out right. A unit square with every
 * corner rounded is a circle of radius ½, so what four corners removed is
 * whatever is missing from the square
 */
const cornerCut =
  (1 -
    contourArea(
      roundedRectangle([0, 0], 1, 1, new Set(cornersClockwise)).map(
        (point): Contour[number] =>
          point.length === 3 ? [point[0], point[1], 0] : [point[0], point[1]],
      ),
    )) /
  (4 * 0.25);

/**
 * How wide to draw a hole standing for a block of cells.
 *
 * A hole is a rounded rectangle whose extra length over its width is the
 * extra cells it spans, and whose radius is half its width. Rounding the
 * corners takes area away, so holding the area means solving for the width
 * that pays it back:
 *
 *     width × (width + extra) − rounded × cut × (width / 2)² = cells
 *
 * a quadratic in width, of which the positive root is the answer
 */
const areaPreservingWidth = (
  cellsWide: number,
  cellsTall: number,
  roundedCount: number,
): number => {
  const extra = Math.abs(cellsTall - cellsWide);
  const shrink = 1 - (roundedCount * cornerCut) / 4;
  const cells = cellsWide * cellsTall;
  return (
    (-extra + Math.sqrt(extra * extra + 4 * shrink * cells)) / (2 * shrink)
  );
};

export type HoleScale = "areaPreserving" | "fitInPixel";

/**
 * The hole standing for a block of cells, in font units, wound anticlockwise
 * in y-up space so non-zero fill subtracts it.
 *
 * Every corner is rounded or square as asked, and the whole is sized either
 * to enclose exactly the area of the cells it replaces - which means growing
 * past them, since rounding costs area - or to stay within them
 */
export const holeContour = (
  col: number,
  row: number,
  cellsWide: number,
  cellsTall: number,
  rounded: RoundedCorners,
  scale: HoleScale,
): Contour => {
  const width =
    scale === "fitInPixel" ?
      Math.min(cellsWide, cellsTall)
    : areaPreservingWidth(cellsWide, cellsTall, rounded.size);
  const height = width + Math.abs(cellsTall - cellsWide);
  const centre = [col + cellsWide / 2, row + cellsTall / 2] as const;

  // walked clockwise in y-down, so the flip into font units leaves it wound
  // the way fill adds; reversing turns it into the hole it is meant to be
  return roundedRectangle(centre, width, height, rounded)
    .map((point): Contour[number] => {
      const x = point[0] * px;
      const y = baselineFromTop * px - point[1] * px;
      return point.length === 3 ? [x, y, 0] : [x, y];
    })
    .reverse();
};
