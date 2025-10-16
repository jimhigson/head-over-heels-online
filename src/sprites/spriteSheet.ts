import { Spritesheet, Texture } from "pixi.js";

import spritesheetUrl from "../../gfx/sprites.png";
import { detectDeviceType } from "../utils/detectEnv/detectDeviceType";
import { spritesheetData } from "./spriteSheetData";

type AppSpritesheet = Spritesheet<typeof spritesheetData>;

let loaded: AppSpritesheet | undefined = undefined;

export const loadSpritesheet = async () => {
  if (loaded !== undefined) {
    return loaded;
  }

  let spritesTexture: Texture;
  try {
    // Assets.load is the simplest way, but unfortunately Tauri's createImageBitmap()
    // implementation is buggy and chokes on many valid PNG files
    // spritesTexture = await Assets.load<Texture>(spritesheetUrl);
    const img = new Image();
    img.src = spritesheetUrl;
    await img.decode();
    spritesTexture = Texture.from(img);
  } catch (e) {
    if (detectDeviceType() === "server") {
      // allows the game to run in vitest without using @pixi/node to load the
      // sprites in node. This could be dangerous in an actual browser where
      // we want an error if the sprites don't load
      spritesTexture = Texture.EMPTY;
    } else {
      // analyse what exactly happened. This can fail to decode rather than fail to download
      // so check if the file actually exists by trying to download it:
      const fetchResponse = await fetch(spritesheetUrl);

      throw new Error(
        `failed to load spritesheet from ${spritesheetUrl}, status with fetch: ${fetchResponse.status}`,
        {
          cause: e,
        },
      );
    }
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
