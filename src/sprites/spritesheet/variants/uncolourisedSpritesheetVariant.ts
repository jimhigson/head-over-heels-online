import { Color, type Renderer } from "pixi.js";

import { resolveSwops } from "../../../utils/palette/palette";
import { paletteBlockstack } from "../../palette/spritesheetPalette";
import { type AppSpritesheet } from "../loadedSpriteSheet";
import { type TextureId } from "../spritesheetData/makeSpritesheetData";
import { spritesheetMetas } from "../spritesheetData/spritesheetMetaData";
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
      spritesheetMetaData: spritesheetMetas.BlockStack,
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
      hardenAlphaTextureIds: (id: TextureId) =>
        id.startsWith("shadow.") || id.startsWith("shadowMask."),
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
