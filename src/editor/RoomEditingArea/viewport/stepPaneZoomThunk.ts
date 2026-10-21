import { type EditorThunk } from "../../../store/store";
import { type EditorPaneId, requirePane } from "../../slice/EditorPane";
import { paneViewZoomed, selectPaneView } from "../../slice/levelEditorSlice";
import { zoomLadder } from "./zoomLadder";

// past the ends of the ladder (eg after a fit zoomed a huge room way out),
// stepping is a no-op rather than jumping to the ladder's nearest end:
const nextLadderStepUp = (zoom: number): number =>
  zoomLadder.find((step) => step > zoom) ?? zoom;

const nextLadderStepDown = (zoom: number): number =>
  zoomLadder.findLast((step) => step < zoom) ?? zoom;

/**
 * zoom a pane's view in or out to the next standard zoom, about the pane
 * centre
 */
export const stepPaneZoomThunk =
  (paneId: EditorPaneId, direction: "in" | "out"): EditorThunk =>
  (dispatch, getState) => {
    const state = getState();
    const { paneSize } = requirePane(state.levelEditor, paneId);
    const paneView = selectPaneView(state, paneId);
    // not yet framed:
    if (paneView === undefined) {
      return;
    }
    dispatch(
      paneViewZoomed({
        paneId,
        zoom:
          direction === "in" ?
            nextLadderStepUp(paneView.zoom)
          : nextLadderStepDown(paneView.zoom),
        fixedPanePoint: { x: paneSize.x / 2, y: paneSize.y / 2 },
      }),
    );
  };
