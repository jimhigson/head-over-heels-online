import { expect, test } from "vitest";

import { type Xy, type Xyz } from "../../../utils/vectors/vectors";
import {
  projectWorldXyzToScreenXy,
  worldBoxToCameraSpace,
} from "../projections";
import { type DrawOrderComparable } from "./DrawOrderComparable";
import { type ZGraph } from "./GraphEdges";
import { updateZEdges } from "./updateZEdges";
import { VisualIndex } from "./VisualIndex";

const base: Xy = { x: 1, y: 0 };
const anticlockwise: Xy = { x: 0, y: 1 };
const halfTurn: Xy = { x: -1, y: 0 };
const clockwise: Xy = { x: 0, y: -1 };
const allCameraAngles: Xy[] = [base, anticlockwise, halfTurn, clockwise];

// --- worldBoxToCameraSpace: hand-computed expectations, so this is not circular
// with the implementation it is proving. Box is min-corner (0,0,0), extents (2,4,1).

test.for<[Xy, { position: Xyz; aabb: Xyz }]>([
  [base, { position: { x: 0, y: 0, z: 0 }, aabb: { x: 2, y: 4, z: 1 } }],
  [
    anticlockwise,
    { position: { x: -4, y: 0, z: 0 }, aabb: { x: 4, y: 2, z: 1 } },
  ],
  [halfTurn, { position: { x: -2, y: -4, z: 0 }, aabb: { x: 2, y: 4, z: 1 } }],
  [clockwise, { position: { x: 0, y: -2, z: 0 }, aabb: { x: 4, y: 2, z: 1 } }],
])(
  "worldBoxToCameraSpace rotates the box for camera angle %o",
  ([angle, expected]) => {
    expect(
      worldBoxToCameraSpace({ x: 0, y: 0, z: 0 }, { x: 2, y: 4, z: 1 }, angle),
    ).toEqual(expected);
  },
);

// --- the projection rotates the floor-plan about the vertical axis (z stays up)

test("base projection puts a +x point on the screen left", () => {
  expect(projectWorldXyzToScreenXy({ x: 1, y: 0, z: 0 }, base)).toEqual({
    x: -1,
    y: -0.5,
  });
});

test("a quarter-turn anticlockwise moves that +x point to the screen right", () => {
  expect(
    projectWorldXyzToScreenXy({ x: 1, y: 0, z: 0 }, anticlockwise),
  ).toEqual({
    x: 1,
    y: -0.5,
  });
});

// --- the depth sort, at every angle, must equal baking that rotation into the
// world coordinates and sorting at the base angle. This proves the camera angle is
// threaded consistently through both the VisualIndex (broad phase) and zComparator
// (fine phase); base sorting is already covered by updateZEdgesStochastic.

type TestItem = DrawOrderComparable & { id: string };

const makeScene = (): Set<TestItem> => {
  const items = new Set<TestItem>();
  let i = 0;
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      // a deterministic height wave so items sit in front of/behind each other:
      const z = Math.round(Math.sin(x * 1.3 + y * 0.7) * 2 + 2);
      items.add({
        id: `item-${i++}`,
        state: { position: { x, y, z } },
        aabb: { x: 1, y: 1, z: 1 },
        renderAabb: undefined,
        renderAabbOffset: undefined,
        fixedZIndex: undefined,
      });
    }
  }
  return items;
};

const bakeRotation = (scene: Set<TestItem>, cameraAngle: Xy): Set<TestItem> => {
  const baked = new Set<TestItem>();
  for (const item of scene) {
    const { position, aabb } = worldBoxToCameraSpace(
      item.state.position,
      item.aabb,
      cameraAngle,
    );
    baked.add({ ...item, state: { position }, aabb });
  }
  return baked;
};

const behindFrontIdPairs = (graph: ZGraph<TestItem>): Set<string> => {
  const pairs = new Set<string>();
  for (const [behind, fronts] of graph) {
    for (const [front] of fronts) {
      pairs.add(`${behind.id}->${front.id}`);
    }
  }
  return pairs;
};

test.for(allCameraAngles)(
  "draw order at camera angle %o matches the rotation baked into world coords",
  (cameraAngle) => {
    const scene = makeScene();
    const baked = bakeRotation(scene, cameraAngle);

    const atAngle = updateZEdges(
      scene,
      new VisualIndex(scene.values(), cameraAngle),
    );
    const bakedAtBase = updateZEdges(baked, new VisualIndex(baked.values()));

    expect(behindFrontIdPairs(atAngle)).toEqual(
      behindFrontIdPairs(bakedAtBase),
    );
  },
);
