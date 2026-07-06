import { type Xy } from "../../../utils/vectors/vectors";
import { type EditorViewport } from "../viewport/EditorViewport";

const mouseEventPaneXy = (event: MouseEvent): Xy => {
  const paneElement =
    event.currentTarget instanceof HTMLElement ?
      event.currentTarget
    : (event.target as HTMLElement);
  const rect = paneElement.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

/**
 * the mouse position in engine (projection-space) coordinates - the same
 * space items' projected positions are in
 */
export const viewportMousePosition = (
  viewport: EditorViewport,
  event: MouseEvent,
): Xy => viewport.toWorld(mouseEventPaneXy(event));

/** the mouse movement since the last event, in engine coordinates */
export const viewportMouseMovement = (
  viewport: EditorViewport,
  event: MouseEvent,
): Xy => ({
  x: event.movementX / viewport.zoom,
  y: event.movementY / viewport.zoom,
});
