import { expect, test } from "vitest";

import { Graph } from "../../../utils/graph/Graph";
import {
  cameraAngleBase,
  halfTurn,
  quarterCameraAngles,
  quarterTurnAnticlockwise,
  quarterTurnClockwise,
} from "../../../utils/vectors/cameraAngleVectors";
import { type Xy, type XyzBox } from "../../../utils/vectors/vectors";
import { projectWorldXyzToScreenXy } from "../projections";
import { type RenderBox } from "../renderBox/makeItemRenderBoxAtCameraAngle";
import { graphEdgeStrings } from "./__test__/graphEdgeStrings";
import { populatedBroadPhase } from "./__test__/populatedBroadPhase";
import { worldBoxToCameraSpace } from "./__test__/worldBoxToCameraSpace";
import { type DrawOrderComparable } from "./DrawOrderComparable";
import { updateZEdges } from "./updateZEdges";

// --- worldBoxToCameraSpace: hand-computed expectations, so this is not circular
// with the implementation it is proving. Box is min-corner (0,0,0), extents (2,4,1).

test.for<[Xy, XyzBox]>([
  [cameraAngleBase, { x: 0, y: 0, z: 0, xd: 2, yd: 4, zd: 1 }],
  [quarterTurnAnticlockwise, { x: -4, y: 0, z: 0, xd: 4, yd: 2, zd: 1 }],
  [halfTurn, { x: -2, y: -4, z: 0, xd: 2, yd: 4, zd: 1 }],
  [quarterTurnClockwise, { x: 0, y: -2, z: 0, xd: 4, yd: 2, zd: 1 }],
])(
  "worldBoxToCameraSpace rotates the box for camera angle %o",
  ([angle, expected]) => {
    expect(
      worldBoxToCameraSpace({ x: 0, y: 0, z: 0, xd: 2, yd: 4, zd: 1 }, angle),
    ).toEqual(expected);
  },
);

// --- the projection rotates the floor-plan about the vertical axis (z stays up)

test("base projection puts a +x point on the screen left", () => {
  expect(
    projectWorldXyzToScreenXy({ x: 1, y: 0, z: 0 }, cameraAngleBase),
  ).toEqual({
    x: -1,
    y: -0.5,
  });
});

test("a quarter-turn anticlockwise moves that +x point to the screen right", () => {
  expect(
    projectWorldXyzToScreenXy({ x: 1, y: 0, z: 0 }, quarterTurnAnticlockwise),
  ).toEqual({
    x: 1,
    y: -0.5,
  });
});

// --- the depth sort, at every angle, must equal baking that rotation into the
// world coordinates and sorting at the base angle. This proves the camera angle is
// threaded consistently through both the DrawOrderBroadPhase (broad phase) and zComparator
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
        state: { box: { x, y, z, xd: 1, yd: 1, zd: 1 } },
        fixedZIndex: undefined,
      });
    }
  }
  return items;
};

const bakeRotation = (scene: Set<TestItem>, cameraAngle: Xy): Set<TestItem> => {
  const baked = new Set<TestItem>();
  for (const item of scene) {
    baked.add({
      ...item,
      state: { box: worldBoxToCameraSpace(item.state.box, cameraAngle) },
    });
  }
  return baked;
};

test.for(quarterCameraAngles)(
  "draw order at camera angle %o matches the rotation baked into world coords",
  (cameraAngle) => {
    const scene = makeScene();
    const baked = bakeRotation(scene, cameraAngle);

    const noRenderBoxes = new Map<TestItem, RenderBox | undefined>();
    const zEdgesAtAngle = new Graph<TestItem>();
    updateZEdges(
      scene,
      populatedBroadPhase(scene, noRenderBoxes, cameraAngle),
      zEdgesAtAngle,
      noRenderBoxes,
    );
    const bakedAtBase = new Graph<TestItem>();
    updateZEdges(baked, populatedBroadPhase(baked), bakedAtBase, noRenderBoxes);

    expect(graphEdgeStrings(zEdgesAtAngle)).toEqual(
      graphEdgeStrings(bakedAtBase),
    );
  },
);
