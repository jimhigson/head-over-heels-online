import { expect, test } from "vitest";

import { blockSizePx } from "../../game/physics/mechanicsConstants";
import { cameraAngleBase } from "../../utils/vectors/cameraAngleVectors";
import { type Xyz } from "../../utils/vectors/vectors";
import {
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../editorTypes";
import { loadEditorRoom } from "../slice/loadEditorRoom";
import { crosshairParticles, jsonItemCentre } from "./crosshairParticles";

const roomId = "lShapedRoom" as EditorRoomId;
const crosshairedItemId = "crosshaired" as EditorRoomItemId;

/**
 * an L-shaped room of three 8×8 sub-rooms: 1 at the origin, 2 beyond it in y,
 * and 3 beside 2 in x - leaving no floor beside 1 in x
 */
const lShapedRoomWithBlockAt = (blockPosition: Xyz): EditorRoomJson => ({
  planet: "blacktooth",
  color: { hue: "cyan", shade: "basic" },
  meta: {
    subRooms: {
      "1": {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 8 } },
      },
      "2": {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 8 }, to: { x: 8, y: 16 } },
      },
      "3": {
        gridPosition: { x: 1, y: 1 },
        physicalPosition: { from: { x: 8, y: 8 }, to: { x: 16, y: 16 } },
      },
    },
  },
  items: {
    ["floor1" as EditorRoomItemId]: {
      type: "floor",
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
    },
    ["floor23" as EditorRoomItemId]: {
      type: "floor",
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 16, y: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
    },
    [crosshairedItemId]: {
      type: "block",
      config: { style: "organic" },
      position: blockPosition,
    },
  },
});

test.for([
  {
    ray: "+y",
    from: "sub-room 1",
    into: "on across sub-room 2",
    blockPosition: { x: 3, y: 3, z: 0 },
    axis: "y",
    sign: 1,
    furthestBlocks: 16,
  },
  {
    ray: "-y",
    from: "sub-room 2",
    into: "on across sub-room 1",
    blockPosition: { x: 3, y: 11, z: 0 },
    axis: "y",
    sign: -1,
    furthestBlocks: 0,
  },
  {
    ray: "+x",
    from: "sub-room 2",
    into: "on across sub-room 3",
    blockPosition: { x: 3, y: 11, z: 0 },
    axis: "x",
    sign: 1,
    furthestBlocks: 16,
  },
  {
    ray: "-x",
    from: "sub-room 3",
    into: "on across sub-room 2",
    blockPosition: { x: 11, y: 11, z: 0 },
    axis: "x",
    sign: -1,
    furthestBlocks: 0,
  },
  {
    ray: "+x",
    from: "sub-room 1",
    into: "to its edge, with no sub-room beyond",
    blockPosition: { x: 3, y: 3, z: 0 },
    axis: "x",
    sign: 1,
    furthestBlocks: 8,
  },
  {
    ray: "-y",
    from: "sub-room 3",
    into: "to its edge, with no sub-room beyond",
    blockPosition: { x: 11, y: 11, z: 0 },
    axis: "y",
    sign: -1,
    furthestBlocks: 8,
  },
] as const)(
  "the $ray ray from an item in $from reaches $into",
  ({ blockPosition, axis, sign, furthestBlocks }) => {
    const roomJson = lShapedRoomWithBlockAt(blockPosition);
    const centrePx = {
      x: (blockPosition.x + 0.5) * blockSizePx.x,
      y: (blockPosition.y + 0.5) * blockSizePx.y,
      z: (blockPosition.z + 0.5) * blockSizePx.z,
    };
    const otherAxes = (["x", "y", "z"] as const).filter((a) => a !== axis);

    const rayPositionsPx = crosshairParticles(
      loadEditorRoom(roomId, roomJson),
      roomJson,
      crosshairedItemId,
      cameraAngleBase,
    )
      .map(({ state: { box } }) => box)
      .filter(
        (box) =>
          otherAxes.every((a) => box[a] === centrePx[a]) &&
          Math.sign(box[axis] - centrePx[axis]) === sign,
      )
      .map((box) => box[axis]);

    expect(
      (sign === 1 ? Math.max(...rayPositionsPx) : Math.min(...rayPositionsPx)) /
        blockSizePx[axis],
    ).toEqual(furthestBlocks);
  },
);

test.for([
  {
    name: "a block",
    jsonItem: {
      type: "block",
      config: { style: "organic" },
      position: { x: 1, y: 1, z: 0 },
    },
    cameraAngle: cameraAngleBase,
    centreBlocks: { x: 1.5, y: 1.5, z: 0.5 },
  },
  {
    name: "a multiplied block, at its first block",
    jsonItem: {
      type: "block",
      config: { style: "organic", times: { x: 3, z: 2 } },
      position: { x: 1, y: 1, z: 0 },
    },
    cameraAngle: cameraAngleBase,
    centreBlocks: { x: 1.5, y: 1.5, z: 0.5 },
  },
  {
    name: "a block off the grid, inside it",
    jsonItem: {
      type: "block",
      config: { style: "organic" },
      position: { x: 2.25, y: 4.75, z: 0 },
    },
    cameraAngle: cameraAngleBase,
    centreBlocks: { x: 2.75, y: 5.25, z: 0.5 },
  },
  {
    name: "a multiplied block, at its block closest to a camera turned half way round",
    jsonItem: {
      type: "block",
      config: { style: "organic", times: { x: 3, y: 2 } },
      position: { x: 1, y: 1, z: 0 },
    },
    cameraAngle: { x: -1, y: 0 },
    centreBlocks: { x: 3.5, y: 2.5, z: 0.5 },
  },
] as const)(
  "the crosshair is centred on $name",
  ({ jsonItem, cameraAngle, centreBlocks }) => {
    const roomJson = lShapedRoomWithBlockAt({ x: 6, y: 6, z: 0 });
    roomJson.items[crosshairedItemId] = jsonItem;

    expect(
      jsonItemCentre(
        loadEditorRoom(roomId, roomJson),
        crosshairedItemId,
        cameraAngle,
      ),
    ).toEqual({
      x: centreBlocks.x * blockSizePx.x,
      y: centreBlocks.y * blockSizePx.y,
      z: centreBlocks.z * blockSizePx.z,
    });
  },
);

test("the crosshair is centred on a two-block-high monster's bottom block", () => {
  const roomJson = lShapedRoomWithBlockAt({ x: 6, y: 6, z: 0 });
  roomJson.items[crosshairedItemId] = {
    type: "charles",
    config: {},
    position: { x: 1, y: 1, z: 0 },
  };

  expect(
    jsonItemCentre(
      loadEditorRoom(roomId, roomJson),
      crosshairedItemId,
      cameraAngleBase,
    )?.z,
  ).toEqual(0.5 * blockSizePx.z);
});
