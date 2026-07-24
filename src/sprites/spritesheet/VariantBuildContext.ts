import { type Renderer } from "pixi.js";

import { type ZxSpectrumRoomColour } from "../../originalGame";
import { type SpriteOption } from "../../store/slices/userSettings/userSettingsSlice";
import { type SceneryName } from "../planets";
import { type SpritesheetMetadata } from "./spritesheetData/spritesheetMetaData";

export type VariantBuildContext<PaletteColourName extends string = string> = {
  pixiRenderer: Renderer;
  roomScenery: SceneryName;
  roomColor: ZxSpectrumRoomColour;
  /**
   * the sheet name plus its uncolourised flag as one unit - uncolourised sheets
   * are tinted at render time, so they bake differently
   */
  spriteOption: SpriteOption;
  spritesheetMetaData: SpritesheetMetadata<PaletteColourName>;
};
