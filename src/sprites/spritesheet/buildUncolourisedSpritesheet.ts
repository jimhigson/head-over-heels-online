import {
  Color,
  type Renderer,
  type RenderTexture,
  type Texture,
} from "pixi.js";

import { speccySpritesheetMeta } from "../../../gfx/spritesheetMeta/speccySpritesheetMeta";
import { type ZxSpectrumRoomColour } from "../../originalGame";
import { objectEntriesIter } from "../../utils/entries";
import { resolveSwops } from "../../utils/palette/palette";
import { paletteBlockstack } from "../palette/spritesheetPalette";
import { type SceneryName } from "../planets";
import {
  type AppSpritesheet,
  type AppSpritesheetWithVariants,
  withVariantsBaked,
} from "./AppSpritesheet";
import { bakeVariantStrip } from "./bakeVariantStrip";
import { reuseOrCreateSheetTarget } from "./reuseOrCreateSheetTarget";
import { type AppSpriteFrame } from "./spritesheetData/AppSpriteFrame";
import { spritesheetSize } from "./spritesheetData/makeBaseSpritesheetData";
import {
  makeSpritesheetData,
  type SpritesheetDataFrames,
  type TextureId,
} from "./spritesheetData/makeSpritesheetData";
import { packVariantFrames } from "./spritesheetData/packVariantFrames";
import { spritesheetMetas } from "./spritesheetData/spritesheetMetaData";
import {
  arcadeButtonSuffixes,
  isVariantId,
  variantIdSuffix,
  type VariantTextureId,
} from "./spritesheetData/variantSpritesheetData";
import { createSwoppedSpritesheet } from "./spritesheetPaletteSwop";

type FrameEntry = { frame: AppSpriteFrame };

const isArcadeButtonVariantId = (id: VariantTextureId): boolean =>
  (arcadeButtonSuffixes as readonly string[]).includes(variantIdSuffix(id));

export const buildUncolourisedSpritesheet = (
  pixiRenderer: Renderer,
  baseTexture: Texture,
  originalSpritesheet: AppSpritesheet,
  roomScenery: SceneryName,
  roomColor: ZxSpectrumRoomColour,
  /** the previous room sheet's texture, re-baked into where its size fits */
  previousTarget: RenderTexture | undefined,
): { sheet: AppSpritesheetWithVariants; target: RenderTexture } => {
  const data = makeSpritesheetData(spritesheetMetas.BlockStack);

  // in ZX mode every white sprite is coloured at render time by a per-room
  // tint, so the variant states can stay invisible - aliased to their base
  // rect. The arcade buttons are the exception: they are HUD, not in-room, so
  // the tint never reaches them and their action colour must be baked in - at
  // the ZX hues declared on the speccy meta, exactly as colourised mode bakes
  // them at BlockStack hues.
  const buttonFrames: Partial<Record<VariantTextureId, FrameEntry>> = {};
  for (const [id, entry] of objectEntriesIter(data.frames)) {
    if (isVariantId(id) && isArcadeButtonVariantId(id)) {
      buttonFrames[id] = entry;
    }
  }

  const pack = packVariantFrames(
    buttonFrames,
    spritesheetSize.w,
    spritesheetSize.h,
  );

  // re-point the baked button ids at their strip rects (cloned, since the alias
  // entries are shared by reference with their base frames):
  const { frames }: { frames: SpritesheetDataFrames } = data;
  for (const cell of pack.cells) {
    for (const id of cell.ids) {
      const existing = frames[id];
      frames[id] = {
        ...existing,
        frame: { ...existing.frame, x: cell.dest.x, y: cell.dest.y },
      };
    }
  }

  const target = reuseOrCreateSheetTarget(previousTarget, pack.stripHeight);

  const sheet = createSwoppedSpritesheet(
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
    { data, target },
  );

  // the button colour is a function of action and the speccy meta only (its
  // palette has no dimmed variant), so this bake is room-independent:
  bakeVariantStrip(
    {
      pixiRenderer,
      roomScenery,
      roomColor,
      spriteOption: "BlockStack",
      spritesheetMetaData: speccySpritesheetMeta,
    },
    baseTexture,
    target,
    pack.cells,
  );

  return { sheet: withVariantsBaked(sheet), target };
};
