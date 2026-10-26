import { Texture, WebGLRenderer } from "pixi.js";

import { makeSpritesheetData } from "../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import {
  spritesheetMetas,
  type SpritesheetName,
} from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { valuesIter } from "../../../utils/entries";
import { type Xy } from "../../../utils/vectors/vectors";
import { installAppTickerAsPixiShared } from "../../mainLoop/installAppTickerAsPixiShared";
import { bakeUpscaledSpritesheetTexture } from "../../render/filters/upscale/bakeUpscaledSpritesheetTexture";

type ExtractedCanvas = ReturnType<WebGLRenderer["extract"]["canvas"]>;

/** undefined where the browser has no display-p3 canvases */
const displayP3Context = (
  canvas: OffscreenCanvas,
): OffscreenCanvasRenderingContext2D | undefined => {
  try {
    return canvas.getContext("2d", { colorSpace: "display-p3" }) ?? undefined;
  } catch {
    // a browser that does not know the colour space rejects the option outright
    return undefined;
  }
};

/**
 * the normal spritesheet is deliberately over-saturated by putting into p3 without
 * adjusting the values - do the same for the upscaled spritesheet. Undefined
 * where p3 is unavailable
 */
const asDisplayP3Canvas = (
  canvas: ExtractedCanvas,
): OffscreenCanvas | undefined => {
  const { width, height } = canvas;
  const srgbContext = canvas.getContext("2d");
  if (srgbContext === null) {
    throw new Error("upscale ui bake: extracted canvas has no 2d context");
  }
  const p3Canvas = new OffscreenCanvas(width, height);
  const p3Context = displayP3Context(p3Canvas);
  if (p3Context === undefined) {
    return undefined;
  }
  const srgbPixels = srgbContext.getImageData(0, 0, width, height);
  // the same numbers, reinterpreted as p3 rather than converted to it:
  p3Context.putImageData(
    new ImageData(srgbPixels.data, width, height, { colorSpace: "display-p3" }),
    0,
    0,
  );
  return p3Canvas;
};

const extractedCanvasToPngBlob = (canvas: ExtractedCanvas): Promise<Blob> =>
  canvas.convertToBlob !== undefined ?
    canvas.convertToBlob({ type: "image/png" })
  : new Promise<Blob>((resolve, reject) => {
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

export type UpscaledSpritesheetBlob = {
  /**
   * a png of the upscaled sheet
   */
  blob: Blob;
  /**
   * the png's pixels per source pixel, each axis: the y asked for, realised
   * to a whole number of pixels over the sheet's height
   */
  upscale: Xy;
};

/**
 * Upscale a spritesheet the same way as in-game, but for css sprites
 */
export const bakeUpscaledSpritesheetBlobForCss = async (
  /** url of the source image (eg the sprites webp asset) */
  imageUrl: string,
  /**
   * pixels per source pixel, each axis: x a whole number, capped by what the
   * hardware will hold; y may be fractional, for non-square pixels
   */
  upscale: Xy,
  /**
   * the sheet the image is of, for where its frames lie
   */
  spritesheetArtName: SpritesheetName,
): Promise<UpscaledSpritesheetBlob> => {
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
      upscale,
      valuesIter(
        makeSpritesheetData(spritesheetMetas[spritesheetArtName]).frames,
      ).map(({ frame }) => frame),
    );
    try {
      const extracted = renderer.extract.canvas(baked);
      const p3Canvas = asDisplayP3Canvas(extracted);
      // without p3, fall back to srgb: less saturated than the source, but still upscaled
      const blob =
        p3Canvas === undefined ?
          await extractedCanvasToPngBlob(extracted)
        : await p3Canvas.convertToBlob({ type: "image/png" });
      return {
        blob,
        upscale: {
          x: upscale.x,
          y: baked.source.pixelHeight / sourceTexture.height,
        },
      };
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
