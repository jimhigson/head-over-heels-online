import { expect, test } from "vitest";

import { quarterCameraAngles } from "../../../utils/vectors/cameraAngleVectors";
import { type Xy, type Xyz } from "../../../utils/vectors/vectors";
import { makeLcg } from "./__test__/makeLcg";
import { shapes } from "./__test__/shapes";
import {
  projectAabbAxes,
  projectCorner,
  type ProjectionOnAxes,
} from "./projectAabbCorners";
import {
  visuallyOverlaps,
  type VisuallyOverlapsReturn,
} from "./visuallyOverlaps";

/**
 * property tests for the continuous-angle geometry kernel: an exact,
 * independent oracle for the visuallyOverlaps classification, checked over
 * randomised box pairs at randomised continuous camera angles (and at the
 * four quarter angles).
 *
 * the oracle projects all 8 corners of each box to the screen (via
 * projectCorner) and measures each box's interval on the three edge-direction
 * family normals. Every edge of a projected-box hexagon runs in one of three
 * screen directions (the projections of world-x, world-y and world-z), so a
 * full SAT over both convex polygons' edge normals reduces exactly to
 * interval overlap on those three family axes - and taking min/max over all
 * 8 projected corners gives the exact polygon extent on each axis without
 * needing hull construction (interior points never set a min/max).
 *
 * the screen normals are scaled so that dotting a projected point recovers
 * exactly the family functionals the kernel computes, so the kernel's
 * tolerances apply unchanged:
 *   n_z = (1, 0)            -> f_z = (s-c)x + (c+s)y   (screen-x silhouette)
 *   n_x = (-(c+s)/2, c-s)   -> f_x = -y - (c-s)z
 *   n_y = ((c-s)/2, c+s)    -> f_y = -x - (c+s)z
 *
 * asserting full classification equality subsumes the two required
 * implications: OVERLAP <=> exact polygons overlap (within the overlap
 * tolerance), and NO_OVERLAP => not within the adjacency envelope on the
 * family axes.
 */

const cornerVectors: Xyz[] = [
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 1, y: 1, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 1, y: 0, z: 1 },
  { x: 0, y: 1, z: 1 },
  { x: 1, y: 1, z: 1 },
];

/** exact family-axis intervals of the projected silhouette, from all 8 corners */
const oracleFamilyIntervals = (
  position: Xyz,
  aabb: Xyz,
  cameraAngle: Xy,
): ProjectionOnAxes => {
  const { x: c, y: s } = cameraAngle;
  const nxX = -(c + s) / 2;
  const nxY = c - s;
  const nyX = (c - s) / 2;
  const nyY = c + s;

  let xAxisProjectionMin = Infinity;
  let xAxisProjectionMax = -Infinity;
  let yAxisProjectionMin = Infinity;
  let yAxisProjectionMax = -Infinity;
  let zAxisProjectionMin = Infinity;
  let zAxisProjectionMax = -Infinity;

  for (const cornerVector of cornerVectors) {
    const screen = projectCorner(position, aabb, cornerVector, cameraAngle);
    const fZ = screen.x;
    const fX = nxX * screen.x + nxY * screen.y;
    const fY = nyX * screen.x + nyY * screen.y;
    xAxisProjectionMin = Math.min(xAxisProjectionMin, fX);
    xAxisProjectionMax = Math.max(xAxisProjectionMax, fX);
    yAxisProjectionMin = Math.min(yAxisProjectionMin, fY);
    yAxisProjectionMax = Math.max(yAxisProjectionMax, fY);
    zAxisProjectionMin = Math.min(zAxisProjectionMin, fZ);
    zAxisProjectionMax = Math.max(zAxisProjectionMax, fZ);
  }
  return {
    xAxisProjectionMin,
    xAxisProjectionMax,
    yAxisProjectionMin,
    yAxisProjectionMax,
    zAxisProjectionMin,
    zAxisProjectionMax,
  };
};

// ---- randomised case generation ----

type OverlapCase = {
  a: { position: Xyz; aabb: Xyz };
  b: { position: Xyz; aabb: Xyz };
};

const makeCase = (i: number, random: () => number): OverlapCase => {
  const aShape = shapes[i % shapes.length];
  const bShape = shapes[Math.floor(random() * shapes.length)];
  const aPos: Xyz = {
    x: 1 + random() * 128,
    y: 1 + random() * 128,
    z: 1 + random() * 48,
  };

  let bPos: Xyz;
  if (i % 3 === 0) {
    // diagonal seam with a gap spanning the adjacency envelope (slightly
    // interpenetrating through touching to just past the 0.1px tolerance),
    // exercising the ADJACENT boundary densely:
    const gapY = random() * 0.3 - 0.05;
    const gapZ = random() * 0.3 - 0.05;
    bPos = {
      x: aPos.x + random() * 0.5 * aShape.x,
      y: aPos.y + aShape.y + gapY,
      z: aPos.z + aShape.z + gapZ,
    };
  } else if (i % 3 === 1) {
    // abutting-ish on the +x face with a tight gap:
    bPos = {
      x: aPos.x + aShape.x + random() * 0.3 - 0.05,
      y: aPos.y + (random() - 0.5) * 8,
      z: aPos.z + (random() - 0.5) * 8,
    };
  } else {
    // spread of relationships from interpenetrating through touching to far apart:
    const spread = random() * 3;
    bPos = {
      x: aPos.x + (random() - 0.3) * aShape.x * spread,
      y: aPos.y + (random() - 0.3) * aShape.y * spread,
      z: aPos.z + (random() - 0.3) * aShape.z * spread,
    };
  }
  return {
    a: { position: aPos, aabb: aShape },
    b: { position: bPos, aabb: bShape },
  };
};

const mismatchDescription = (
  { a, b }: OverlapCase,
  cameraAngle: Xy,
  actual: VisuallyOverlapsReturn,
  expected: VisuallyOverlapsReturn,
): string =>
  `angle(${cameraAngle.x},${cameraAngle.y}) a@(${a.position.x},${a.position.y},${a.position.z})+(${a.aabb.x},${a.aabb.y},${a.aabb.z}) ` +
  `b@(${b.position.x},${b.position.y},${b.position.z})+(${b.aabb.x},${b.aabb.y},${b.aabb.z}) ` +
  `visuallyOverlaps=${actual} oracle=${expected}`;

const classifyViaKernel = (
  { a, b }: OverlapCase,
  cameraAngle: Xy,
): VisuallyOverlapsReturn =>
  visuallyOverlaps(
    projectAabbAxes({}, a.position, a.aabb, cameraAngle),
    projectAabbAxes({}, b.position, b.aabb, cameraAngle),
  );

const classifyViaOracle = (
  { a, b }: OverlapCase,
  cameraAngle: Xy,
): VisuallyOverlapsReturn =>
  visuallyOverlaps(
    oracleFamilyIntervals(a.position, a.aabb, cameraAngle),
    oracleFamilyIntervals(b.position, b.aabb, cameraAngle),
  );

test("visuallyOverlaps matches the exact polygon-overlap oracle at randomised continuous angles", () => {
  const random = makeLcg(7);
  const mismatches: string[] = [];
  for (let i = 0; i < 4_000; i++) {
    const overlapCase = makeCase(i, random);
    const theta = random() * Math.PI * 2;
    const cameraAngle: Xy = { x: Math.cos(theta), y: Math.sin(theta) };
    const actual = classifyViaKernel(overlapCase, cameraAngle);
    const expected = classifyViaOracle(overlapCase, cameraAngle);
    if (actual !== expected && mismatches.length < 20) {
      mismatches.push(
        mismatchDescription(overlapCase, cameraAngle, actual, expected),
      );
    }
  }
  expect(mismatches).toEqual([]);
});

test("visuallyOverlaps matches the exact polygon-overlap oracle at the quarter angles", () => {
  const random = makeLcg(11);
  const mismatches: string[] = [];
  for (let i = 0; i < 1_000; i++) {
    const overlapCase = makeCase(i, random);
    for (const cameraAngle of quarterCameraAngles) {
      const actual = classifyViaKernel(overlapCase, cameraAngle);
      const expected = classifyViaOracle(overlapCase, cameraAngle);
      if (actual !== expected && mismatches.length < 20) {
        mismatches.push(
          mismatchDescription(overlapCase, cameraAngle, actual, expected),
        );
      }
    }
  }
  expect(mismatches).toEqual([]);
});
