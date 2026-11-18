import { produce } from "immer";
import { expect, test } from "vitest";

import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
} from "../../editorTypes";
import { selectCurrentCommittedRoomJsonFromLevelEditorState } from "../levelEditorSelectors";
import {
  setSelectedItemsInRoom,
  setSelectedTeleportersDestination,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./__test__/storeStates";

const teleporterId = "t" as EditorRoomItemId;

const stateWithTeleporter = produce(
  editorStateWithOneRoomWithNoItems,
  (draft) => {
    draft.campaignInProgress.rooms[testRoomId].items[teleporterId] = {
      type: "teleporter",
      config: { toRoom: "elsewhere" as EditorRoomId, toItemId: "old" },
      position: { x: 0, y: 0, z: 0 },
    };
  },
);

const teleporterAfterSetting = (toItemId: EditorRoomItemId | undefined) =>
  selectCurrentCommittedRoomJsonFromLevelEditorState(
    reduceLevelEditorActions(
      stateWithTeleporter,
      setSelectedItemsInRoom({ jsonItemIds: [teleporterId] }),
      setSelectedTeleportersDestination({
        toRoom: "destination" as EditorRoomId,
        toItemId,
        timestamp: 0,
      }),
    ),
  ).items[teleporterId];

test("lands on the item given", () => {
  expect(
    teleporterAfterSetting("landingItem" as EditorRoomItemId),
  ).toEqual<EditorJsonItemUnion>({
    type: "teleporter",
    config: { toRoom: "destination" as EditorRoomId, toItemId: "landingItem" },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("without an item, lands by default", () => {
  expect(teleporterAfterSetting(undefined)).toEqual<EditorJsonItemUnion>({
    type: "teleporter",
    config: { toRoom: "destination" as EditorRoomId },
    position: { x: 0, y: 0, z: 0 },
  });
});
