import { produce } from "immer";
import { expect, test } from "vitest";

import {
  type EditorJsonItemUnion,
  type EditorRoomItemId,
} from "../../editorTypes";
import { type RotationSense } from "../../itemRotation";
import { type ItemTool } from "../../RoomEditingArea/interactivity/Tool";
import { selectCurrentRoomJsonFromLevelEditorState } from "../levelEditorSelectors";
import {
  type LevelEditorState,
  rotateCurrentToolItem,
  rotateSelectedItems,
  setSelectedItemsInRoom,
  setTool,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./__test__/storeStates";

const stateWithItem = (item: EditorJsonItemUnion): LevelEditorState =>
  produce(editorStateWithOneRoomWithNoItems, (draft) => {
    draft.campaignInProgress.rooms[testRoomId].items["i" as EditorRoomItemId] =
      item;
  });

const rotateSelected = (
  item: EditorJsonItemUnion,
  sense: RotationSense,
): EditorJsonItemUnion =>
  selectCurrentRoomJsonFromLevelEditorState(
    reduceLevelEditorActions(
      stateWithItem(item),
      setSelectedItemsInRoom({ jsonItemIds: ["i" as EditorRoomItemId] }),
      rotateSelectedItems({ sense, timestamp: 0 }),
    ),
  ).items["i" as EditorRoomItemId];

test("rotates a selected lamp a quarter-turn clockwise", () => {
  expect(
    rotateSelected(
      {
        type: "lamp",
        config: { direction: "towards", activated: true },
        position: { x: 0, y: 0, z: 0 },
      },
      "clockwise",
    ),
  ).toEqual({
    type: "lamp",
    config: { direction: "left", activated: true },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("rotates a selected lamp a quarter-turn anticlockwise", () => {
  expect(
    rotateSelected(
      {
        type: "lamp",
        config: { direction: "towards", activated: true },
        position: { x: 0, y: 0, z: 0 },
      },
      "anticlockwise",
    ),
  ).toMatchObject({ config: { direction: "right" } });
});

test("flips a selected mirror (either sense is a flip)", () => {
  expect(
    rotateSelected(
      {
        type: "mirror",
        config: { orientation: "awayLeft" },
        position: { x: 0, y: 0, z: 0 },
      },
      "clockwise",
    ),
  ).toEqual({
    type: "mirror",
    config: { orientation: "awayRight" },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("rotates a selected conveyor's belt direction a quarter-turn", () => {
  expect(
    rotateSelected(
      {
        type: "conveyor",
        config: { direction: "left" },
        position: { x: 0, y: 0, z: 0 },
      },
      "clockwise",
    ),
  ).toEqual({
    type: "conveyor",
    config: { direction: "away" },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("flips a selected barrier's axis (either sense is a flip)", () => {
  expect(
    rotateSelected(
      {
        type: "barrier",
        config: { axis: "x" },
        position: { x: 0, y: 0, z: 0 },
      },
      "anticlockwise",
    ),
  ).toEqual({
    type: "barrier",
    config: { axis: "y" },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("rotates a selected scenery player by 45° (8-way)", () => {
  expect(
    rotateSelected(
      {
        type: "sceneryPlayer",
        config: { which: "head", startDirection: "towards" },
        position: { x: 0, y: 0, z: 0 },
      },
      "clockwise",
    ),
  ).toMatchObject({ config: { startDirection: "towardsLeft" } });
});

test("leaves a multi-block conveyor untouched (not rotatable in place)", () => {
  expect(
    rotateSelected(
      {
        type: "conveyor",
        config: { direction: "left", times: { x: 3 } },
        position: { x: 0, y: 0, z: 0 },
      },
      "clockwise",
    ),
  ).toEqual({
    type: "conveyor",
    config: { direction: "left", times: { x: 3 } },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("leaves a non-rotatable selected item untouched", () => {
  expect(
    rotateSelected(
      {
        type: "block",
        config: { style: "artificial" },
        position: { x: 0, y: 0, z: 0 },
      },
      "clockwise",
    ),
  ).toEqual({
    type: "block",
    config: { style: "artificial" },
    position: { x: 0, y: 0, z: 0 },
  });
});

const rotateTool = (item: ItemTool, sense: RotationSense) =>
  reduceLevelEditorActions(
    editorStateWithOneRoomWithNoItems,
    setTool({ type: "item", item }),
    rotateCurrentToolItem({ sense }),
  ).tool;

test("rotates the lamp held by the current item tool", () => {
  expect(
    rotateTool({ type: "lamp", config: { direction: "towards" } }, "clockwise"),
  ).toEqual({
    type: "item",
    item: { type: "lamp", config: { direction: "left" } },
  });
});

test("flips the mirror held by the current item tool", () => {
  expect(
    rotateTool(
      { type: "mirror", config: { orientation: "awayLeft" } },
      "anticlockwise",
    ),
  ).toMatchObject({ item: { config: { orientation: "awayRight" } } });
});

test("rotateCurrentToolItem is a no-op when no item tool is active", () => {
  expect(
    reduceLevelEditorActions(
      editorStateWithOneRoomWithNoItems,
      setTool({ type: "pointer" }),
      rotateCurrentToolItem({ sense: "clockwise" }),
    ).tool,
  ).toEqual({ type: "pointer" });
});

// a lamp tool actively hovering the room, so there is a preview item in
// pendingEdits built from the tool:
const toolAndPreviewAfterRotate = reduceLevelEditorActions(
  produce(editorStateWithOneRoomWithNoItems, (draft) => {
    draft.tool = {
      type: "item",
      item: { type: "lamp", config: { direction: "towards" } },
    };
    draft.pendingEdits = {
      edits: {
        ["preview" as EditorRoomItemId]: {
          type: "lamp",
          config: { direction: "towards" },
          position: { x: 0, y: 0, z: 0 },
        },
      },
      description: { kind: "editRoomJson" },
      timestamp: 0,
    };
  }),
  rotateCurrentToolItem({ sense: "clockwise" }),
);

test("rotates the tool item when a hover preview is present", () => {
  expect(toolAndPreviewAfterRotate.tool).toMatchObject({
    item: { config: { direction: "left" } },
  });
});

test("also rotates the hover preview to match the rotated tool", () => {
  expect(
    toolAndPreviewAfterRotate.pendingEdits?.edits[
      "preview" as EditorRoomItemId
    ],
  ).toMatchObject({ config: { direction: "left" } });
});
