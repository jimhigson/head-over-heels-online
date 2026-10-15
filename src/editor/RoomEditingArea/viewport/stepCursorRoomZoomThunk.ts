import { type EditorThunk } from "../../../store/store";
import {
  cursorRoomViewZoomed,
  selectCursorRoomView,
  selectRoomPaneSize,
} from "../../slice/levelEditorSlice";

/** the discrete zooms stepping goes through (the wheel is continuous) */
const zoomLadder = [0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8, 11, 16];

// past the ends of the ladder (eg after a fit zoomed a huge room way out),
// stepping is a no-op rather than jumping to the ladder's nearest end:
const nextLadderStepUp = (zoom: number): number =>
  zoomLadder.find((step) => step > zoom) ?? zoom;

const nextLadderStepDown = (zoom: number): number =>
  zoomLadder.findLast((step) => step < zoom) ?? zoom;

/**
 * zoom the cursor room's view in or out to the next standard zoom, about the
 * pane centre
 */
export const stepCursorRoomZoomThunk =
  (direction: "in" | "out"): EditorThunk =>
  (dispatch, getState) => {
    const state = getState();
    const cursorRoomView = selectCursorRoomView(state);
    if (cursorRoomView === undefined) {
      return;
    }
    const paneSize = selectRoomPaneSize(state);
    dispatch(
      cursorRoomViewZoomed({
        zoom:
          direction === "in" ?
            nextLadderStepUp(cursorRoomView.zoom)
          : nextLadderStepDown(cursorRoomView.zoom),
        fixedPanePoint: { x: paneSize.x / 2, y: paneSize.y / 2 },
      }),
    );
  };
