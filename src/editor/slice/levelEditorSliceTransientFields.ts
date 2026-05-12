import type { LevelEditorState } from "./levelEditorSlice";

export const levelEditorSliceNonPersistedFields: (keyof LevelEditorState)[] = [
  "previewedEdits",
  "hoveredItem",
  "clickableAnnotationHovered",
  "dragInProgress",
  "editingRoomIdHistory",
  "selectedJsonItemIds",
];
