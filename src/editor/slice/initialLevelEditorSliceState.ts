import { produce } from "immer";

import { starterRoom } from "../../model/inPlaceMutators/starterRoom";
import {
  type EditorCampaign,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../editorTypes";
import { type LevelEditorState } from "./levelEditorSlice";
import { openRoomDefaults, type OpenRoomId } from "./OpenRoom";
import { type TabGroupId, type TabId } from "./PaneLayout";

const initialRoomId = "room_0" as EditorRoomId;
const initialOpenRoomId = "openRoom-initial" as OpenRoomId;
const initialTabId = "tab-initial" as TabId;
const initialTabGroupId = "tabGroup-initial" as TabGroupId;
const initialRoom = produce(
  starterRoom({ x: 8, y: 8 }) as EditorRoomJson,
  (starterRoomDraft) => {
    starterRoomDraft.id = initialRoomId;
    starterRoomDraft.items["head" as EditorRoomItemId] = {
      type: "player",
      config: { which: "head" },
      position: { x: 5, y: 4, z: 0 },
    };
    starterRoomDraft.items["heels" as EditorRoomItemId] = {
      type: "player",
      config: { which: "heels" },
      position: { x: 3, y: 4, z: 0 },
    };
  },
);
const initialCampaign: EditorCampaign = {
  meta: {
    published: false,
    /**
     * so that when we come back, we can continue editing the campaign
     * from where we were
     */
    // lastEditedRoom: EditorRoomId;
  },
  locator: {
    // TODO: support renaming
    campaignName: undefined,
    userId: "anon",
    version: 0,
  },
  rooms: {
    [initialRoomId]: initialRoom,
  },
};
export const initialLevelEditorSliceState: LevelEditorState = {
  campaignInProgress: initialCampaign,
  // showing a 'new campaign' placeholder that has never been saved:
  remoteCampaign: undefined,
  selectedRoomIds: [initialRoomId],
  dialogOpenRoomIds: [],
  layout: {
    rootId: initialTabGroupId,
    nodes: {
      [initialTabGroupId]: {
        type: "tabGroup",
        id: initialTabGroupId,
        children: [initialTabId],
        frontTabId: initialTabId,
      },
      [initialTabId]: {
        type: "tab",
        id: initialTabId,
        isPreview: false,
        children: [initialOpenRoomId],
      },
      [initialOpenRoomId]: {
        ...openRoomDefaults,
        id: initialOpenRoomId,
        roomId: initialRoomId,
        subRoomId: "*",
        editable: true,
      },
    },
  },
  focusedTabGroupId: initialTabGroupId,
  nextIdNumber: 0,
  editingRoomIdHistory: {
    back: [],
    forward: [],
  },
  pendingEdits: undefined,
  tool: { type: "pointer" },
  lastItemTool: undefined,
  cmdKSearch: "",
  gridResolution: 1,
  autoCoalesce: true,
  wallsFloorsLocked: true,
  doorAutoAddsRoom: true,
  playtestOptions: {
    baseUrl: import.meta.env.VITE_GAME_URL,
    fromStart: false,
    playAsHeels: false,
  },
  hoveredUndoIndex: 0,
  history: {},
};
