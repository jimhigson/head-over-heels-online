import type { Renderer } from "pixi.js";

import { RenderTexture, Sprite, Spritesheet, Texture } from "pixi.js";

import type { TextureId } from "./spritesheetData/spriteSheetData";

import spritesheetUrl from "../../../gfx/sprites.png";
import { PreprocessShadowTexturesFilter } from "../../game/render/filters/PreprocessShadowTexturesFilter";
import { stripIccProfile } from "../../utils/png/stripIccProfile";
import { black, renderMaskTexture, white } from "./renderMaskTexture";
import { spritesheetData } from "./spritesheetData/spriteSheetData";

export type AppSpritesheet = Spritesheet<typeof spritesheetData>;

let loaded: AppSpritesheet | undefined = undefined;
let texture: Texture | undefined = undefined;

export const loadSpritesheetAssets = async () => {
  if (loaded !== undefined) {
    return loaded;
  }

  try {
    // strip ICC profile from PNG to preserve raw RGB values for shader colour matching
    // - this is more reliable than colorSpaceConversion: "none" across browsers/platforms, especially when
    //   running playwright on github ci/cd Linux+Safari
    // - the ICC profile in the PNG is still used when loaded via CSS
    // - the final image shown on the canvas will be in p3 to make it more vibrant, but all the calculations
    //   are done in raw sRGB/hex space
    const response = await fetch(spritesheetUrl);
    const pngBuffer = await response.arrayBuffer();
    const strippedBuffer = stripIccProfile(pngBuffer);
    const blob = new Blob([strippedBuffer], { type: "image/png" });
    const bitmap = await createImageBitmap(blob);
    texture = Texture.from(bitmap);
  } catch (_e) {
    console.warn("did not load textures - hopefully we are running under node");
    // allows the game to run in vitest without using @pixi/node to load the
    // sprites in node. This could be dangerous in an actual browser where
    // we want an error if the sprites don't load
    texture = Texture.EMPTY;
  }
};

export const initOriginalSpritesheet = (pixiRenderer: Renderer): void => {
  if (texture === undefined) {
    throw new Error("cannot init original spritesheet before texture load");
  }

  const shadowSpritesMask = renderMaskTexture(pixiRenderer, {
    rects: {
      textureIds: (candidate: TextureId) => candidate.startsWith("shadow."),
      color: white,
    },
    clearColour: black,
  });

  const preprocessShadowTexturesFilter = new PreprocessShadowTexturesFilter(
    shadowSpritesMask,
  );

  const sprite = new Sprite(texture);
  sprite.filters = preprocessShadowTexturesFilter;

  const processedTexture = RenderTexture.create({
    width: texture.width,
    height: texture.height,
  });

  pixiRenderer.render({
    container: sprite,
    target: processedTexture,
  });

  const spriteSheet = new Spritesheet(processedTexture, spritesheetData);
  spriteSheet.parseSync();
  spriteSheet.textureSource.scaleMode = "nearest";
  loaded = spriteSheet;

  // Promise.all([
  //   textureToConsoleArgs(texture.source, pixiRenderer, 1024),
  //   textureToConsoleArgs(shadowSpritesMask.source, pixiRenderer, 1024),
  //   textureToConsoleArgs(processedTexture.source, pixiRenderer, 1024),
  // ]).then(([c1, c2, c3]) => {
  //   console.group("initOriginalSpritesheet");
  //   console.log(...c1);
  //   console.log(...c2);
  //   console.log(...c3);
  //   console.groupEnd();
  // });

  sprite.destroy();
  shadowSpritesMask.destroy(true);
};

/**
 * NOTE: this is only safe to call after the spritesheet has had load() called
 * and it resolved! - this is a sync export since we need to get the spritesheet
 * inside the update/render loop synchronously many times
 */
export const originalSpriteSheet = (): AppSpritesheet => {
  if (loaded === undefined) {
    throw new Error(
      `spritesheet not loaded - only call this from inside code 
      (like in a render loop) that is protected and only executed once 
      loading has happened`,
    );
  }
  return loaded;
};

export const baseSpritesheetTexture = (): Texture => {
  if (texture === undefined) {
    throw new Error(
      `spritesheet not loaded - only call this from inside code 
      (like in a render loop) that is protected and only executed once 
      loading has happened`,
    );
  }
  return texture;
};
