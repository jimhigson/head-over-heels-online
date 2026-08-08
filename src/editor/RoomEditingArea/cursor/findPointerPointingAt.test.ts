import { describe, expect, test } from "vitest";

import { blockSizePx } from "../../../game/physics/mechanicsConstants";
import { allCameraAngles } from "../../../utils/vectors/rotateXy";
import { type Xyz } from "../../../utils/vectors/vectors";
import { type EditorRoomItemId } from "../../editorTypes";
import {
  blockJsonItemId,
  blockPositionBlocks,
  blockRoom,
  pointerTool,
  projectFaceCentre,
  renderBoxesForRoom,
  visibleSideFaces,
} from "./__test__/blockRoom";
import { findPointerPointingAt } from "./findPointerPointingAt";

const cameraAngleBase = { x: 1, y: 0 };

/** these rooms have no uncommitted previews in them */
const noPreviewedItems = new Set<EditorRoomItemId>();

/** the world position expected when pointing at the centre of the block's top */
const topFacePosition: Xyz = {
  x: blockPositionBlocks.x * blockSizePx.x,
  y: blockPositionBlocks.y * blockSizePx.y,
  z: (blockPositionBlocks.z + 1) * blockSizePx.z,
};

describe("at the base camera angle", () => {
  const { room, block } = blockRoom();
  // stands in for the editor's room renderer, which owns the drawn extents:
  const roomRenderer = {
    renderBoxes: renderBoxesForRoom(room, cameraAngleBase),
  };

  test("pointing at the top face finds the block, up face, and world position", () => {
    expect(
      findPointerPointingAt(
        projectFaceCentre(block, { x: 0, y: 0, z: 1 }, cameraAngleBase),
        room,
        pointerTool,
        1,
        cameraAngleBase,
        roomRenderer,
        noPreviewedItems,
      ).world,
    ).toMatchObject({
      itemId: blockJsonItemId,
      position: topFacePosition,
      onItem: { face: { x: 0, y: 0, z: 1 } },
    });
  });

  test("pointing at empty space finds nothing", () => {
    expect(
      findPointerPointingAt(
        { x: 1_000, y: 1_000 },
        room,
        pointerTool,
        1,
        cameraAngleBase,
        roomRenderer,
        noPreviewedItems,
      ).world,
    ).toBeUndefined();
  });
});

describe("at every camera angle", () => {
  test.for(allCameraAngles)(
    "pointing at the top face gives the same physical result (camera angle $x,$y)",
    (cameraAngle) => {
      const { room, block } = blockRoom();

      expect(
        findPointerPointingAt(
          projectFaceCentre(block, { x: 0, y: 0, z: 1 }, cameraAngle),
          room,
          pointerTool,
          1,
          cameraAngle,
          { renderBoxes: renderBoxesForRoom(room, cameraAngle) },
          noPreviewedItems,
        ).world,
      ).toMatchObject({
        itemId: blockJsonItemId,
        position: topFacePosition,
        onItem: { face: { x: 0, y: 0, z: 1 } },
      });
    },
  );

  test.for(visibleSideFaces)(
    "pointing at the visible side faces gives their physical faces (camera angle $cameraAngle.x,$cameraAngle.y)",
    ({ cameraAngle, apparentRight, apparentTowards }) => {
      const { room, block } = blockRoom();
      const roomRenderer = {
        renderBoxes: renderBoxesForRoom(room, cameraAngle),
      };

      for (const face of [apparentRight, apparentTowards]) {
        expect(
          findPointerPointingAt(
            projectFaceCentre(block, face, cameraAngle),
            room,
            pointerTool,
            1,
            cameraAngle,
            roomRenderer,
            noPreviewedItems,
          ).world,
        ).toMatchObject({
          itemId: blockJsonItemId,
          onItem: { face },
        });
      }
    },
  );

  test.for(allCameraAngles)(
    "pointing at empty space finds nothing (camera angle $x,$y)",
    (cameraAngle) => {
      const { room } = blockRoom();
      expect(
        findPointerPointingAt(
          { x: 1_000, y: 1_000 },
          room,
          pointerTool,
          1,
          cameraAngle,
          { renderBoxes: renderBoxesForRoom(room, cameraAngle) },
          noPreviewedItems,
        ).world,
      ).toBeUndefined();
    },
  );
});
