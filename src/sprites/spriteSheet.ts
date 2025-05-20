import { Assets, Spritesheet, Texture } from "pixi.js";
import spritesheetUrl from "../../gfx/sprites.png";

import { spritesheetData } from "./spriteSheetData";

type AppSpritesheet = Spritesheet<typeof spritesheetData>;

let loaded: AppSpritesheet | undefined = undefined;

export const loadSpritesheet = async () => {
  if (loaded !== undefined) {
    return loaded;
  }

  let spritesTexture: Texture;
  try {
    spritesTexture = await Assets.load<Texture>(spritesheetUrl);
  } catch (_e) {
    console.warn(
      "did not load textures - hopefully this is running on a server!",
    );
    // allows the game to run in vitest without using @pixi/node to load the
    // sprites in node. This could be dangerous in an actual browser where
    // we want an error if the sprites don't load
    spritesTexture = Texture.EMPTY;
  }

  const spriteSheet = new Spritesheet(spritesTexture, spritesheetData);

  await spriteSheet.parse();
  spriteSheet.textureSource.scaleMode = "nearest";
  loaded = spriteSheet;
  return spriteSheet;
};

/**
 * NOTE: this is only safe to call after the spritesheet has had load() called
 * and it resolved! - this is a sync export since we need to get the spritesheet
 * inside the update/render loop synchronously many times
 */
export const loadedSpriteSheet = (): AppSpritesheet => {
  if (loaded === undefined) {
    throw new Error(
      `spritesheet not loaded - only call this from inside code 
      (like in a render loop) that is protected and only executed once 
      loading has happened`,
    );
  }
  return loaded;
};
