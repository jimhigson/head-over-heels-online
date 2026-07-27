/**
 * true if the browser exposes the experimental html-in-canvas API
 * (chrome behind the `#canvas-draw-element` flag, or
 * `--enable-blink-features=CanvasDrawElement`). This is what allows live DOM
 * elements to be uploaded as webgl textures via `gl.texElementImage2D`, which
 * pixi's `HTMLSource` uses.
 *
 * Constant for the life of the page - flags can't change under a running tab.
 */
export const htmlInCanvasSupported =
  typeof WebGL2RenderingContext !== "undefined" &&
  "texElementImage2D" in WebGL2RenderingContext.prototype;
