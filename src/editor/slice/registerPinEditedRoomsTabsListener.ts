import { startEditorListening } from "../../store/listenerMiddleware";
import { editedRoomsTabsPinned } from "./levelEditorSlice";
import { layoutNodesOfType, tabOpenRoom } from "./PaneLayout";

/**
 * a room that has changed since its tab was opened (by any edit, however it
 * was made) keeps its tab open when other rooms are browsed to
 */
export const registerPinEditedRoomsTabsListener = () =>
  startEditorListening({
    predicate: (_action, currentState, originalState) =>
      currentState.levelEditor.campaignInProgress.rooms !==
      originalState.levelEditor.campaignInProgress.rooms,
    effect(_action, { getState, getOriginalState, dispatch }) {
      const { levelEditor: levelEditorState } = getState();
      const {
        campaignInProgress: { rooms },
        layout,
      } = levelEditorState;

      const {
        levelEditor: {
          campaignInProgress: { rooms: originalRooms },
        },
      } = getOriginalState();

      // only rooms with a preview tab have a tab to pin:
      const editedPreviewRoomIds = layoutNodesOfType(layout, "tab")
        .filter(({ isPreview }) => isPreview)
        .map((tab) => tabOpenRoom(layout, tab).roomId)
        .filter((roomId) => rooms[roomId] !== originalRooms[roomId])
        .toArray();
      if (editedPreviewRoomIds.length > 0) {
        dispatch(editedRoomsTabsPinned(editedPreviewRoomIds));
      }
    },
  });
