import { type LevelEditorState } from "./levelEditorSlice";

export const levelEditorSliceNonPersistedFields: (keyof LevelEditorState)[] = [
  "pendingEdits",
  "hoveredItem",
  "hoveredUndoIndex",
  "clickableAnnotationHovered",
  "dragInProgress",
  "editingRoomIdHistory",
  "selectedJsonItemIds",
];
