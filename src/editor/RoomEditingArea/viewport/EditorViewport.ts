import { Container } from "pixi.js";

import { type Xy } from "../../../utils/vectors/vectors";
import { type EditorRoomView } from "../../slice/EditorRoomView";

/**
 * continuous pan/zoom camera for the room editing area: a container whose
 * transform maps engine (projection-space) coordinates onto the pane's css
 * pixels. The canvas always fills the pane; zooming and panning are transform
 * writes on this container, so they never resize the renderer or touch the
 * upscale machinery.
 *
 * It draws whichever {@link EditorRoomView} it is shown, snapped to the
 * game-pixel grid, but does not decide the view itself.
 */
export class EditorViewport {
  /** the container carrying the pan/zoom transform - room graphics go inside */
  readonly container: Container = new Container({ label: "editorViewport" });

  #changeListeners = new Set<() => void>();

  get zoom(): number {
    return this.container.scale.x;
  }

  /**
   * show the view. The rendered (container) translation is always a whole
   * number of game pixels (multiples of the zoom, in screen px) so the
   * engine's pixel grid stays phase-aligned with the screen's - without this,
   * filters that rasterise at game resolution (eg the editor's one-game-pixel
   * outlines) land off the sprites' own pixel grid, shifting them by
   * sub-game-pixel amounts.
   */
  show({ zoom, pan }: EditorRoomView): void {
    this.container.scale = zoom;
    this.container.x = Math.round(pan.x / zoom) * zoom;
    this.container.y = Math.round(pan.y / zoom) * zoom;
    for (const listener of this.#changeListeners) {
      listener();
    }
  }

  /**
   * subscribe to transform (pan/zoom) changes, eg for ui that displays the
   * current zoom. Returns an unsubscribe function.
   */
  onChange(listener: () => void): () => void {
    this.#changeListeners.add(listener);
    return () => {
      this.#changeListeners.delete(listener);
    };
  }

  /** pane (css px) → engine (projection-space) coordinates */
  toWorld({ x, y }: Xy): Xy {
    const { container } = this;
    return {
      x: (x - container.x) / this.zoom,
      y: (y - container.y) / this.zoom,
    };
  }

  /** engine (projection-space) → pane (css px) coordinates */
  toScreen({ x, y }: Xy): Xy {
    const { container } = this;
    return {
      x: container.x + x * this.zoom,
      y: container.y + y * this.zoom,
    };
  }
}
