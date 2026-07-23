import { type Spritesheet } from "pixi.js";

import { type PaletteSwopSpec } from "../../game/render/filters/PaletteSwapFilter";
import { type AppSpriteFrame } from "./spritesheetData/AppSpriteFrame";
import {
  type BaseTextureId,
  type makeBaseSpritesheetData,
  type makeSpritesheetData,
  type SpritesheetDataFrames,
} from "./spritesheetData/makeSpritesheetData";
import { type SpritesheetMetadata } from "./spritesheetData/spritesheetMetaData";
import { type LoadableSpriteOption } from "./Spritesheets";

/**
 * the animations each builder writes, taken from the builders themselves so
 * every id the engine hard-codes (`lightBeam.x`, `conveyor.x`) stays known to
 * exist. Frames are the looser `Record`, since the atlas bake re-points them
 * at packed strip rects
 */
type BaseAnimations = ReturnType<typeof makeBaseSpritesheetData>["animations"];
type AnimationsWithVariants = ReturnType<
  typeof makeSpritesheetData
>["animations"];

/** sheet data over only the ids drawn as pixels in the source image */
export type AppSpritesheetData = {
  frames: Record<BaseTextureId, { frame: AppSpriteFrame }>;
  animations: BaseAnimations;
  meta: { scale: 1 };
};

/**
 * sheet data additionally carrying every variant-suffixed id
 * (`turtle.towards.doughnutted`, `door.frame.generic.x.near.hue=cyan`, …):
 * re-pointed at packed strip rects where the sheet bakes that variant,
 * aliases of the base rects otherwise
 */
export type AppSpritesheetDataWithVariants = {
  frames: SpritesheetDataFrames;
  animations: AnimationsWithVariants;
  meta: { scale: 1 };
};

declare const variantsBaked: unique symbol;

/**
 * a game spritesheet. Every sheet's data structurally lists all texture ids
 * (variant-suffixed ids alias their base rects where not baked), so this is
 * the type for consumers sampling base ids only - eg the pristine original,
 * whose variant ids are all aliases
 */
export type AppSpritesheet = Spritesheet<AppSpritesheetDataWithVariants> & {
  spriteOption: LoadableSpriteOption;
  ambient?: PaletteSwopSpec[];
  spritesheetMeta: SpritesheetMetadata;
};

/**
 * a sheet whose variant-suffixed ids resolve to genuinely re-baked pixels
 * (or deliberate aliases where the sheet/mode has no such recolour) - what
 * all in-room rendering samples. Branded: only the variant-baking builders
 * produce it, so a base-only sheet cannot be passed where variant ids will
 * be sampled
 */
export type AppSpritesheetWithVariants = AppSpritesheet & {
  [variantsBaked]: true;
};

/**
 * brand a sheet whose build has just resolved every variant id (by baking or
 * deliberate aliasing) as sampling-safe for variant-suffixed ids
 */
export const withVariantsBaked = (
  sheet: AppSpritesheet,
): AppSpritesheetWithVariants => sheet as AppSpritesheetWithVariants;
