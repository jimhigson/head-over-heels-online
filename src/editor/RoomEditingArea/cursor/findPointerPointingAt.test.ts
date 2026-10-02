import { describe, expect, test } from "vitest";

import { blockSizePx } from "../../../game/physics/mechanicsConstants";
import { projectWorldXyzToScreenXy } from "../../../game/render/projections";
import { quarterCameraAngles } from "../../../utils/vectors/cameraAngleVectors";
import { type Xy, type Xyz } from "../../../utils/vectors/vectors";
import {
  type EditorRoomItemId,
  type EditorUnionOfAllItemInPlayTypes,
} from "../../editorTypes";
import { type Tool } from "../interactivity/Tool";
import {
  blockJsonItemId,
  blockPositionBlocks,
  blockRoom,
  pointerTool,
  projectFaceCentre,
  renderBoxesForRoom,
  visibleSideFaces,
} from "./__test__/blockRoom";
import {
  inPlayItemForJsonItemId,
  rightWallsRoom,
  wallDrawnAtCameraAngle,
  wallHiddenAtCameraAngle,
} from "./__test__/wallRoom";
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
      findPointerPointingAt({
        scrXy: projectFaceCentre(block, { x: 0, y: 0, z: 1 }, cameraAngleBase),
        room,
        tool: pointerTool,
        gridResolution: 1,
        cameraAngle: cameraAngleBase,
        roomRenderer,
        previewOnlyJsonItemIds: noPreviewedItems,
      }).world,
    ).toMatchObject({
      itemId: blockJsonItemId,
      position: topFacePosition,
      onItem: { face: { x: 0, y: 0, z: 1 } },
    });
  });

  test("pointing at empty space finds nothing", () => {
    expect(
      findPointerPointingAt({
        scrXy: { x: 1_000, y: 1_000 },
        room,
        tool: pointerTool,
        gridResolution: 1,
        cameraAngle: cameraAngleBase,
        roomRenderer,
        previewOnlyJsonItemIds: noPreviewedItems,
      }).world,
    ).toBeUndefined();
  });
});

describe("at every camera angle", () => {
  test.for(quarterCameraAngles)(
    "pointing at the top face gives the same physical result (camera angle $x,$y)",
    (cameraAngle) => {
      const { room, block } = blockRoom();

      expect(
        findPointerPointingAt({
          scrXy: projectFaceCentre(block, { x: 0, y: 0, z: 1 }, cameraAngle),
          room,
          tool: pointerTool,
          gridResolution: 1,
          cameraAngle,
          roomRenderer: { renderBoxes: renderBoxesForRoom(room, cameraAngle) },
          previewOnlyJsonItemIds: noPreviewedItems,
        }).world,
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
          findPointerPointingAt({
            scrXy: projectFaceCentre(block, face, cameraAngle),
            room,
            tool: pointerTool,
            gridResolution: 1,
            cameraAngle,
            roomRenderer,
            previewOnlyJsonItemIds: noPreviewedItems,
          }).world,
        ).toMatchObject({
          itemId: blockJsonItemId,
          onItem: { face },
        });
      }
    },
  );

  test.for(quarterCameraAngles)(
    "pointing at empty space finds nothing (camera angle $x,$y)",
    (cameraAngle) => {
      const { room } = blockRoom();
      expect(
        findPointerPointingAt({
          scrXy: { x: 1_000, y: 1_000 },
          room,
          tool: pointerTool,
          gridResolution: 1,
          cameraAngle,
          roomRenderer: { renderBoxes: renderBoxesForRoom(room, cameraAngle) },
          previewOnlyJsonItemIds: noPreviewedItems,
        }).world,
      ).toBeUndefined();
    },
  );
});

describe("with a preview overriding a committed wall", () => {
  const doorTool: Tool = {
    type: "item",
    item: { type: "door", config: { direction: "away", toRoom: "+" } },
  };

  /** high above a wall, halfway along it - in its physical box, beyond its art */
  const highAboveWall = (
    wall: EditorUnionOfAllItemInPlayTypes,
    cameraAngle: Xy,
  ) =>
    projectWorldXyzToScreenXy(
      {
        x: wall.state.box.x + wall.state.box.xd / 2,
        y: wall.state.box.y + wall.state.box.yd / 2,
        z: 40 * blockSizePx.z,
      },
      cameraAngle,
    );

  /**
   * a committed wall `overridden` that the preview has taken out of the room,
   * alongside an identical wall `other` that is still in it
   */
  const roomWithOverriddenWall = () => {
    const room = rightWallsRoom({ overridden: 4, other: 4 });
    const overridden = inPlayItemForJsonItemId(room, "overridden");
    const other = inPlayItemForJsonItemId(room, "other");
    delete room.items[overridden.id];
    room.itemsOverriddenByPreview[overridden.id] = overridden;
    return { room, overridden, other };
  };

  test("an overridden wall is pointed at over another undrawn wall", () => {
    const { room, overridden } = roomWithOverriddenWall();

    expect(
      findPointerPointingAt({
        scrXy: highAboveWall(overridden, wallHiddenAtCameraAngle),
        room,
        tool: doorTool,
        gridResolution: 1,
        cameraAngle: wallHiddenAtCameraAngle,
        roomRenderer: {
          renderBoxes: renderBoxesForRoom(room, wallHiddenAtCameraAngle),
        },
        previewOnlyJsonItemIds: noPreviewedItems,
      }).world?.itemId,
    ).toBe(overridden.id);
  });

  test("a drawn wall is still pointed at over an overridden one", () => {
    const { room, other } = roomWithOverriddenWall();
    const renderBoxes = renderBoxesForRoom(room, wallDrawnAtCameraAngle);
    const otherRenderBox = renderBoxes.get(other);

    expect(
      findPointerPointingAt({
        // low on the drawn plane of the wall, where its art is:
        scrXy: projectWorldXyzToScreenXy(
          {
            x: other.state.box.x + (otherRenderBox?.renderAabbOffset?.x ?? 0),
            y: other.state.box.y + other.state.box.yd / 2,
            z: blockSizePx.z / 2,
          },
          wallDrawnAtCameraAngle,
        ),
        room,
        tool: doorTool,
        gridResolution: 1,
        cameraAngle: wallDrawnAtCameraAngle,
        roomRenderer: { renderBoxes },
        previewOnlyJsonItemIds: noPreviewedItems,
      }).world?.itemId,
    ).toBe(other.id);
  });

  describe("where the preview lengthens the wall", () => {
    /** the wall as previewed is longer than as committed */
    const lengthenedWall = () => {
      const room = rightWallsRoom({ wall: 6 });
      const committed = inPlayItemForJsonItemId(
        rightWallsRoom({ wall: 2 }),
        "wall",
      );
      const previewed = inPlayItemForJsonItemId(room, "wall");
      // over the part only the previewed wall reaches:
      const scrXy = projectWorldXyzToScreenXy(
        {
          x: previewed.state.box.x + previewed.state.box.xd / 2,
          y: previewed.state.box.y + 4.5 * blockSizePx.y,
          z: 40 * blockSizePx.z,
        },
        wallHiddenAtCameraAngle,
      );
      return { room, committed, scrXy };
    };

    test("pointing at the previewed wall's extension finds it, ordinarily", () => {
      const { room, scrXy } = lengthenedWall();

      expect(
        findPointerPointingAt({
          scrXy,
          room,
          tool: doorTool,
          gridResolution: 1,
          cameraAngle: wallHiddenAtCameraAngle,
          roomRenderer: {
            renderBoxes: renderBoxesForRoom(room, wallHiddenAtCameraAngle),
          },
          previewOnlyJsonItemIds: noPreviewedItems,
        }).world,
      ).toBeDefined();
    });

    test("the previewed version of an overridden wall is not pointed at", () => {
      const { room, committed, scrXy } = lengthenedWall();
      room.itemsOverriddenByPreview[committed.id] = committed;

      expect(
        findPointerPointingAt({
          scrXy,
          room,
          tool: doorTool,
          gridResolution: 1,
          cameraAngle: wallHiddenAtCameraAngle,
          roomRenderer: {
            renderBoxes: renderBoxesForRoom(room, wallHiddenAtCameraAngle),
          },
          previewOnlyJsonItemIds: noPreviewedItems,
        }).world,
      ).toBeUndefined();
    });
  });
});
