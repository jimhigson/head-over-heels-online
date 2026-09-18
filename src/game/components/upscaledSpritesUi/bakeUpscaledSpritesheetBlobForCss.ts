import { Texture, WebGLRenderer } from "pixi.js";

import { installAppTickerAsPixiShared } from "../../mainLoop/installAppTickerAsPixiShared";
import { bakeUpscaledSpritesheetTexture } from "../../render/filters/upscale/bakeUpscaledSpritesheetTexture";

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
      const canvas = renderer.extract.canvas(baked);
      const blob =
        canvas.convertToBlob !== undefined ?
          await canvas.convertToBlob({ type: "image/png" })
        : await new Promise<Blob>((resolve, reject) => {
            if (canvas.toBlob === undefined) {
              reject(new Error("upscale ui bake: canvas cannot make a blob"));
              return;
            }
            canvas.toBlob((made) => {
              if (made === null) {
                reject(new Error("upscale ui bake: canvas made no blob"));
                return;
              }
              resolve(made);
            }, "image/png");
          });
      return blob;
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
