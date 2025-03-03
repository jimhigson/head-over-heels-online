import { Assets, Spritesheet, Texture } from "pixi.js";
import spritesheetUrl from "../assets/sprites.png";

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

// must be called before spritesheet is used. Safari doesn't like top-level
// await so can't do that here
export const load = async () => {
  await spriteSheet.parse();
  spriteSheet.textureSource.scaleMode = "nearest";
  return spriteSheet;
};
