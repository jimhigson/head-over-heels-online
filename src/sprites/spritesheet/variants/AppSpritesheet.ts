import { type Spritesheet } from "pixi.js";

import { type PaletteSwopSpec } from "../../../game/render/filters/PaletteSwapFilter";
import { type makeSpritesheetData } from "../spritesheetData/makeSpritesheetData";
import { type SpritesheetMetadata } from "../spritesheetData/spritesheetMetaData";
import { type LoadableSpriteOption } from "./SpritesheetVariants";

export type AppSpritesheetData = ReturnType<typeof makeSpritesheetData>;

export type AppSpritesheet = Spritesheet<AppSpritesheetData> & {
  spriteOption: LoadableSpriteOption;
  ambient?: PaletteSwopSpec[];
  spritesheetMeta: SpritesheetMetadata;
};
