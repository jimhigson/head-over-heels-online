import { Texture, WebGLRenderer } from "pixi.js";

import { installAppTickerAsPixiShared } from "../../mainLoop/installAppTickerAsPixiShared";
import { bakeUpscaledSpritesheetTexture } from "../../render/filters/upscale/bakeUpscaledSpritesheetTexture";

/**
 * the normal spritesheet is deliberately over-saturated by putting into p3 without
 * adjusting the values - do the same for the upscaled spritesheet
 */
const asDisplayP3Canvas = (
  canvas: ReturnType<WebGLRenderer["extract"]["canvas"]>,
): OffscreenCanvas => {
  const { width, height } = canvas;
  const srgbContext = canvas.getContext("2d");
  if (srgbContext === null) {
    throw new Error("upscale ui bake: extracted canvas has no 2d context");
  }
  const srgbPixels = srgbContext.getImageData(0, 0, width, height);
  const p3Canvas = new OffscreenCanvas(width, height);
  const p3Context = p3Canvas.getContext("2d", { colorSpace: "display-p3" });
  if (p3Context === null) {
    throw new Error("upscale ui bake: cannot make a display-p3 canvas");
  }
  // the same numbers, reinterpreted as p3 rather than converted to it:
  p3Context.putImageData(
    new ImageData(srgbPixels.data, width, height, { colorSpace: "display-p3" }),
    0,
    0,
  );
  return p3Canvas;
};

/**
 * Upscale a spritesheet the same way as in-game, but for css sprites
 *
 * @returns a png blob of the upscaled image, `factor` times the source size
 */
export const bakeUpscaledSpritesheetBlobForCss = async (
  /** url of the source image (eg the sprites webp asset) */
  imageUrl: string,
  /** integer upscale factor, capped by what the hardware will hold */
  factor: number,
): Promise<Blob> => {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(
      `upscale ui bake: could not fetch ${imageUrl}: HTTP ${response.status}`,
    );
  }
  // premultiplied to match what the game's bake pipeline samples:
  const bitmap = await createImageBitmap(await response.blob(), {
    premultiplyAlpha: "premultiply",
    colorSpaceConversion: "none",
  });

  // this bake can be the first thing in the session to build a renderer - on
  // the menus there is no game to have done it - and initialising one reads
  // pixi's scheduler ticker:
  installAppTickerAsPixiShared();

  // the webgl renderer by name rather than autoDetectRenderer: the game only
  // ever renders with webgl (see the pixi patch), and naming it keeps this
  // bake's reach the same as the game's rather than the union of every
  // backend the detector could have picked
  const renderer = new WebGLRenderer();
  await renderer.init({ width: 1, height: 1, antialias: false });
  const sourceTexture = Texture.from(bitmap);

  try {
    const baked = bakeUpscaledSpritesheetTexture(
      renderer,
      sourceTexture,
      factor,
    );
    try {
      const canvas = asDisplayP3Canvas(renderer.extract.canvas(baked));
      return await canvas.convertToBlob({ type: "image/png" });
    } finally {
      baked.destroy(true);
    }
  } finally {
    sourceTexture.destroy(true);
    // the renderer exists only for this one bake; holding it would keep a
    // second webgl context alive for the rest of the session
    renderer.destroy();
    bitmap.close();
  }
};
