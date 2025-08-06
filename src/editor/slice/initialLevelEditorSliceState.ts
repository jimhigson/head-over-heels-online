import type { EditorRoomId } from "../editorTypes";
import { starterRoom } from "./createStarterRoom";
import type { LevelEditorState } from "./levelEditorSlice";

const initialRoomId = "room_0" as EditorRoomId;
const initialRoom = { id: initialRoomId, ...starterRoom({ x: 8, y: 8 }) };
const initialCampaign = {
  name: "new campaign",
  rooms: {
    [initialRoomId]: initialRoom,
  },
};
export const initialLevelEditorSliceState: LevelEditorState = {
  campaignInProgress: initialCampaign,
  // technically this hasn't been saved, but want the save button to only be enabled
  // after the first edit
  savedCampaign: initialCampaign,
  currentlyEditingRoomId: initialRoomId,
  editingRoomIdHistory: {
    back: [],
    forward: [],
  },
  previewedEdits: {},
  tool: { type: "pointer" },
  hoveredItem: undefined,
  clickableAnnotationHovered: false,
  selectedJsonItemIds: [],
  gridResolution: 1,
  autoCoalesce: true,
  wallsFloorsLocked: true,
  dragInProgress: false,
  history: {
    undo: [],
    redo: [],
  },
};
