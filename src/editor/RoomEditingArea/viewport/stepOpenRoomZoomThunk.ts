import { type EditorThunk } from "../../../store/store";
import {
  openRoomViewZoomed,
  selectOpenRoomView,
} from "../../slice/levelEditorSlice";
import { existingOpenRoom, type OpenRoomId } from "../../slice/OpenRoom";
import { zoomLadder } from "./zoomLadder";

// past the ends of the ladder (eg after a fit zoomed a huge room way out),
// stepping is a no-op rather than jumping to the ladder's nearest end:
const nextLadderStepUp = (zoom: number): number =>
  zoomLadder.find((step) => step > zoom) ?? zoom;

const nextLadderStepDown = (zoom: number): number =>
  zoomLadder.findLast((step) => step < zoom) ?? zoom;

/**
 * zoom an open room's view in or out to the next standard zoom, about the pane
 * centre
 */
export const stepOpenRoomZoomThunk =
  (openRoomId: OpenRoomId, direction: "in" | "out"): EditorThunk =>
  (dispatch, getState) => {
    const state = getState();
    const { paneSize } = existingOpenRoom(state.levelEditor, openRoomId);
    const openRoomView = selectOpenRoomView(state, openRoomId);
    // not yet framed:
    if (openRoomView === undefined) {
      return;
    }
    dispatch(
      openRoomViewZoomed({
        openRoomId,
        zoom:
          direction === "in" ?
            nextLadderStepUp(openRoomView.zoom)
          : nextLadderStepDown(openRoomView.zoom),
        fixedPanePoint: { x: paneSize.x / 2, y: paneSize.y / 2 },
      }),
    );
  };
