import { Assets, Spritesheet, Texture } from "pixi.js";
import spritesheetUrl from "../../gfx/sprites.png";

import { spritesheetData } from "./spriteSheetData";

let spritesTexture: Texture;
try {
  spritesTexture = await Assets.load<Texture>(spritesheetUrl);
} catch (_e) {
  // allows the game to run in vitest without using @pixi/node to load the
  // sprites in node. This could be dangerous in an actual browser where
  // we want an error if the sprites don't load
  spritesTexture = Texture.EMPTY;
}

export const spriteSheet = new Spritesheet(spritesTexture, spritesheetData);

await spriteSheet.parse();
spriteSheet.textureSource.scaleMode = "nearest";
