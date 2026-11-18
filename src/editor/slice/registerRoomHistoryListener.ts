import { startEditorListening } from "../../store/listenerMiddleware";
import { selectCursorRoomIdFromLevelEditorState } from "./levelEditorSelectors";
import { roomHistoryRecorded } from "./levelEditorSlice";

/**
 * each time an action leaves the cursor on a different room, the room it left
 * becomes a step in the room history. Only the state before and after the
 * whole action is compared, so a room that is only in front part way through
 * a reducer is never recorded. An action that changes the history itself (eg
 * going back or forward, deleting or renaming rooms, loading a campaign) has
 * already accounted for the move, so isn't recorded again
 */
export const registerRoomHistoryListener = () =>
  startEditorListening({
    predicate(_action, currentState, originalState) {
      const historyTouched =
        currentState.levelEditor.editingRoomIdHistory !==
        originalState.levelEditor.editingRoomIdHistory;
      if (historyTouched) {
        // an action that updated the history has already accounted for any move
        return false;
      }
      // we only want to record a room change if the cursor room changes between
      // original and current state:
      const cursorRoomChanged =
        selectCursorRoomIdFromLevelEditorState(currentState.levelEditor) !==
        selectCursorRoomIdFromLevelEditorState(originalState.levelEditor);
      return cursorRoomChanged;
    },
    effect(_action, { getOriginalState, dispatch }) {
      dispatch(
        roomHistoryRecorded(
          selectCursorRoomIdFromLevelEditorState(
            getOriginalState().levelEditor,
          ),
        ),
      );
    },
  });
