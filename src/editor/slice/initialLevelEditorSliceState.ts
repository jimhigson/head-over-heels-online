import type { EditorCampaign, EditorRoomId } from "../editorTypes";
import type { LevelEditorState } from "./levelEditorSlice";

import { starterRoom } from "./createStarterRoom";

const initialRoomId = "room_0" as EditorRoomId;
const initialRoom = { id: initialRoomId, ...starterRoom({ x: 8, y: 8 }) };
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
