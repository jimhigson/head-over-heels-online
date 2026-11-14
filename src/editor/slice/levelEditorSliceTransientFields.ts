import { type LevelEditorState } from "./levelEditorSlice";

/**
 * fields that belong to the campaign being edited but are not kept - reset
 * when another campaign is loaded
 */
export const levelEditorSliceCampaignTransientFields: (keyof LevelEditorState)[] =
  ["pendingEdits", "hoveredUndoIndex", "editingRoomIdHistory", "cmdKSearch"];
