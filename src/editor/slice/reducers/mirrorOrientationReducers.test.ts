import { produce } from "immer";
import { expect, test } from "vitest";

import { type MirrorOrientation } from "../../../model/MirrorOrientation";
import {
  type EditorJsonItemUnion,
  type EditorRoomItemId,
} from "../../editorTypes";
import { selectCurrentRoomJsonFromLevelEditorState } from "../levelEditorSelectors";
import {
  type LevelEditorState,
  setSelectedItemsInRoom,
  setSelectedItemsMirrorOrientation,
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

const setOrientation = (
  item: EditorJsonItemUnion,
  orientation: MirrorOrientation,
): EditorJsonItemUnion =>
  selectCurrentRoomJsonFromLevelEditorState(
    reduceLevelEditorActions(
      stateWithItem(item),
      setSelectedItemsInRoom({ jsonItemIds: ["i" as EditorRoomItemId] }),
      setSelectedItemsMirrorOrientation({ orientation, timestamp: 0 }),
    ),
  ).items["i" as EditorRoomItemId];

test("flips a mirror's pane orientation", () => {
  expect(
    setOrientation(
      {
        type: "mirror",
        config: { orientation: "awayLeft" },
        position: { x: 0, y: 0, z: 0 },
      },
      "awayRight",
    ),
  ).toEqual({
    type: "mirror",
    config: { orientation: "awayRight" },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("leaves non-mirror items untouched", () => {
  expect(
    setOrientation(
      {
        type: "block",
        config: { style: "artificial" },
        position: { x: 0, y: 0, z: 0 },
      },
      "awayRight",
    ),
  ).toEqual({
    type: "block",
    config: { style: "artificial" },
    position: { x: 0, y: 0, z: 0 },
  });
});
