import { startAppListening } from "../../store/listenerMiddleware";
import { type EditorRootState } from "../../store/store";
import { entries } from "../../utils/entries";
import { type EditorRoomId } from "../editorTypes";
import { selectRoomFromLevelEditorState } from "../slice/levelEditorSelectors";
import {
  roomPreviewFailed,
  roomPreviewInvalidated,
  roomPreviewReady,
  roomPreviewRenderingStarted,
  roomPreviewRequested,
  type RoomPreviewSliceState,
} from "./editorRoomPreviewSlice";
import { renderRoomPreviewImage } from "./renderRoomPreviewImage";

const firstRequestedRoomId = (
  state: RoomPreviewSliceState,
): EditorRoomId | undefined => {
  for (const [roomId, preview] of entries(state.byRoomId)) {
    if (preview?.status === "requested") {
      return roomId;
    }
  }
  return undefined;
};

export const registerRoomPreviewListeners = () => {
  /**
   * only one room renders at a time - the off-screen renderer and its
   * SpritesheetVariants can only hold one (planet, colour) at once. This flag
   * guards a single drain loop; concurrent requests are picked up by the loop
   * rather than starting a competing render.
   */
  let draining = false;

  // a room entered "requested" - drive the render queue until nothing is left
  startAppListening({
    predicate: (action, currentState) =>
      roomPreviewRequested.match(action) &&
      (currentState as EditorRootState).editorRoomPreview.byRoomId[
        action.payload
      ]?.status === "requested",
    async effect(_action, { getState, dispatch }) {
      if (draining) {
        return;
      }
      draining = true;
      try {
        let roomId: EditorRoomId | undefined;
        while (
          (roomId = firstRequestedRoomId(
            (getState() as EditorRootState).editorRoomPreview,
          )) !== undefined
        ) {
          const roomJson = selectRoomFromLevelEditorState(
            (getState() as EditorRootState).levelEditor,
            roomId,
          );
          if (roomJson === undefined) {
            // room was removed between request and render
            dispatch(roomPreviewInvalidated(roomId));
            continue;
          }

          dispatch(roomPreviewRenderingStarted(roomId));
          try {
            const dataUrl = await renderRoomPreviewImage(roomJson);
            // discard if the room's json changed or it was removed while
            // rendering - the invalidation listener will have cleared the entry
            const currentRoomJson = selectRoomFromLevelEditorState(
              (getState() as EditorRootState).levelEditor,
              roomId,
            );
            if (currentRoomJson !== roomJson) {
              continue;
            }
            dispatch(roomPreviewReady({ roomId, dataUrl }));
          } catch (e) {
            console.error(
              new Error(`failed to render room preview for ${roomId}`, {
                cause: e,
              }),
            );
            dispatch(roomPreviewFailed(roomId));
          }
        }
      } finally {
        draining = false;
      }
    },
  });

  // a room's json changed or it was removed - drop its cached preview. Tests
  // equality on the rooms object so it works no matter which room changed.
  startAppListening({
    predicate: (_action, currentState, previousState) =>
      (currentState as EditorRootState).levelEditor?.campaignInProgress
        .rooms !==
      (previousState as EditorRootState).levelEditor?.campaignInProgress.rooms,
    effect(_action, { getState, getOriginalState, dispatch }) {
      const currentRooms = (getState() as EditorRootState).levelEditor
        .campaignInProgress.rooms;
      const previousRooms = (getOriginalState() as EditorRootState).levelEditor
        .campaignInProgress.rooms;

      for (const [roomId, previousRoomJson] of entries(previousRooms)) {
        if (currentRooms[roomId] !== previousRoomJson) {
          dispatch(roomPreviewInvalidated(roomId));
        }
      }
    },
  });
};
