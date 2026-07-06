import { type Renderer } from "pixi.js";

import { editorStore } from "../../../store/store";
import { selectEditorRoomRenderDimensions } from "../../slice/levelEditorSelectors";
import { type EditorViewport } from "./EditorViewport";

/** breathing room around a fitted room, per side */
const fitMarginFraction = 0.1;

/**
 * zoom and pan the viewport so the current room's projected rect fits the
 * pane, centred, with a 10%-per-side margin of breathing room
 */
export const fitRoomInView = (
  viewport: EditorViewport,
  renderer: Renderer,
): void => {
  viewport.fitTo(
    selectEditorRoomRenderDimensions(editorStore.getState()),
    { x: renderer.screen.width, y: renderer.screen.height },
    fitMarginFraction,
  );
};
