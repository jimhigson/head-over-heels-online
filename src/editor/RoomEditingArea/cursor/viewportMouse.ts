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

/** a pointer movement in client px, in engine coordinates */
export const viewportMouseMovement = (
  viewport: EditorViewport,
  clientMovement: Xy,
): Xy => ({
  x: clientMovement.x / viewport.zoom,
  y: clientMovement.y / viewport.zoom,
});
