import { describe, expect, test } from "vitest";

import { blockSizePx } from "../../../game/physics/mechanicsConstants";
import { allCameraAngles } from "../../../utils/vectors/rotateXy";
import { type Xyz } from "../../../utils/vectors/vectors";
import {
  blockJsonItemId,
  blockPositionBlocks,
  blockRoomAtAngle,
  pointerTool,
  projectFaceCentre,
  visibleSideFaces,
} from "./__test__/blockRoomAtAngle";
import { findPointerPointingAt } from "./findPointerPointingAt";

const cameraAngleBase = { x: 1, y: 0 };

/** the world position expected when pointing at the centre of the block's top */
const topFacePosition: Xyz = {
  x: blockPositionBlocks.x * blockSizePx.x,
  y: blockPositionBlocks.y * blockSizePx.y,
  z: (blockPositionBlocks.z + 1) * blockSizePx.z,
};

describe("at the base camera angle", () => {
  const { room, block } = blockRoomAtAngle(cameraAngleBase);

  test("pointing at the top face finds the block, up face, and world position", () => {
    expect(
      findPointerPointingAt(
        projectFaceCentre(block, { x: 0, y: 0, z: 1 }, cameraAngleBase),
        room,
        pointerTool,
        1,
        cameraAngleBase,
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
      ).world,
    ).toBeUndefined();
  });
});

describe("at every camera angle", () => {
  test.for(allCameraAngles)(
    "pointing at the top face gives the same physical result (camera angle $x,$y)",
    (cameraAngle) => {
      const { room, block } = blockRoomAtAngle(cameraAngle);

      expect(
        findPointerPointingAt(
          projectFaceCentre(block, { x: 0, y: 0, z: 1 }, cameraAngle),
          room,
          pointerTool,
          1,
          cameraAngle,
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
      const { room, block } = blockRoomAtAngle(cameraAngle);

      for (const face of [apparentRight, apparentTowards]) {
        expect(
          findPointerPointingAt(
            projectFaceCentre(block, face, cameraAngle),
            room,
            pointerTool,
            1,
            cameraAngle,
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
      const { room } = blockRoomAtAngle(cameraAngle);
      expect(
        findPointerPointingAt(
          { x: 1_000, y: 1_000 },
          room,
          pointerTool,
          1,
          cameraAngle,
        ).world,
      ).toBeUndefined();
    },
  );
});
