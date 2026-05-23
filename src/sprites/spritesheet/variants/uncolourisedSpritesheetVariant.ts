import { Color, type Renderer, type Texture } from "pixi.js";

import { resolveSwops } from "../../../utils/palette/palette";
import { paletteBlockstack } from "../../palette/spritesheetPalette";
import { type TextureId } from "../spritesheetData/makeSpritesheetData";
import { spritesheetMetas } from "../spritesheetData/spritesheetMetaData";
import { createSpritesheetVariant } from "../spritesheetPaletteSwop";
import { type AppSpritesheet } from "./SpritesheetVariants";

export const buildUncolourisedSpritesheet = (
  pixiRenderer: Renderer,
  baseTexture: Texture,
  originalSpritesheet: AppSpritesheet,
): AppSpritesheet =>
  createSpritesheetVariant(
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
            pureBlack: new Color(0x00_00_00),
            shadow: new Color(0xff_ff_ff),
            redShadow: new Color(0xff_ff_ff),
          }),
        },
      ],
      hardenAlphaTextureIds: (id: TextureId) =>
        id.startsWith("shadow.") || id.startsWith("shadowMask."),
    },
    baseTexture,
    originalSpritesheet,
  );
