import sharp from "sharp";

import { type DecodedImage } from "../geometry/glyphBitmap";

export const decodeSpritesheet = async (
  path: string,
): Promise<DecodedImage> => {
  const { data, info } = await sharp(path)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return {
    width: info.width,
    height: info.height,
    data: new Uint8ClampedArray(data),
  };
};
