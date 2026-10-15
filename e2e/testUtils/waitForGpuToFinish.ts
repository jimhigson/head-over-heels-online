import { type Page } from "@playwright/test";

/**
 * block until the GPU has executed every command the game has issued so far.
 *
 * A `frameRendered` event means the frame's draw calls were *issued*, not that
 * they ran: on a software rasteriser (SwiftShader on CI) a heavy frame - eg the
 * first one after an upscale bake - can keep the GPU process busy for seconds
 * after. Playwright's screenshot first waits for the page to produce
 * animation frames, which it cannot do until that backlog clears, so the
 * backlog is spent against the screenshot's own short timeout. Draining it here
 * moves that wait to where nothing but the test timeout bounds it.
 *
 * A one-pixel `readPixels` is synchronous: it cannot return until the GPU has
 * caught up. The pixel itself is discarded
 */
export const waitForGpuToFinish = (page: Page): Promise<void> =>
  page.evaluate(() => {
    // read from the game's own context: creating a probe context can cost the
    // game its own (webkit rations them per page)
    const gl = (
      window.__PIXI_APP__?.renderer as
        { gl?: WebGL2RenderingContext } | undefined
    )?.gl;
    if (gl === undefined) {
      throw new Error(
        "no pixi webgl context on the window - is this a visual-regression build?",
      );
    }
    gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
  });
