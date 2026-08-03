import { useEffect, useState } from "preact/hooks";

import spritesheetUrl from "../../../gfx/sprites.borders.png?url";
import { type DecodedImage } from "../geometry/glyphBitmap";

/**
 * the unmasked reference sheet, decoded through a canvas - the browser's
 * equivalent of the sharp decode the build script does, giving the geometry
 * the identical rgba it works from there
 */
export const useSpritesheet = (): DecodedImage | undefined => {
  const [image, setImage] = useState<DecodedImage | undefined>(undefined);

  useEffect(() => {
    let live = true;
    const load = async () => {
      const bitmap = await createImageBitmap(
        await (await fetch(spritesheetUrl)).blob(),
      );
      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
      const context = canvas.getContext("2d");
      if (context === null) {
        throw new Error("no 2d context to decode the spritesheet with");
      }
      context.drawImage(bitmap, 0, 0);
      const { data, width, height } = context.getImageData(
        0,
        0,
        bitmap.width,
        bitmap.height,
      );
      if (live) {
        setImage({ width, height, data });
      }
    };
    load();
    return () => {
      live = false;
    };
  }, []);

  return image;
};
