import { type CornerName } from "./corners";
import { baselineFromTop, cellCentre, type Contour, px } from "./fontUnits";

/**
 * a cell claimed by a circle-drawing kernel rule renders as a ring of this
 * many off-curve controls - eg the single-pixel counter of the 'o' becomes a
 * round hole
 */
const circleSides = 16;

/** the radius of a true circle enclosing exactly one pixel's area */
const holeRadiusPx = Math.sqrt(1 / Math.PI);

/** the radius the slot's caps are drawn at, in font units */
export const holeRadius = holeRadiusPx * px;

const spanAngle = (2 * Math.PI) / circleSides;

/**
 * The area a ring of off-curve controls at unit radius actually encloses.
 *
 * TrueType puts an implied on-curve point midway between each pair of
 * consecutive controls, so the ring renders as `circleSides` quadratic
 * Béziers running from midpoint to midpoint - a closed curve strictly inside
 * the control ring. Integrating ½∮(x dy − y dx) over one such Bézier and
 * summing gives this exactly, which is what lets the drawn circle be sized to
 * one pixel of area rather than to an approximation of it.
 */
const splineAreaAtUnitRadius =
  (circleSides * Math.sin(spanAngle) * (2 + Math.cos(spanAngle / 2) ** 2)) / 6;

/** the control radius whose drawn circle encloses exactly one pixel of area */
const circleControlRadius = Math.sqrt(1 / splineAreaAtUnitRadius) * px;

/**
 * circle contour for an isolated pixel, in font units, enclosing exactly the
 * one pixel of area it replaces. Additive (ink dot) contours wind clockwise
 * in y-up space like the traced contours; `hole` reverses the winding so
 * non-zero fill subtracts it
 */
export const circleContour = (
  col: number,
  row: number,
  hole: boolean,
): Contour => {
  const [centreX, centreY] = cellCentre(col, row);
  const points: Contour = [];
  for (let i = 0; i < circleSides; i++) {
    const theta = ((i + 0.5) / circleSides) * 2 * Math.PI * (hole ? 1 : -1);
    points.push([
      centreX + circleControlRadius * Math.cos(theta),
      centreY + circleControlRadius * Math.sin(theta),
      0,
    ]);
  }
  return points;
};

/** each semicircular cap of a slot is drawn as this many quadratic segments */
const slotCapSegments = 4;

/**
 * slot contour for a two-cell-tall hole, in font units: a cap of the same
 * radius as {@link circleContour} centred on each of the two cells, joined by
 * straight sides. Wound anticlockwise in y-up space so non-zero fill
 * subtracts it from the ink around it.
 */
export const slotContour = (col: number, topRow: number): Contour => {
  const [centreX, topY] = cellCentre(col, topRow);
  const [, bottomY] = cellCentre(col, topRow + 1);
  const segmentAngle = Math.PI / slotCapSegments;
  // a quadratic spanning `segmentAngle` puts its off-curve control where the
  // two end tangents meet, further out than the arc itself:
  const controlRadius = holeRadius / Math.cos(segmentAngle / 2);
  const at = (
    capY: number,
    angle: number,
    radius: number,
  ): [number, number] => [
    centreX + radius * Math.cos(angle),
    capY + radius * Math.sin(angle),
  ];

  // up the right side, over the top cap, down the left side, under the
  // bottom cap - the closing point back to the start is implied
  const points: Contour = [at(bottomY, 0, holeRadius), at(topY, 0, holeRadius)];
  for (let i = 0; i < slotCapSegments; i++) {
    const [controlX, controlY] = at(
      topY,
      segmentAngle * (i + 0.5),
      controlRadius,
    );
    points.push([controlX, controlY, 0]);
    points.push(at(topY, segmentAngle * (i + 1), holeRadius));
  }
  points.push(at(bottomY, Math.PI, holeRadius));
  for (let i = 0; i < slotCapSegments; i++) {
    const [controlX, controlY] = at(
      bottomY,
      Math.PI + segmentAngle * (i + 0.5),
      controlRadius,
    );
    points.push([controlX, controlY, 0]);
    if (i < slotCapSegments - 1) {
      points.push(at(bottomY, Math.PI + segmentAngle * (i + 1), holeRadius));
    }
  }
  return points;
};

/** a half-circle valley is drawn as this many quadratic segments */
const valleyArcSegments = 4;

/**
 * A half circle scooped out of one cell, in font units: the diameter lies
 * along the cell edge facing `opens` and the arc bulges into the cell, so a
 * surface that stepped squarely in and out instead dips in one round scoop
 * the width of the pixel.
 *
 * Wound anticlockwise in y-up space, so non-zero fill takes it away from the
 * ink around it.
 */
export const halfDiscCut = (
  col: number,
  row: number,
  opens: "down" | "left" | "right" | "up",
): Contour => {
  const radius = px / 2;
  const [cellX, cellY] = cellCentre(col, row);
  const towards = {
    up: [0, radius],
    down: [0, -radius],
    left: [-radius, 0],
    right: [radius, 0],
  } as const satisfies { [K in typeof opens]: readonly [number, number] };
  const [centreX, centreY] = [
    cellX + towards[opens][0],
    cellY + towards[opens][1],
  ];
  // the arc always sweeps a half turn anticlockwise from here, which is the
  // direction that leaves the scoop subtracting
  const from = { up: Math.PI, down: 0, left: -Math.PI / 2, right: Math.PI / 2 }[
    opens
  ];
  const segmentAngle = Math.PI / valleyArcSegments;
  // a quadratic spanning `segmentAngle` puts its off-curve control where the
  // two end tangents meet, further out than the arc itself
  const controlRadius = radius / Math.cos(segmentAngle / 2);
  const at = (angle: number, atRadius: number): [number, number] => [
    centreX + atRadius * Math.cos(angle),
    centreY + atRadius * Math.sin(angle),
  ];

  const points: Contour = [at(from, radius)];
  for (let i = 0; i < valleyArcSegments; i++) {
    const [controlX, controlY] = at(
      from + segmentAngle * (i + 0.5),
      controlRadius,
    );
    points.push([controlX, controlY, 0]);
    if (i < valleyArcSegments - 1) {
      points.push(at(from + segmentAngle * (i + 1), radius));
    }
  }
  points.push(at(from + Math.PI, radius));
  return points;
};

/**
 * The least ink that turns a one-cell bite into a round-bottomed one, in font
 * units: the two corners behind a half circle centred on the cell, so the
 * bite keeps its full depth and its floor reads as a bowl the width of the
 * pixel. One contour per corner - the arc touches the far edge at a single
 * point, and two pieces meeting there is cleaner than one pinched shape.
 *
 * Wound clockwise in y-up space, so non-zero fill adds them.
 */
export const halfDiscFill = (
  col: number,
  row: number,
  opens: "down" | "left" | "right" | "up",
): Contour[] => {
  const radius = px / 2;
  const [centreX, centreY] = cellCentre(col, row);
  const from = { up: Math.PI, down: 0, left: -Math.PI / 2, right: Math.PI / 2 }[
    opens
  ];
  const quarter = Math.PI / 2;
  const segmentAngle = quarter / valleyArcSegments;
  const controlRadius = radius / Math.cos(segmentAngle / 2);
  const at = (angle: number, atRadius: number): [number, number] => [
    centreX + atRadius * Math.cos(angle),
    centreY + atRadius * Math.sin(angle),
  ];

  return [0, 1].map((half): Contour => {
    const start = from + quarter * half;
    const points: Contour = [at(start, radius)];
    for (let i = 0; i < valleyArcSegments; i++) {
      const [controlX, controlY] = at(
        start + segmentAngle * (i + 0.5),
        controlRadius,
      );
      points.push([controlX, controlY, 0]);
      if (i < valleyArcSegments - 1) {
        points.push(at(start + segmentAngle * (i + 1), radius));
      }
    }
    const end = start + quarter;
    points.push(at(end, radius));
    // the cell corner the quarter arc cuts across, where the two edges its
    // ends sit on meet
    points.push([
      centreX + radius * (Math.cos(start) + Math.cos(end)),
      centreY + radius * (Math.sin(start) + Math.sin(end)),
    ]);
    return points;
  });
};

/** a quarter-circle corner is drawn as this many quadratic segments */
const cornerArcSegments = 2;

/**
 * how far a rounded corner reaches along each of its two edges, in pixels.
 * The cut corner cell is filled in and a corner-square-minus-quarter-disc is
 * taken back out of it, an area of r²(1 - π/4); at this radius that is
 * exactly the one pixel the square cut removed, so rounding a corner leaves
 * the glyph's total ink unchanged
 */
export const cornerRadiusPx = 1 / Math.sqrt(1 - Math.PI / 4);

/**
 * per corner: which lattice point of the cell the shape's sharp corner would
 * be at (as an offset from the cell's top-left, in cells), the direction from
 * there towards the ink, and the angle the arc starts at
 */
const cornerArcs = {
  topLeft: { sharp: [0, 0], towardsInk: [1, 1], startAngle: Math.PI / 2 },
  topRight: { sharp: [1, 0], towardsInk: [-1, 1], startAngle: 0 },
  bottomLeft: { sharp: [0, 1], towardsInk: [1, -1], startAngle: Math.PI },
  bottomRight: {
    sharp: [1, 1],
    towardsInk: [-1, -1],
    startAngle: (3 * Math.PI) / 2,
  },
} as const satisfies Record<
  CornerName,
  {
    sharp: readonly [number, number];
    towardsInk: readonly [number, number];
    startAngle: number;
  }
>;

/**
 * the ink taken back out of a filled-in corner to round it, in font units:
 * the region between the shape's sharp corner and an arc of
 * {@link cornerRadiusPx}, which meets the two edges tangentially. Wound
 * anticlockwise in y-up space, so non-zero fill subtracts it
 */
export const roundedCornerContour = (
  col: number,
  row: number,
  corner: CornerName,
  /** in pixels, defaulting to the radius that makes rounding area-neutral */
  radiusPx: number = cornerRadiusPx,
): Contour => {
  const {
    sharp: [sharpCol, sharpRow],
    towardsInk: [inkCol, inkRow],
    startAngle,
  } = cornerArcs[corner];
  const apexX = (col + sharpCol) * px;
  const apexY = baselineFromTop * px - (row + sharpRow) * px;
  const radius = radiusPx * px;
  const centreX = (col + sharpCol + inkCol * radiusPx) * px;
  const centreY =
    baselineFromTop * px - (row + sharpRow + inkRow * radiusPx) * px;
  const quarterTurn = Math.PI / 2;
  const segmentAngle = quarterTurn / cornerArcSegments;
  const controlRadius = radius / Math.cos(segmentAngle / 2);
  const at = (angle: number, atRadius: number): [number, number] => [
    centreX + atRadius * Math.cos(angle),
    centreY + atRadius * Math.sin(angle),
  ];

  // the sharp corner, then the arc walked from its far end back to its near
  // end - the direction that winds this anticlockwise about the apex
  const points: Contour = [
    [apexX, apexY],
    at(startAngle + quarterTurn, radius),
  ];
  for (let i = cornerArcSegments; i > 0; i--) {
    const [controlX, controlY] = at(
      startAngle + segmentAngle * (i - 0.5),
      controlRadius,
    );
    points.push([controlX, controlY, 0]);
    points.push(at(startAngle + segmentAngle * (i - 1), radius));
  }
  return points;
};

/**
 * How far a step chamfer reaches along each of the two edges it joins, in
 * pixels.
 *
 * The cell is filled in and a right-angled triangle taken back off its outer
 * corner; at 45 degrees the two legs are equal, so a leg of √2 takes away an
 * area of exactly one pixel - the one the fill put back. The cut therefore
 * reaches past the cell into the ink either side of it, which is what turns a
 * single square step into one straight edge rather than just blunting it
 */
const chamferStepLegPx = Math.SQRT2;

/**
 * the ink taken back out of a filled-in corner cell to replace a single
 * square step with one 45 degree line, in font units. Wound anticlockwise in
 * y-up space, so non-zero fill subtracts it
 */
export const chamferStepCut = (
  col: number,
  row: number,
  corner: CornerName,
): Array<[number, number]> => {
  const {
    sharp: [sharpCol, sharpRow],
    towardsInk: [inkCol, inkRow],
  } = cornerArcs[corner];
  const at = (acrossLeg: number, downLeg: number): [number, number] => [
    (col + sharpCol + inkCol * acrossLeg) * px,
    baselineFromTop * px - (row + sharpRow + inkRow * downLeg) * px,
  ];
  return [at(0, 0), at(chamferStepLegPx, 0), at(0, chamferStepLegPx)];
};

/**
 * the half of a cell nearest a corner, in font units - taken back out of a
 * filled-in corner cell to cut it off at 45 degrees
 */
export const chamferCornerCut = (
  col: number,
  row: number,
  corner: CornerName,
): Array<[number, number]> => {
  const cutHalves = {
    topLeft: [
      [1, 0],
      [0, 0],
      [0, 1],
    ],
    topRight: [
      [0, 0],
      [1, 0],
      [1, 1],
    ],
    bottomRight: [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    bottomLeft: [
      [0, 0],
      [0, 1],
      [1, 1],
    ],
  } as const satisfies { [K in CornerName]: unknown };
  return cutHalves[corner].map(([dx, dy]): [number, number] => [
    (col + dx) * px,
    baselineFromTop * px - (row + dy) * px,
  ]);
};
