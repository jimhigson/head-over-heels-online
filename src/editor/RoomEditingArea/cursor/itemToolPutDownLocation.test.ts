import { expect, test } from "vitest";

import { type EditorRoomItemId } from "../../editorTypes";
import { type ItemTool, type Tool } from "../interactivity/Tool";
import {
  blockPositionBlocks,
  blockRoom,
  projectFaceCentre,
  renderBoxesForRoom,
  visibleSideFaces,
} from "./__test__/blockRoom";
import { findPointerPointingAt } from "./findPointerPointingAt";
import { itemToolPutDownLocation } from "./itemToolPutDownLocation";

const monkey: ItemTool = {
  type: "monster",
  config: {
    which: "monkey",
    activated: "off",
    startDirection: "towards",
    movement: "patrol-randomly-xy4",
  },
};
const monkeyTool: Tool = { type: "item", item: monkey };

test.for(
  visibleSideFaces.flatMap(({ cameraAngle, apparentRight, apparentTowards }) =>
    [apparentRight, apparentTowards].map((face) => ({ cameraAngle, face })),
  ),
)(
  "pointing at a side face puts the item down beside that face, not a block away (camera angle $cameraAngle.x,$cameraAngle.y, face $face.x,$face.y)",
  ({ cameraAngle, face }) => {
    const { room, block } = blockRoom();
    const pointingAt = findPointerPointingAt({
      scrXy: projectFaceCentre(block, face, cameraAngle),
      room,
      tool: monkeyTool,
      gridResolution: 1,
      cameraAngle,
      roomRenderer: { renderBoxes: renderBoxesForRoom(room, cameraAngle) },
      previewOnlyJsonItemIds: new Set<EditorRoomItemId>(),
    });
    if (pointingAt.world === undefined) {
      throw new Error("the block's side face wasn't pointed at");
    }

    const axis = face.x !== 0 ? "x" : "y";
    // the block is one block wide, so the item beside it is one block along:
    expect<number | undefined>(
      itemToolPutDownLocation(
        { ...pointingAt, world: pointingAt.world },
        block,
        monkey,
      )?.[axis],
    ).toBe(blockPositionBlocks[axis] + face[axis]);
  },
);
