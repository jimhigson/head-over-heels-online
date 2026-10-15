import { type Xy } from "../../utils/vectors/vectors";
import { type RenderedRoomDimensions } from "../RoomEditingArea/editorRoomRenderDimensions";

/**
 * how a room is framed in the editing pane: a zoom and pan mapping engine
 * (projection-space) coordinates onto the pane's css pixels
 */
export type EditorRoomView = {
  zoom: number;
  /**
   * where the engine origin lands on the pane (css px), before any snapping
   * to the game-pixel grid, so small pans at high zoom accumulate rather
   * than rounding away
   */
  pan: Xy;
};

// low enough that even very large rooms can still be fitted entirely in a
// small pane:
const editorRoomViewMinZoom = 2;
const editorRoomViewMaxZoom = 16;

const clampZoom = (zoom: number): number =>
  Math.min(editorRoomViewMaxZoom, Math.max(editorRoomViewMinZoom, zoom));

/** pane (css px) → engine (projection-space) coordinates, ignoring snapping */
const toWorldUnsnapped = ({ zoom, pan }: EditorRoomView, { x, y }: Xy): Xy => ({
  x: (x - pan.x) / zoom,
  y: (y - pan.y) / zoom,
});

export const panEditorRoomView = (
  { zoom, pan }: EditorRoomView,
  /** css px */
  delta: Xy,
): EditorRoomView => ({
  zoom,
  pan: { x: pan.x + delta.x, y: pan.y + delta.y },
});

/**
 * set the zoom, keeping the given pane point (css px) over the same engine
 * position - eg zoom about the mouse cursor, or the pane centre
 */
export const zoomEditorRoomView = (
  view: EditorRoomView,
  zoom: number,
  /** the pane point to zoom about */
  fixedPanePoint: Xy,
): EditorRoomView => {
  const newZoom = clampZoom(zoom);
  const worldAtPoint = toWorldUnsnapped(view, fixedPanePoint);
  return {
    zoom: newZoom,
    pan: {
      x: fixedPanePoint.x - worldAtPoint.x * newZoom,
      y: fixedPanePoint.y - worldAtPoint.y * newZoom,
    },
  };
};

/**
 * the view that has the given engine-space rect fill the pane, centred, with
 * a margin around it - the largest it can be without clipping in either axis
 */
export const fitEditorRoomView = (
  rect: Pick<RenderedRoomDimensions, "h" | "l" | "t" | "w">,
  paneSize: Xy,
  /** per-side margin, as a fraction of the pane size (0.1 = 10% each side) */
  marginFraction: number,
): EditorRoomView => {
  const usableFraction = 1 - 2 * marginFraction;
  // floored to a whole number so the fitted view renders on the same
  // integer upscales as the game engine:
  const zoom = clampZoom(
    Math.floor(
      Math.min(
        (paneSize.x * usableFraction) / rect.w,
        (paneSize.y * usableFraction) / rect.h,
      ),
    ),
  );
  return {
    zoom,
    pan: {
      x: paneSize.x / 2 - (rect.l + rect.w / 2) * zoom,
      y: paneSize.y / 2 - (rect.t + rect.h / 2) * zoom,
    },
  };
};
