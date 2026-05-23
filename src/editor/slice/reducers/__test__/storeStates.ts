import { produce } from "immer";

import { rotatingSceneryTiles } from "../../../../model/inPlaceMutators/rotatingSceneryTiles";
import { type EditorThunk } from "../../../../store/store";
import { type EditorRoomId, type EditorRoomItemId } from "../../../editorTypes";
import { type Tool } from "../../../RoomEditingArea/interactivity/Tool";
import { initialLevelEditorSliceState } from "../../initialLevelEditorSliceState";
import {
  levelEditorSlice,
  type LevelEditorSliceAction,
  type LevelEditorState,
} from "../../levelEditorSlice";

export const doorItemToolWithAutoAddRooms: Tool = {
  type: "item",
  item: {
    type: "door",
    config: { toRoom: "+", direction: "towards" },
  },
};
export const doorItemToolWithoutAutoAddRooms: Tool = {
  type: "item",
  item: {
    type: "door",
    config: { toRoom: "nowhere", direction: "towards" },
  },
};

export const testRoomId = "testRoomId" as EditorRoomId;
export const wallItemId = "testWall" as EditorRoomItemId;

export const editorStateWithOneRoomWithNoItems: LevelEditorState = {
  ...initialLevelEditorSliceState,
  selectedRoomIds: [testRoomId],
  cursorRoom: { roomId: testRoomId, subRoomId: "*" },
  campaignInProgress: {
    locator: {
      campaignName: "testCampaign",
      userId: "testUserId",
      version: 0,
    },
    rooms: {
      [testRoomId]: {
        id: testRoomId,
        planet: "blacktooth",
        color: { hue: "cyan", shade: "basic" },
        items: {},
        //size: { x: 5, y: 5 },
      },
    },
  },
};

export const editorStateWithOneRoomWithOneAwayWall: LevelEditorState = produce(
  editorStateWithOneRoomWithNoItems,
  (draftState) => {
    draftState.campaignInProgress.rooms[testRoomId].items[wallItemId] = {
      type: "wall",
      config: {
        direction: "away",
        tiles: [...rotatingSceneryTiles("blacktooth", 5)],
      },
      position: { x: 0, y: 5, z: 0 },
    };
  },
);

export type ReducibleAction = EditorThunk | LevelEditorSliceAction;

/** convenience to apply any number of actions or thunks in sequence */
export const reduceLevelEditorActions = (
  state: LevelEditorState,
  ...actions: ReducibleAction[]
): LevelEditorState => {
  return actions.reduce((state, action) => {
    if (typeof action !== "function") {
      return levelEditorSlice.reducer(state, action);
    }

    let current = state;
    (
      action as (
        dispatch: (a: LevelEditorSliceAction) => void,
        getState: () => { levelEditor: LevelEditorState },
      ) => void
    )(
      (a) => {
        current = levelEditorSlice.reducer(current, a);
      },
      () => ({ levelEditor: current }),
    );
    return current;
  }, state);
};
