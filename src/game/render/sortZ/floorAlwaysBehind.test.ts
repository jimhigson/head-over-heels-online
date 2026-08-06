import { expect, test } from "vitest";

import { blockStackSpritesheetMeta } from "../../../../gfx/spritesheetMeta/blockStackSpritesheetMeta";
import { type Xy } from "../../../utils/vectors/vectors";
import {
  makeItemRenderBoxAtCameraAngle,
  type RenderBox,
} from "../renderBox/makeItemRenderBoxAtCameraAngle";
import {
  geometryAngleAtQuarterOffset,
  midTransitionGeometryOffsetsDegrees,
} from "./__test__/geometryAngleAtQuarterOffset";
import { populatedBroadPhase } from "./__test__/populatedBroadPhase";
import { type DrawOrderComparable } from "./DrawOrderComparable";
import { zComparator } from "./zComparator";

/**
 * a floor draws behind everything standing on it, at every camera angle. Taken
 * from the rotate-camera-test campaign's `hushpuppies` room, where at the
 * half-turn angle the floor was sorted into the middle of the draw order (in
 * front of the far wall, a hush-puppy stack, and a raised door), leaving it in
 * cyclic pairs that only masking papered over. The geometry here is the loaded
 * room's, captured verbatim - notably the floor is door-expanded on both
 * towards and away.
 */

const floor = {
  id: "f",
  type: "floor" as const,
  state: { position: { x: 0, y: -8, z: -36 } },
  aabb: { x: 128, y: 144, z: 36 },
  config: {
    floorType: "standable",
    scenery: "blacktooth",
    times: { x: 8, y: 8 },
    doorExpandedSides: ["towards", "away"],
    naturalFootprint: {
      aabb: { x: 128, y: 128, z: 36 },
      position: { x: 0, y: 0, z: -36 },
    },
  },
};

const onFloor = [
  {
    id: "h",
    type: "hushPuppy" as const,
    state: { position: { x: 0, y: 112, z: 0 } },
    aabb: { x: 48, y: 16, z: 12 },
    config: { times: { x: 3 } },
  },
  {
    id: "h1",
    type: "hushPuppy" as const,
    state: { position: { x: 16, y: 112, z: 12 } },
    aabb: { x: 32, y: 16, z: 12 },
    config: { times: { x: 2 } },
  },
  {
    id: "d1/legs",
    type: "doorLegs" as const,
    state: { position: { x: 16, y: 128, z: 0 } },
    aabb: { x: 32, y: 24, z: 48 },
    config: {
      direction: "away",
      onFloorEdge: true,
      style: "none",
      side: "away",
      height: 4,
    },
  },
  {
    id: "b",
    type: "block" as const,
    state: { position: { x: 112, y: 80, z: 0 } },
    aabb: { x: 16, y: 48, z: 12 },
    config: { style: "artificial", times: { y: 3 } },
  },
  // the raised door's frame posts, standing on the legs at z=48..96 on the
  // floor's away edge:
  {
    id: "d1/frameNear",
    type: "doorFrame" as const,
    state: { position: { x: 16, y: 128, z: 48 } },
    aabb: { x: 8, y: 24, z: 48 },
    config: { direction: "away", onFloorEdge: true, part: "near" },
  },
  {
    id: "d1/frameFar",
    type: "doorFrame" as const,
    state: { position: { x: 40, y: 128, z: 48 } },
    aabb: { x: 8, y: 24, z: 48 },
    config: { direction: "away", onFloorEdge: true, part: "far" },
  },
];

const quarterAngles: Xy[] = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

// a floor draws behind whatever stands on it at EVERY angle, not only the
// quarters the game settles at, so the invariant is asserted with participation
// and render boxes quantised to the quarter (as masking is) while the draw-order
// geometry is projected at the offset angle - exactly what the room renderer
// does while a rotation transition is in flight:
const cases = quarterAngles.flatMap((cameraAngle) =>
  midTransitionGeometryOffsetsDegrees.flatMap((geometryOffsetDegrees) =>
    onFloor.map((item) => [cameraAngle, geometryOffsetDegrees, item] as const),
  ),
);

test.for(cases)(
  "floor is behind an item standing on it at camera angle %s, geometry offset %s° (%s)",
  ([cameraAngle, geometryOffsetDegrees, item]) => {
    const renderBoxes = new Map<DrawOrderComparable, RenderBox | undefined>([
      [
        floor,
        makeItemRenderBoxAtCameraAngle(
          floor,
          cameraAngle,
          blockStackSpritesheetMeta,
        ),
      ],
      [
        item,
        makeItemRenderBoxAtCameraAngle(
          item,
          cameraAngle,
          blockStackSpritesheetMeta,
        ),
      ],
    ]);
    const broadPhase = populatedBroadPhase(
      new Set<DrawOrderComparable>([floor, item]),
      renderBoxes,
      cameraAngle,
      geometryAngleAtQuarterOffset(cameraAngle, geometryOffsetDegrees),
    );
    // behind (<0) or unordered (0, when transitively ordered via other items)
    // are both fine - a floor must never compare IN FRONT of what stands on it:
    expect(
      zComparator(floor, item, broadPhase, renderBoxes),
      `floor should not be in front of ${item.id} at (${cameraAngle.x},${cameraAngle.y}) geometry offset ${geometryOffsetDegrees}°`,
    ).toBeLessThanOrEqual(0);
  },
);
