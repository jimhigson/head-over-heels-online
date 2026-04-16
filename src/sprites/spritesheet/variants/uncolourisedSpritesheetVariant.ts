import { Color, type Renderer } from "pixi.js";

import type { AppSpritesheet } from "../loadedSpriteSheet";

import { resolveSwops } from "../../../utils/palette/palette";
import { paletteBlockstack } from "../../palette/spritesheetPalette";
import { spritesheetMetaForOption } from "../spritesheetData/spritesheetMetaData";
import { createSpritesheetVariant } from "../spritesheetPaletteSwop";

let swopped: AppSpritesheet | undefined = undefined;

export const destroyUncolourisedSpritesheet = (): void => {
  if (swopped !== undefined) {
    swopped.textureSource.destroy();
    swopped.destroy(true);
    swopped = undefined;
  }
};

export const createUncolourisedSpritesheet = (pixiRenderer: Renderer): void => {
  destroyUncolourisedSpritesheet();

  swopped = createSpritesheetVariant(
    {
      pixiRenderer,
      spriteOption: "BlockStack",
      spritesheetMetaData: spritesheetMetaForOption("BlockStack"),
    },
    {
      ambient: [
        {
          lutType: "voronoi",
          swops: resolveSwops(paletteBlockstack, {
            pureBlack: new Color(0x000000),
            shadow: new Color(0xffffff),
            redShadow: new Color(0xffffff),
          }),
        },
      ],
    },
  );
};

export const uncolourisedSpritesheetVariant = (): AppSpritesheet => {
  if (swopped === undefined) {
    throw new Error(
      `swopped spritesheet undefined - should only be called when we know for sure it is available`,
    );
  }

  return swopped;
};
