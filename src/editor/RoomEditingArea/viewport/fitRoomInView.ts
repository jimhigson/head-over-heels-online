import { type Renderer } from "pixi.js";

import { type Xy } from "../../../utils/vectors/vectors";
import { type EditorRoomState } from "../../editorTypes";
import { editorRoomRenderDimensions } from "../editorRoomRenderDimensions";
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
  roomState: EditorRoomState,
  cameraAngle: Xy,
): void => {
  viewport.fitTo(
    editorRoomRenderDimensions(roomState, cameraAngle),
    { x: renderer.screen.width, y: renderer.screen.height },
    fitMarginFraction,
  );
};
