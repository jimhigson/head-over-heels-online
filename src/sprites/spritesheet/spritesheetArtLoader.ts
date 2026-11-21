import { stripIccProfilePng } from "../../utils/image/stripIccProfilePng";
import { stripIccProfileWebp } from "../../utils/image/stripIccProfileWebp";

/**
 * fetch and decode a sheet's art with its colour profile stripped, so its
 * numbers reach the GPU unconverted. Premultiplied in the decode, as WebGL
 * ignores its unpack flags for a bitmap - the same texels an image element
 * premultiplied on upload gives
 */
const fetchAndPreprocessArt = async (
  sourceUrl: string,
): Promise<ImageBitmap> => {
  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  const contentType = response.headers.get("content-type")!;
  const isPng = contentType.includes("png");
  const strippedBuffer =
    isPng ? stripIccProfilePng(buffer) : stripIccProfileWebp(buffer);
  return await createImageBitmap(
    new Blob([strippedBuffer], { type: isPng ? "image/png" : "image/webp" }),
    { premultiplyAlpha: "premultiply", colorSpaceConversion: "none" },
  );
};

type LoadedArt = {
  sourceUrl: string;
  art: Promise<ImageBitmap>;
};

/**
 * Loads and decodes spritesheet art once for everything that needs it,
 * holds only one and replaces when another is asked for
 */
class SpritesheetArtLoader {
  #loadedArt: LoadedArt | undefined = undefined;

  /**
   * the art at this url, decoded - shared with whatever else asked for it
   */
  load(sourceUrl: string): Promise<ImageBitmap> {
    if (this.#loadedArt?.sourceUrl === sourceUrl) {
      return this.#loadedArt.art;
    }
    const art = fetchAndPreprocessArt(sourceUrl);
    const latest: LoadedArt = { sourceUrl, art };
    this.#loadedArt = latest;
    art.catch(() => {
      // a failed load is not kept, so asking again retries it
      if (this.#loadedArt === latest) {
        this.#loadedArt = undefined;
      }
    });
    return art;
  }
}

/**
 * the game's one loader of spritesheet art
 */
export const spritesheetArtLoader = new SpritesheetArtLoader();
