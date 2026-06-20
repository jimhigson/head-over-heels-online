import { useEffect, useState } from "preact/hooks";

import {
  type LoadableSpriteOption,
  SpritesheetVariants,
} from "./SpritesheetVariants";

/**
 * create a SpritesheetVariants that loads a single fixed variant, ignoring the
 * user's sprite-option preference. Used by the level editor, which only renders
 * the BlockStack sprites
 */
export const useFixedSpritesheetVariants = (
  spriteOption: LoadableSpriteOption,
): SpritesheetVariants => {
  const [spritesheetVariants] = useState<SpritesheetVariants>(() => {
    const createdSsv = new SpritesheetVariants();
    createdSsv.loadImage(spriteOption);
    return createdSsv;
  });

  useEffect(() => {
    return () => {
      spritesheetVariants.destroy();
    };
  }, [spritesheetVariants]);

  return spritesheetVariants;
};
