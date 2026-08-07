import { expect } from "@playwright/test";

import { blockSizePx } from "../src/game/physics/mechanicsConstants";
import { type DirectionXy4, type Xyz } from "../src/utils/vectors/vectors";
import {
  editorCameraAngle,
  editorPointingAt,
  faceCentreWorld,
  fitRoomInView,
  openEditor,
  placeItemAtWorldPosition,
  pointAtWorldPosition,
  rotateEditorViewTo,
  selectTool,
  soleEditorItemOfType,
} from "./testUtils/editorInteractions";
import { test } from "./testUtils/test";

/**
 * which physical faces of an item are drawn facing the camera, per camera
 * angle. Written out longhand as the test's own oracle, rather than derived
 * with the same rotation the app uses
 */
const visibleFacesAtCameraAngle = [
  {
    cameraAngle: { x: 1, y: 0 },
    apparentRight: { x: -1, y: 0, z: 0 },
    apparentTowards: { x: 0, y: -1, z: 0 },
  },
  {
    cameraAngle: { x: 0, y: 1 },
    apparentRight: { x: 0, y: 1, z: 0 },
    apparentTowards: { x: -1, y: 0, z: 0 },
  },
  {
    cameraAngle: { x: -1, y: 0 },
    apparentRight: { x: 1, y: 0, z: 0 },
    apparentTowards: { x: 0, y: 1, z: 0 },
  },
  {
    cameraAngle: { x: 0, y: -1 },
    apparentRight: { x: 0, y: -1, z: 0 },
    apparentTowards: { x: 1, y: 0, z: 0 },
  },
];

const upFace: Xyz = { x: 0, y: 0, z: 1 };

/** the four settled camera angles, named by where world "away" appears */
const awayAppearsAsDirections: Array<DirectionXy4> = [
  "away",
  "left",
  "towards",
  "right",
];

test.describe("pointing at the room", () => {
  test.beforeEach(async ({ page }) => {
    await openEditor(page);
  });

  test("every drawn face of a block is pointed at as that face, at every camera angle", async ({
    page,
  }) => {
    // a block in an empty corner of the starter room, away from the players:
    await placeItemAtWorldPosition(page, "Artificial block", {
      x: blockSizePx.x,
      y: blockSizePx.y,
      z: 0,
    });
    await selectTool(page, "Pointer / select tool");

    for (const awayAppearsAs of awayAppearsAsDirections) {
      await rotateEditorViewTo(page, awayAppearsAs);
      await fitRoomInView(page);

      const cameraAngle = await editorCameraAngle(page);
      const faces = visibleFacesAtCameraAngle.find(
        ({ cameraAngle: { x, y } }) =>
          x === cameraAngle.x && y === cameraAngle.y,
      );
      if (faces === undefined) {
        throw new Error(
          `no expectation for camera angle ${JSON.stringify(cameraAngle)}`,
        );
      }

      const block = await soleEditorItemOfType(page, "block");

      for (const face of [upFace, faces.apparentRight, faces.apparentTowards]) {
        await pointAtWorldPosition(page, faceCentreWorld(block, face));

        expect(
          await editorPointingAt(page),
          `pointing at the centre of the ${JSON.stringify(face)} face, with away appearing as ${awayAppearsAs}`,
        ).toMatchObject({
          world: {
            itemId: block.id,
            onItem: { face },
          },
        });
      }
    }
  });
});
