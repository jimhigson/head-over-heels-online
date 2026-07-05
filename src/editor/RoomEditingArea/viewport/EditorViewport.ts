import { Container } from "pixi.js";

import { type Xy } from "../../../utils/vectors/vectors";
import { type RenderedRoomDimensions } from "../../slice/levelEditorSelectors";

// low enough that even very large rooms can still be fitted entirely in a
// small pane:
const editorViewportMinZoom = 2;
const editorViewportMaxZoom = 16;

const clampZoom = (zoom: number): number =>
  Math.min(editorViewportMaxZoom, Math.max(editorViewportMinZoom, zoom));

/**
 * continuous pan/zoom camera for the room editing area: a container whose
 * transform maps engine (projection-space) coordinates onto the pane's css
 * pixels. The canvas always fills the pane; zooming and panning are transform
 * writes on this container, so they never resize the renderer or touch the
 * upscale machinery.
 */
export class EditorViewport {
  /** the container carrying the pan/zoom transform - room graphics go inside */
  readonly container: Container = new Container({ label: "editorViewport" });

  #changeListeners = new Set<() => void>();

  /**
   * the translation before snapping to the game-pixel grid. The rendered
   * (container) translation is always a whole number of game pixels
   * (multiples of the zoom, in screen px) so the engine's pixel grid stays
   * phase-aligned with the screen's - without this, filters that rasterise at
   * game resolution (eg the editor's one-game-pixel outlines) land off the
   * sprites' own pixel grid, shifting them by sub-game-pixel amounts.
   * Accumulating the pan un-snapped here means slow drags at high zoom still
   * build up to whole-game-pixel steps instead of rounding away to nothing.
   */
  #freePan: Xy = { x: 0, y: 0 };

  get zoom(): number {
    return this.container.scale.x;
  }

  /** put the snapped translation onto the rendered container */
  #applyPan(): void {
    const { zoom } = this;
    this.container.x = Math.round(this.#freePan.x / zoom) * zoom;
    this.container.y = Math.round(this.#freePan.y / zoom) * zoom;
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

  #notifyChange(): void {
    for (const listener of this.#changeListeners) {
      listener();
    }
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

  panBy({ x, y }: Xy): void {
    this.#freePan.x += x;
    this.#freePan.y += y;
    this.#applyPan();
    this.#notifyChange();
  }

  /**
   * set the zoom, keeping the given pane point (css px) over the same engine
   * position - eg zoom about the mouse cursor, or the pane centre
   */
  setZoom(
    zoom: number,
    /** the pane point to zoom about */
    fixedPanePoint: Xy,
  ): void {
    const newZoom = clampZoom(zoom);
    const worldAtPoint = this.toWorld(fixedPanePoint);
    this.container.scale = newZoom;
    this.#freePan.x = fixedPanePoint.x - worldAtPoint.x * newZoom;
    this.#freePan.y = fixedPanePoint.y - worldAtPoint.y * newZoom;
    this.#applyPan();
    this.#notifyChange();
  }

  /** multiply the zoom by a factor, fixed about the given pane point */
  zoomAtPoint(factor: number, fixedPanePoint: Xy): void {
    this.setZoom(this.zoom * factor, fixedPanePoint);
  }

  /**
   * zoom and pan so the given engine-space rect fills the pane, centred, with
   * a margin around it - the largest it can be without clipping in either
   * axis
   */
  fitTo(
    rect: Pick<RenderedRoomDimensions, "h" | "l" | "t" | "w">,
    paneSize: Xy,
    /** per-side margin, as a fraction of the pane size (0.1 = 10% each side) */
    marginFraction: number,
  ): void {
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
    this.container.scale = zoom;
    this.#freePan.x = paneSize.x / 2 - (rect.l + rect.w / 2) * zoom;
    this.#freePan.y = paneSize.y / 2 - (rect.t + rect.h / 2) * zoom;
    this.#applyPan();
    this.#notifyChange();
  }
}
