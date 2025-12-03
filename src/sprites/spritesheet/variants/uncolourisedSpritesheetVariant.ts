import { Color, type Renderer } from "pixi.js";

import type { AppSpritesheet } from "../loadedSpriteSheet";

import { createSpritesheetVariant } from "../spritesheetPaletteSwop";

let swopped: AppSpritesheet | undefined = undefined;

export const createUncolourisedSpritesheet = (pixiRenderer: Renderer): void => {
  swopped = createSpritesheetVariant(pixiRenderer, {
    ambient: [
      {
        lutType: "voronoi",
        paletteSwaps: {
          pureBlack: new Color(0x000000),
          shadow: new Color(0xffffff),
          redShadow: new Color(0xffffff),
        },
      },
    ],
  });
};

export const uncolourisedSpritesheetVariant = (): AppSpritesheet => {
  if (swopped === undefined) {
    throw new Error(
      `swopped spritesheet undefined - should only be called when we know for sure it is available`,
    );
  }

  return swopped;
};
