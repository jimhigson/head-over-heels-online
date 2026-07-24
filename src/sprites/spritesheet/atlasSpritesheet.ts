import { type RenderTexture, type Texture } from "pixi.js";

import { objectEntriesIter } from "../../utils/entries";
import {
  type AppSpritesheet,
  type AppSpritesheetWithVariants,
  withVariantsBaked,
} from "./AppSpritesheet";
import { bakeableVariantSuffixes, bakeVariantStrip } from "./bakeVariantStrip";
import { reuseOrCreateSheetTarget } from "./reuseOrCreateSheetTarget";
import { roomSpritesheetTextureSwops } from "./roomSpritesheetTextureSwops";
import { type AppSpriteFrame } from "./spritesheetData/AppSpriteFrame";
import { spritesheetSize } from "./spritesheetData/makeBaseSpritesheetData";
import {
  makeSpritesheetData,
  type SpritesheetDataFrames,
} from "./spritesheetData/makeSpritesheetData";
import { packVariantFrames } from "./spritesheetData/packVariantFrames";
import { spritesheetMetas } from "./spritesheetData/spritesheetMetaData";
import {
  isVariantId,
  type VariantTextureId,
} from "./spritesheetData/variantSpritesheetData";
import {
  createSwoppedSpritesheet,
  type SpritesheetTextureSwops,
} from "./spritesheetPaletteSwop";
import { type VariantBuildContext } from "./VariantBuildContext";

type FrameEntry = { frame: AppSpriteFrame };

/**
 * the current-room sheet is an atlas: the base 1024² layout baked with the
 * room's swops, and below it the shelf-packed strip of variant frames baked
 * with each variant's swops - so the suffixed variant ids sample re-processed
 * pixels from the same texture. Variants this sheet declares no swops for
 * keep their alias entries (sampling the base rects).
 */
export const buildAtlasSpritesheet = (
  context: VariantBuildContext,
  baseTexture: Texture,
  originalSpritesheet: AppSpritesheet,
  /** the previous room sheet's texture, re-baked into where its size fits */
  previousTarget: RenderTexture | undefined,
): { sheet: AppSpritesheetWithVariants; target: RenderTexture } => {
  const { roomScenery, roomColor, spriteOption } = context;

  const spritesheetTextureSwops: SpritesheetTextureSwops =
    roomSpritesheetTextureSwops(roomScenery, roomColor, spriteOption);

  const data = makeSpritesheetData(spritesheetMetas[spriteOption]);

  const variantFrames: Partial<Record<VariantTextureId, FrameEntry>> = {};
  for (const [id, entry] of objectEntriesIter(data.frames)) {
    if (isVariantId(id)) {
      variantFrames[id] = entry;
    }
  }

  const pack = packVariantFrames(
    variantFrames,
    spritesheetSize.w,
    spritesheetSize.h,
  );
  const bakeable = bakeableVariantSuffixes(context.spritesheetMetaData);

  // re-point the baked variants' frame entries at their strip rects (cloned,
  // since the alias entries are shared by reference with their base frames).
  // The annotation widens from the literal frame coordinates to plain rects:
  const { frames }: { frames: SpritesheetDataFrames } = data;
  for (const cell of pack.cells) {
    if (!bakeable.has(cell.suffix)) {
      continue;
    }
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
    context,
    spritesheetTextureSwops,
    baseTexture,
    originalSpritesheet,
    { data, target },
  );

  bakeVariantStrip(context, baseTexture, target, pack.cells);

  return { sheet: withVariantsBaked(sheet), target };
};
