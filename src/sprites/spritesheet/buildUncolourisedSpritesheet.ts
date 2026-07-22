import { Color, type Renderer, type Texture } from "pixi.js";

import { resolveSwops } from "../../utils/palette/palette";
import { paletteBlockstack } from "../palette/spritesheetPalette";
import {
  type AppSpritesheet,
  type AppSpritesheetWithVariants,
  withVariantsBaked,
} from "./AppSpritesheet";
import { type TextureId } from "./spritesheetData/makeSpritesheetData";
import { spritesheetMetas } from "./spritesheetData/spritesheetMetaData";
import { createSwoppedSpritesheet } from "./spritesheetPaletteSwop";

export const buildUncolourisedSpritesheet = (
  pixiRenderer: Renderer,
  baseTexture: Texture,
  originalSpritesheet: AppSpritesheet,
): AppSpritesheetWithVariants =>
  // in ZX mode the variant states are invisible by design: every variant id
  // deliberately aliases its base rect, which counts as resolved
  withVariantsBaked(
    createSwoppedSpritesheet(
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
        // shadowMask art is raw shapes, hardened per-channel; shadow art comes
        // from the original sheet with its strength already encoded in alpha,
        // so it binarises to the ZX look by snapping any shadow to full ink:
        hardenAlphaTextureIds: (id: TextureId) => id.startsWith("shadowMask."),
        binariseAlphaTextureIds: (id: TextureId) => id.startsWith("shadow."),
      },
      baseTexture,
      originalSpritesheet,
    ),
  );
