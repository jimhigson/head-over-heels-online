import { produce } from "immer";
import { expect, test } from "vitest";

import { type JsonItem } from "../../../model/json/JsonItem";
import { type EditorRoomItemId } from "../../editorTypes";
import { selectCurrentRoomJsonFromLevelEditorState } from "../levelEditorSelectors";
import {
  setSelectedItemsInRoom,
  setSelectedMonstersMovement,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./__test__/storeStates";

const monsterAndBlock = produce(editorStateWithOneRoomWithNoItems, (draft) => {
  const { items } = draft.campaignInProgress.rooms[testRoomId];
  items["monkey" as EditorRoomItemId] = {
    type: "monster",
    config: {
      which: "monkey",
      movement: "patrol-randomly-xy4",
      startDirection: "towards",
      activated: "on",
    },
    position: { x: 0, y: 0, z: 0 },
  };
  items["block" as EditorRoomItemId] = {
    type: "block",
    config: { style: "artificial" },
    position: { x: 1, y: 0, z: 0 },
  };
});

const setMovement = selectCurrentRoomJsonFromLevelEditorState(
  reduceLevelEditorActions(
    monsterAndBlock,
    setSelectedItemsInRoom({
      jsonItemIds: ["monkey", "block"] as EditorRoomItemId[],
    }),
    setSelectedMonstersMovement({
      movement: "towards-on-shortest-axis-xy4",
      timestamp: 0,
    }),
  ),
).items;

test("sets the movement on a selected monster", () => {
  expect(setMovement["monkey" as EditorRoomItemId]).toEqual<
    JsonItem<"monster">
  >({
    type: "monster",
    config: {
      which: "monkey",
      movement: "towards-on-shortest-axis-xy4",
      startDirection: "towards",
      activated: "on",
    },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("leaves non-monster items in the selection untouched", () => {
  expect(setMovement["block" as EditorRoomItemId]).toEqual<JsonItem<"block">>({
    type: "block",
    config: { style: "artificial" },
    position: { x: 1, y: 0, z: 0 },
  });
});
