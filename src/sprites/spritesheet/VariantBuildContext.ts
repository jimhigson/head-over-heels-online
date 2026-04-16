import type { Renderer } from "pixi.js";

import type { ZxSpectrumRoomColour } from "../../originalGame";
import type { SceneryName } from "../planets";
import type { LoadableSpriteOption } from "./loadedSpriteSheet";
import type { SpritesheetMetadata } from "./spritesheetData/spritesheetMetaData";

export type VariantBuildContext<PaletteColourName extends string = string> = {
  pixiRenderer: Renderer;
  roomScenery: SceneryName;
  roomColor: ZxSpectrumRoomColour;
  spriteOption: LoadableSpriteOption;
  spritesheetMetaData: SpritesheetMetadata<PaletteColourName>;
};
