import type { Renderer } from "pixi.js";

import { RenderTexture, Sprite, Spritesheet, Texture } from "pixi.js";

import type { PaletteSwopSpec } from "../../game/render/filters/PaletteSwapFilter";
import type { SpriteOption } from "../../store/slices/userSettings/userSettingsSlice";
import type { TextureId } from "./spritesheetData/makeSpritesheetData";
import type { SpritesheetMetadata } from "./spritesheetData/spritesheetMetaData";

import blockStackSpritesheetUrl from "../../../gfx/sprites.webp";
import toppySpritesheetUrl from "../../../gfx/spritesToppy.webp";
import { PreprocessShadowTexturesFilter } from "../../game/render/filters/PreprocessShadowTexturesFilter";
import { selectSpritesheetOverrideBlobUrl } from "../../store/slices/spritesheetOverrideSlice";
import { store } from "../../store/store";
import { detectDeviceType } from "../../utils/detectEnv/detectDeviceType";
import { stripIccProfileWebp } from "../../utils/image/stripIccProfileWebp";
import { black, renderMaskTexture, white } from "./renderMaskTexture";
import { makeSpritesheetData } from "./spritesheetData/makeSpritesheetData";
import { spritesheetMetas } from "./spritesheetData/spritesheetMetaData";

export type AppSpritesheetData = ReturnType<typeof makeSpritesheetData>;
export type AppSpritesheet = Spritesheet<AppSpritesheetData> & {
  spriteOption: LoadableSpriteOption;
  ambient?: PaletteSwopSpec[];
  spritesheetMeta: SpritesheetMetadata;
};

export type LoadableSpriteOption = SpriteOption["name"];

let loadedFor: LoadableSpriteOption | undefined;
let loadedTexture: Texture | undefined;
let currentSpritesheet: AppSpritesheet | undefined;

/**
 * fetch the spritesheet image and store the base Texture,
 * ready to be processed into a Spritesheet by initOriginalSpritesheet()
 */
export const loadSpritesheetAssets = async (
  spriteOption: LoadableSpriteOption,
) => {
  if (loadedFor === spriteOption) {
    return;
  }

  const overrideBlobUrl = selectSpritesheetOverrideBlobUrl(
    store.getState(),
    spriteOption,
  );
  const url =
    overrideBlobUrl ??
    (spriteOption === "BlockStack" ?
      blockStackSpritesheetUrl
    : toppySpritesheetUrl);
  let strippedImageObjectUrl: string | undefined = undefined;

  try {
    // strip ICC profile to preserve raw RGB values for shader colour matching
    // - this is more reliable than colorSpaceConversion: "none" across browsers/platforms, especially when
    //   running playwright on github ci/cd Linux+Safari
    // - the ICC profile is still used when loaded via CSS (from the original file)
    // - the final image shown on the canvas will be in p3 to make it more vibrant, but all the calculations
    //   are done in raw sRGB/hex space
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    const strippedBuffer = stripIccProfileWebp(buffer);
    const blob = new Blob([strippedBuffer], { type: "image/webp" });

    // unfortunately Tauri's createImageBitmap() implementation is buggy and chokes on many valid image files
    // - this is used internally in Pixi's Assets.load()
    // So use an HTML img element to load the image (more robust) and don't refactor this to either of:
    //  * createImageBitmap
    //  * Assets.load
    // until Tauri's implementation is fixed
    strippedImageObjectUrl = URL.createObjectURL(blob);
    const img = new Image();
    img.src = strippedImageObjectUrl;
    await img.decode();
    loadedTexture = Texture.from(img);
    loadedFor = spriteOption;
  } catch (e) {
    // allows the game to run in vitest without using @pixi/node to load the
    // sprites in node. This could be dangerous in an actual browser where
    // we want an error if the sprites don't load
    if (detectDeviceType() === "server") {
      console.warn(
        "did not load textures - we are running under node so will use Texture.EMPTY",
      );
      loadedTexture = Texture.EMPTY;
      loadedFor = spriteOption;
    } else {
      throw new Error(`failed to load spritesheet from ${url}`, {
        cause: e,
      });
    }
  } finally {
    if (strippedImageObjectUrl !== undefined) {
      URL.revokeObjectURL(strippedImageObjectUrl);
    }
  }
};

export const isTextureLoaded = (spriteOption: LoadableSpriteOption): boolean =>
  loadedFor === spriteOption;

export const initOriginalSpritesheet = (pixiRenderer: Renderer): void => {
  if (loadedTexture === undefined || loadedFor === undefined) {
    throw new Error(`cannot init spritesheet before texture load`);
  }

  if (currentSpritesheet?.spriteOption === loadedFor) {
    // already have the correct original spritesheet loaded, nothing to do
    return;
  }

  const texture = loadedTexture;
  const spritesheetMeta = spritesheetMetas[loadedFor];
  const spriteSheetData = makeSpritesheetData(spritesheetMeta);

  const shadowSpritesMask = renderMaskTexture(pixiRenderer, {
    rects: {
      textureIds: (candidate: TextureId) => candidate.startsWith("shadow."),
      color: white,
      spritesheetDataFrames: spriteSheetData.frames,
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

  const spriteSheet = new Spritesheet(
    processedTexture,
    spriteSheetData,
  ) as AppSpritesheet;
  spriteSheet.parseSync();
  spriteSheet.textureSource.scaleMode = "nearest";
  spriteSheet.spriteOption = loadedFor;
  spriteSheet.spritesheetMeta = spritesheetMeta;
  currentSpritesheet = spriteSheet;

  sprite.destroy();
  shadowSpritesMask.destroy(true);
};

/**
 * returns the current base spritesheet, as set by the most recent initSpritesheet() call.
 * managed by tickSpritesheetVariants like all other variant spritesheets
 */
export const originalSpriteSheet = (): AppSpritesheet => {
  if (currentSpritesheet === undefined) {
    throw new Error(
      `spritesheet not loaded - only call this from inside code
      (like in a render loop) that is protected and only executed once
      loading has happened`,
    );
  }
  return currentSpritesheet;
};

export const baseSpritesheetTexture = (): Texture => {
  if (loadedTexture === undefined) {
    throw new Error(
      `spritesheet texture not loaded - only call this from inside code
      (like in a render loop) that is protected and only executed once
      loading has happened`,
    );
  }
  return loadedTexture;
};
