import type { Xyz } from "@/utils/vectors/vectors";
import { addXyz, axesXyz } from "@/utils/vectors/vectors";
import { projectWorldXyzToScreenXyFloat } from "../projectToScreen";
import type { AnyItemInPlay } from "@/model/ItemInPlay";

export type DrawOrderComparable = Pick<
  AnyItemInPlay,
  "id" | "aabb" | "renders" | "renderAabb" | "fixedZIndex"
> & {
  state: { position: { x: number; y: number; z: number } };
};

/**
 * of the six visible corners of the projected cuboid, we need to find three to be able to compare
 * two projection-hexagons
 */
const projectionCorners = (position: Xyz, aabb: Xyz) => {
  const bottomCentre = projectWorldXyzToScreenXyFloat(position);
  const topLeft = projectWorldXyzToScreenXyFloat(
    addXyz(position, { x: aabb.x, z: aabb.z }),
  );
  const topRight = projectWorldXyzToScreenXyFloat(
    addXyz(position, { y: aabb.y, z: aabb.z }),
  );
  return { bottomCentre, topLeft, topRight };
};

const rangeOverlap = (
  aMin: number,
  aMax: number,
  bMin: number,
  bMax: number,
  /** to compensate for floating point error, ranges have to be overlapping by this much to consider them to be overlapping */
  tolerance: number = 0.000_01,
) => {
  return bMax - tolerance > aMin && bMin < aMax - tolerance;
};

const visuallyOverlaps = (
  aPos: Xyz,
  aBb: Xyz,
  bPos: Xyz,
  bBb: Xyz,
): boolean => {
  const cornersA = projectionCorners(aPos, aBb);
  const cornersB = projectionCorners(bPos, bBb);

  //console.log("corners:", { cornersA, cornersB });

  const aXMin = cornersA.topLeft.x;
  const aXMax = cornersA.topRight.x;

  const bXMin = cornersB.topLeft.x;
  const bXMax = cornersB.topRight.x;

  const horizontalOverlap = rangeOverlap(aXMin, aXMax, bXMin, bXMax);

  // a (projected) line along the (world) x axis of the projected is described by:
  //  [y = x/2 - c]
  //  = [c = y + x/2]
  // a greater c means projected higher on the screen -ie, a higher value in y and/or z (world-x is orthogonal)
  const aXAxisSlopeMinC = cornersA.topRight.y - cornersA.topRight.x / 2;
  const aXAxisSlopeMaxC = cornersA.bottomCentre.y - cornersA.bottomCentre.x / 2;

  if (aXAxisSlopeMinC > aXAxisSlopeMaxC) {
    throw new Error(
      `aXAxisSlopeMinC ${aXAxisSlopeMinC} > aXAxisSlopeMaxC ${aXAxisSlopeMaxC}`,
    );
  }

  const bXAxisSlopeMinC = cornersB.topRight.y - cornersB.topRight.x / 2;
  const bXAxisSlopeMaxC = cornersB.bottomCentre.y - cornersB.bottomCentre.x / 2;

  if (bXAxisSlopeMinC > bXAxisSlopeMaxC) {
    throw new Error("bXAxisSlopeMinC > bXAxisSlopeMaxC");
  }

  const xAxisSlopeOverlap = rangeOverlap(
    aXAxisSlopeMinC,
    aXAxisSlopeMaxC,
    bXAxisSlopeMinC,
    bXAxisSlopeMaxC,
  );

  // now projected lines along the y axis: [y = x/2 - c] = [c = y-x/2]

  const aYAxisSlopeMinC = cornersA.topLeft.y + cornersA.topLeft.x / 2;
  const aYAxisSlopeMaxC = cornersA.bottomCentre.y + cornersA.bottomCentre.x / 2;

  if (aYAxisSlopeMinC > aYAxisSlopeMaxC) {
    throw new Error("aYAxisSlopeMinC > aYAxisSlopeMaxC");
  }

  const bYAxisSlopeMinC = cornersB.topLeft.y + cornersB.topLeft.x / 2;
  const bYAxisSlopeMaxC = cornersB.bottomCentre.y + cornersB.bottomCentre.x / 2;

  if (bYAxisSlopeMinC > bYAxisSlopeMaxC) {
    throw new Error("bYAxisSlopeMinC > bYAxisSlopeMaxC");
  }

  const yAxisSlopeOverlap = rangeOverlap(
    aYAxisSlopeMinC,
    aYAxisSlopeMaxC,
    bYAxisSlopeMinC,
    bYAxisSlopeMaxC,
  );

  /*
  console.log("min/max:", {
    a: {
      x: {
        min: aXMin,
        max: aXMax,
      },
      xS: {
        min: aXAxisSlopeMinC,
        max: aXAxisSlopeMaxC,
      },
      yS: {
        min: aYAxisSlopeMinC,
        max: aYAxisSlopeMaxC,
      },
    },
    b: {
      x: {
        min: bXMin,
        max: bXMax,
      },
      xS: {
        min: bXAxisSlopeMinC,
        max: bXAxisSlopeMaxC,
      },
      yS: {
        min: bYAxisSlopeMinC,
        max: bYAxisSlopeMaxC,
      },
    },
  });  
  console.log("overlap", {
    horizontalOverlap,
    xAxisSlopeOverlap,
    yAxisSlopeOverlap,
  });
  */

  return horizontalOverlap && xAxisSlopeOverlap && yAxisSlopeOverlap;
};

export const zComparator = (a: DrawOrderComparable, b: DrawOrderComparable) => {
  if (
    a.renders === false ||
    b.renders === false ||
    a.fixedZIndex !== undefined ||
    b.fixedZIndex !== undefined
  ) {
    return 0;
  }

  const aPos = a.state.position;
  const aBb = a.renderAabb || a.aabb;
  const bPos = b.state.position;
  const bBb = b.renderAabb || b.aabb;

  if (!visuallyOverlaps(aPos, aBb, bPos, bBb)) {
    return 0;
  }

  for (const axis of axesXyz) {
    const axisMinA = a.state.position[axis];
    const axisMaxA = axisMinA + aBb[axis];

    const axisMinB = b.state.position[axis];
    const axisMaxB = axisMinB + bBb[axis];

    // console.log(`check for <= in ${axis} :`, { axisMaxA, axisMinB });

    if (axisMaxA <= axisMinB) {
      // a is entirely less than b in this axis (no overlap)
      // flip for z axis, because higher z is in front, whereas for x and y, lower is in front
      return 1 * (axis === "z" ? -1 : 1);
    }

    // console.log(`check for >= in ${axis} :`, { axisMinA, axisMaxB });

    if (axisMinA >= axisMaxB) {
      // a is entirely less than b in this axis (no overlap)
      // flip for z axis, because higher z is in front, whereas for x and y, lower is in front
      return -1 * (axis === "z" ? -1 : 1);
    }

    // a and b overlap in this axis, so we need to check the next axis
  }

  // if we get here, two items are intersecting - this is very unusual, but can happen
  // for non-solid items - eg, the cloud left over after a pickup is collected can be
  // walked through. Return the difference of the isometric z-buffer depth for the two items.
  // since these intersecting items should be the same size, and this isn't critical, the bounding boxes
  // are not used to decide the order
  return zScore(b) - zScore(a);
};

const zScore = (item: DrawOrderComparable) =>
  item.state.position.x + item.state.position.y - item.state.position.z;
