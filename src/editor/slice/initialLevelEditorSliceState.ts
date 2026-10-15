import { produce } from "immer";

import { starterRoom } from "../../model/inPlaceMutators/starterRoom";
import { cameraAngleBase } from "../../utils/vectors/cameraAngleVectors";
import {
  type EditorCampaign,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../editorTypes";
import { type LevelEditorState } from "./levelEditorSlice";

const initialRoomId = "room_0" as EditorRoomId;
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
  cursorRoom: { roomId: initialRoomId, subRoomId: "*" },
  openRoomTabs: [{ roomId: initialRoomId, isPreview: false, view: undefined }],
  editingRoomIdHistory: {
    back: [],
    forward: [],
  },
  pendingEdits: undefined,
  tool: { type: "pointer" },
  cmdKSearch: "",
  hoveredItem: undefined,
  clickableAnnotationHovered: false,
  selectedJsonItemIdsByRoom: {},
  gridResolution: 1,
  cameraAngle: cameraAngleBase,
  autoCoalesce: true,
  wallsFloorsLocked: true,
  doorAutoAddsRoom: true,
  roomPaneSize: { x: 0, y: 0 },
  playtestOptions: {
    baseUrl: import.meta.env.VITE_GAME_URL,
    fromStart: false,
    playAsHeels: false,
  },
  dragInProgress: undefined,
  hoveredUndoIndex: 0,
  history: {},
};
