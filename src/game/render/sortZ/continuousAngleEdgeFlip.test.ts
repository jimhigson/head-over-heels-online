import { expect, test } from "vitest";

import { Graph } from "../../../utils/graph/Graph";
import { type Xy } from "../../../utils/vectors/vectors";
import { type RenderBox } from "../renderBox/makeItemRenderBoxAtCameraAngle";
import { graphEdgeStrings } from "./__test__/graphEdgeStrings";
import { populatedBroadPhase } from "./__test__/populatedBroadPhase";
import { type DrawOrderComparable } from "./DrawOrderComparable";
import { bruteForceZEdges } from "./stochasticTests/bruteForceZEdges";
import { updateZEdges } from "./updateZEdges";

/**
 * {@link updateZEdges} over a continuously changing camera angle: a pair whose
 * draw order differs between two quarter angles must have its edge flip
 * direction exactly once, at the analytically correct angle - never twice, and
 * never at some angle the maths does not predict. Stepping finely through the
 * angle is only how the flip is located; the behaviour under test belongs to
 * the comparator the edge rebuild calls.
 *
 * the pair: unit cubes interpenetrating with world offset (0.6, 0.4). Their
 * order is decided by the MTV rung; the chosen axis is the camera component
 * of the offset with the larger magnitude, and the sign of that component
 * gives the order. A is in front at the 0° and 90° quarters, B at 180°. The
 * dominant component swaps where |0.6c − 0.4s| = |0.6s + 0.4c| with opposite
 * signs, ie tan 2θ = 5/12 in the second quadrant: θ = (atan(5/12) + 180°)/2
 * ≈ 101.31°, which is where the flip must land.
 */

type FlipItem = DrawOrderComparable & { id: string };

const unitCube = { x: 1, y: 1, z: 1 };
const a: FlipItem = {
  id: "a",
  state: { position: { x: 0, y: 0, z: 0 } },
  aabb: unitCube,
};
const b: FlipItem = {
  id: "b",
  state: { position: { x: 0.6, y: 0.4, z: 0 } },
  aabb: unitCube,
};

const expectedFlipDegrees = (Math.atan(5 / 12) * (180 / Math.PI) + 180) / 2;

const angleAtDegrees = (degrees: number): Xy => {
  const radians = (degrees * Math.PI) / 180;
  return { x: Math.cos(radians), y: Math.sin(radians) };
};

test("z-index graph edge flips direction exactly once, at the correct θ", () => {
  const items = new Set([a, b]);
  const renderBoxes = new Map<FlipItem, RenderBox | undefined>();
  const broadPhase = populatedBroadPhase(items, renderBoxes);
  const zEdges = new Graph<FlipItem>();

  const stepDegrees = 0.5;
  const flipsAtDegrees: number[] = [];
  let previousAInFront: boolean | undefined = undefined;

  for (let degrees = 0; degrees <= 180; degrees += stepDegrees) {
    const cameraAngle = angleAtDegrees(degrees);
    broadPhase.updateManyItems(items, renderBoxes, cameraAngle);
    updateZEdges(items, broadPhase, zEdges, renderBoxes);

    const [edge] = graphEdgeStrings(zEdges);
    const aInFront = edge === "b->a";
    if (previousAInFront !== undefined && aInFront !== previousAInFront) {
      flipsAtDegrees.push(degrees);
    }
    previousAInFront = aInFront;
  }

  expect(flipsAtDegrees).toHaveLength(1);
  const [flipDegrees] = flipsAtDegrees;
  // the flip lands on the first step past the analytic angle:
  expect(flipDegrees).toBeGreaterThan(expectedFlipDegrees);
  expect(flipDegrees).toBeLessThanOrEqual(expectedFlipDegrees + stepDegrees);
});

test("the pair's order differs between the 90° and 180° quarter angles", () => {
  const items = new Set([a, b]);
  const renderBoxes = new Map<FlipItem, RenderBox | undefined>();

  expect(
    graphEdgeStrings(bruteForceZEdges(items, { x: 0, y: 1 }, renderBoxes)),
  ).toEqual(["b->a"]);
  expect(
    graphEdgeStrings(bruteForceZEdges(items, { x: -1, y: 0 }, renderBoxes)),
  ).toEqual(["a->b"]);
});
