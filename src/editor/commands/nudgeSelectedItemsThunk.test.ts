import { produce } from "immer";
import { expect, test } from "vitest";

import { nowhereRoomId } from "../../model/json/ItemConfigMap";
import { type Xyz } from "../../utils/vectors/vectors";
import { type EditorRoomId, type EditorRoomItemId } from "../editorTypes";
import { selectCurrentCommittedRoomJsonFromLevelEditorState } from "../slice/levelEditorSelectors";
import {
  commitPendingNudge,
  type LevelEditorState,
} from "../slice/levelEditorSlice";
import { loadEditorRoom } from "../slice/loadEditorRoom";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "../slice/reducers/__test__/storeStates";
import { nudgeSelectedItemsThunk } from "./nudgeSelectedItemsThunk";

test("nudging a door at a fine grid resolution moves it by a whole block", () => {
  const wallBeforeDoorId = "wallBeforeDoor" as EditorRoomItemId;
  const doorId = "door" as EditorRoomItemId;
  const wallAfterDoorId = "wallAfterDoor" as EditorRoomItemId;

  const state0: LevelEditorState = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      draft.gridResolution = 0.125;
      draft.selectedJsonItemIdsByRoom[testRoomId] = [doorId];
      const room = draft.campaignInProgress.rooms[testRoomId];
      room.items["floor" as EditorRoomItemId] = {
        type: "floor",
        position: { x: 0, y: 0, z: 0 },
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 8, y: 6 },
        },
      };
      room.items[wallBeforeDoorId] = {
        type: "wall",
        position: { x: 8, y: 0, z: 0 },
        config: {
          tiles: ["plain"],
          direction: "left",
        },
      };
      room.items[doorId] = {
        type: "door",
        position: { x: 8, y: 1, z: 0 },
        config: {
          direction: "left",
          toRoom: nowhereRoomId as EditorRoomId,
        },
      };
      room.items[wallAfterDoorId] = {
        type: "wall",
        position: { x: 8, y: 3, z: 0 },
        config: {
          tiles: ["plain", "plain", "plain"],
          direction: "left",
        },
      };
    },
  );

  const state1 = reduceLevelEditorActions(
    state0,
    nudgeSelectedItemsThunk(
      { posVector: { x: 0, y: 1, z: 0 } },
      loadEditorRoom(
        selectCurrentCommittedRoomJsonFromLevelEditorState(state0),
      ),
    ),
    commitPendingNudge(),
  );

  expect<undefined | Xyz>(
    state1.campaignInProgress.rooms[testRoomId].items[doorId]?.position,
  ).toEqual<Xyz>({ x: 8, y: 2, z: 0 });
});

test.for([
  { from: 1.25, direction: 1, to: 1.5 },
  { from: 1.25, direction: -1, to: 1 },
  { from: 1.5, direction: 1, to: 2 },
  { from: 1.5, direction: -1, to: 1 },
])(
  "nudging at half-block grid resolution snaps x from $from to the next half-block line, $to",
  ({ from, direction, to }) => {
    const monkeyId = "monkey" as EditorRoomItemId;
    const state0: LevelEditorState = produce(
      editorStateWithOneRoomWithNoItems,
      (draft) => {
        draft.gridResolution = 0.5;
        draft.selectedJsonItemIdsByRoom[testRoomId] = [monkeyId];
        const room = draft.campaignInProgress.rooms[testRoomId];
        room.items["floor" as EditorRoomItemId] = {
          type: "floor",
          position: { x: 0, y: 0, z: 0 },
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 8, y: 8 },
          },
        };
        room.items[monkeyId] = {
          type: "monster",
          position: { x: from, y: 1, z: 0 },
          config: {
            which: "monkey",
            activated: "off",
            startDirection: "towards",
            movement: "patrol-randomly-xy4",
          },
        };
      },
    );

    const state1 = reduceLevelEditorActions(
      state0,
      nudgeSelectedItemsThunk(
        { posVector: { x: direction, y: 0, z: 0 } },
        loadEditorRoom(
          selectCurrentCommittedRoomJsonFromLevelEditorState(state0),
        ),
      ),
      commitPendingNudge(),
    );

    expect<number | undefined>(
      state1.campaignInProgress.rooms[testRoomId].items[monkeyId]?.position.x,
    ).toBe(to);
  },
);
