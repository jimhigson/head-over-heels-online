import { produce } from "immer";
import { expect, test } from "vitest";

import { loadRoom } from "../game/gameState/loadRoom/loadRoom";
import { noPlanetsLiberated } from "../store/slices/gameInPlay/gameInPlaySlice";
import { emptyUserSettings } from "../store/slices/userSettings/emptyUserSettings";
import { originXyz } from "../utils/vectors/vectors";
import { type EditorRoomItemId, type EditorRoomState } from "./editorTypes";
import { selectionSnapResolutions } from "./selectionSnapResolutions";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelectionsFromLevelEditorState,
} from "./slice/levelEditorSelectors";
import { setSelectedItemsInRoom } from "./slice/levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./slice/reducers/__test__/storeStates";

test("two touching off-grid blocks can be snapped to the grid together, each into the space the other leaves", () => {
  const blockAId = "blockA" as EditorRoomItemId;
  const blockBId = "blockB" as EditorRoomItemId;
  // blocks half a block off the grid in x, touching: snapped, A moves to
  // x = 1, where B is now, but not where B snaps to (x = 2):
  const state0TwoOffGridBlocks = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      const { items } = draft.campaignInProgress.rooms[testRoomId];
      items["floor" as EditorRoomItemId] = {
        type: "floor",
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 8, y: 8 },
        },
        position: originXyz,
      };
      items[blockAId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 0.5, y: 2, z: 0 },
      };
      items[blockBId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 1.5, y: 2, z: 0 },
      };
    },
  );

  const state1BothSelected = reduceLevelEditorActions(
    state0TwoOffGridBlocks,
    setSelectedItemsInRoom({
      selection: [blockAId, blockBId].map((jsonItemId) => ({
        jsonItemId,
        whichEditorGhost: undefined,
      })),
    }),
  );
  const roomJson =
    selectCurrentCommittedRoomJsonFromLevelEditorState(state1BothSelected);

  expect(
    selectionSnapResolutions(
      loadRoom({
        roomId: testRoomId,
        roomJson,
        scrollsRead: {},
        planetsLiberated: noPlanetsLiberated,
        roomPickupsCollected: {},
        isNewGame: false,
        userSettings: emptyUserSettings,
      }) as EditorRoomState,
      roomJson,
      selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelectionsFromLevelEditorState(
        state1BothSelected,
      ),
    ),
  ).toEqual([1]);
});
