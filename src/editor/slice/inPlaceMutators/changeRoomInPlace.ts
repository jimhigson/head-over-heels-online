import type { EditorRoomId } from "../../editorTypes";
import type { LevelEditorState } from "../levelEditorSlice";

import { initialLevelEditorSliceState } from "../initialLevelEditorSliceState";

export const changeRoomInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  noPushToHistory = false,
) => {
  if (!state.campaignInProgress.rooms[roomId]) {
    console.warn(`can't change to room ${roomId} - it doesn't exist`);
    // If the room doesn't exist, we can't change to it
    return;
  }
  if (!noPushToHistory) {
    // put the old currently editing room to the back history so user
    // can return to it later:
    state.editingRoomIdHistory.back.push(state.currentlyEditingRoomId);
  }
  state.currentlyEditingRoomId = roomId;

  state.clickableAnnotationHovered = false;
  state.hoveredItem = undefined;
  state.selectedJsonItemIds = [];

  if (!noPushToHistory) {
    // clear undo/redo history when changing room:
    state.history = initialLevelEditorSliceState.history;
  }
};
