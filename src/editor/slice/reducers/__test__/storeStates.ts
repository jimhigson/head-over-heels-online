import { produce } from "immer";

import type { EditorRoomId, EditorRoomItemId } from "../../../editorTypes";
import type { Tool } from "../../../Tool";
import type {
  LevelEditorSliceAction,
  LevelEditorState,
} from "../../levelEditorSlice";

import { rotatingSceneryTiles } from "../../createStarterRoom";
import { initialLevelEditorSliceState } from "../../initialLevelEditorSliceState";
import { levelEditorSlice } from "../../levelEditorSlice";

export const doorItemToolWithAutoAddRooms: Tool = {
  type: "item",
  item: {
    type: "door",
    config: { toRoom: "+" as EditorRoomId, direction: "towards" },
  },
};
export const doorItemToolWithoutAutoAddRooms: Tool = {
  type: "item",
  item: {
    type: "door",
    config: { toRoom: "nowhere" as EditorRoomId, direction: "towards" },
  },
};

export const testRoomId = "testRoomId" as EditorRoomId;
export const wallItemId = "testWall" as EditorRoomItemId;

export const editorStateWithOneRoomWithNoItems: LevelEditorState = {
  ...initialLevelEditorSliceState,
  currentlyEditingRoomId: testRoomId,
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

/** convenience to apply any number of actions in sequence */
export const applyLevelEditorActions = (
  state: LevelEditorState,
  ...actions: /* functional version allows creating a pipelining that bases the action off the
   * current state, ie finding items in the current room to use in the next action */
  (((s: LevelEditorState) => LevelEditorSliceAction) | LevelEditorSliceAction)[]
): LevelEditorState => {
  return actions.reduce((state, action) => {
    const a = typeof action === "function" ? action(state) : action;
    return levelEditorSlice.reducer(state, a);
  }, state);
};
