import { type Renderer } from "pixi.js";

import { type ZxSpectrumRoomColour } from "../../originalGame";
import { type SceneryName } from "../planets";
import { type SpritesheetMetadata } from "./spritesheetData/spritesheetMetaData";
import { type LoadableSpriteOption } from "./Spritesheets";

export type VariantBuildContext<PaletteColourName extends string = string> = {
  pixiRenderer: Renderer;
  roomScenery: SceneryName;
  roomColor: ZxSpectrumRoomColour;
  spriteOption: LoadableSpriteOption;
  spritesheetMetaData: SpritesheetMetadata<PaletteColourName>;
  /** true when baking the ZX/uncolourised sheet (tinted at render time) */
  uncolourised: boolean;
};
