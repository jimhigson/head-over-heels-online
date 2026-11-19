import { produce } from "immer";
import { expect, test } from "vitest";

import { type EditorRoomItemId } from "../../editorTypes";
import { selectCursorRoomSelectedJsonItemIdsFromLevelEditorState } from "../levelEditorSelectors";
import {
  selectAllOfTypeInCursorRoom,
  setClickableAnnotationHovered,
  setHoveredItemInRoom,
  setSelectedItemsInRoom,
} from "../levelEditorSlice";
import { type OpenRoomId } from "../OpenRoom";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./__test__/storeStates";

// an open room that has since been closed (or replaced, as a preview tab's is):
const closedOpenRoomId = "closedOpenRoom" as OpenRoomId;

test("an annotation's hover reported for an open room that has closed changes nothing", () => {
  expect(
    reduceLevelEditorActions(
      editorStateWithOneRoomWithNoItems,
      setClickableAnnotationHovered({
        openRoomId: closedOpenRoomId,
        hovered: false,
      }),
    ),
  ).toEqual(editorStateWithOneRoomWithNoItems);
});

test("an item's hover reported for an open room that has closed changes nothing", () => {
  expect(
    reduceLevelEditorActions(
      editorStateWithOneRoomWithNoItems,
      setHoveredItemInRoom({
        openRoomId: closedOpenRoomId,
        hoveredItem: undefined,
      }),
    ),
  ).toEqual(editorStateWithOneRoomWithNoItems);
});

test("select all of a type selects every item of that type in the room", () => {
  const state0WithItems = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      const roomItems = draft.campaignInProgress.rooms[testRoomId].items;
      roomItems["block1" as EditorRoomItemId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 0, z: 0 },
      };
      roomItems["block2" as EditorRoomItemId] = {
        type: "block",
        config: { style: "artificial" },
        position: { x: 1, y: 0, z: 0 },
      };
      roomItems["portable" as EditorRoomItemId] = {
        type: "portableBlock",
        config: { style: "drum" },
        position: { x: 2, y: 0, z: 0 },
      };
    },
  );
  const state1AfterSelectAllBlocks = reduceLevelEditorActions(
    state0WithItems,
    setSelectedItemsInRoom({ jsonItemIds: ["block1" as EditorRoomItemId] }),
    selectAllOfTypeInCursorRoom({ itemType: "block", subtype: undefined }),
  );

  expect<EditorRoomItemId[]>(
    selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(
      state1AfterSelectAllBlocks,
    ),
  ).toEqual<EditorRoomItemId[]>([
    "block1" as EditorRoomItemId,
    "block2" as EditorRoomItemId,
  ]);
});

test("select all of a subtype selects only items of that type and subtype", () => {
  const state0WithItems = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      const roomItems = draft.campaignInProgress.rooms[testRoomId].items;
      roomItems["organic1" as EditorRoomItemId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 0, z: 0 },
      };
      roomItems["artificial" as EditorRoomItemId] = {
        type: "block",
        config: { style: "artificial" },
        position: { x: 1, y: 0, z: 0 },
      };
      roomItems["organic2" as EditorRoomItemId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 2, y: 0, z: 0 },
      };
    },
  );
  const state1AfterSelectAllOrganic = reduceLevelEditorActions(
    state0WithItems,
    setSelectedItemsInRoom({ jsonItemIds: ["organic1" as EditorRoomItemId] }),
    selectAllOfTypeInCursorRoom({ itemType: "block", subtype: "organic" }),
  );

  expect<EditorRoomItemId[]>(
    selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(
      state1AfterSelectAllOrganic,
    ),
  ).toEqual<EditorRoomItemId[]>([
    "organic1" as EditorRoomItemId,
    "organic2" as EditorRoomItemId,
  ]);
});
