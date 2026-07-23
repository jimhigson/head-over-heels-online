import {
  type Renderer,
  RenderTexture,
  Sprite,
  Spritesheet,
  Texture,
} from "pixi.js";

import blockStackSpritesheetUrl from "../../../gfx/sprites.webp";
import debugSpritesheetUrl from "../../../gfx/spritesDebug.webp";
import toppySpritesheetUrl from "../../../gfx/spritesToppy.webp";
import { ShadowPreprocessFilter } from "../../game/render/filters/shadows/ShadowPreprocessFilter";
import { type ZxSpectrumRoomColour } from "../../originalGame";
import { selectSpritesheetOverrideBlobUrl } from "../../store/slices/spritesheetOverrideSlice";
import { type SpriteOption } from "../../store/slices/userSettings/userSettingsSlice";
import { store } from "../../store/store";
import { detectDeviceType } from "../../utils/detectEnv/detectDeviceType";
import { stripIccProfilePng } from "../../utils/image/stripIccProfilePng";
import { stripIccProfileWebp } from "../../utils/image/stripIccProfileWebp";
import { type SceneryName } from "../planets";
import { applySpritesheetFlips } from "./applySpritesheetFlips";
import {
  type AppSpritesheet,
  type AppSpritesheetDataWithVariants,
  type AppSpritesheetWithVariants,
  withVariantsBaked,
} from "./AppSpritesheet";
import { buildAtlasSpritesheet } from "./atlasSpritesheet";
import { buildUncolourisedSpritesheet } from "./buildUncolourisedSpritesheet";
import { black, renderMaskTexture, white } from "./renderMaskTexture";
import {
  makeSpritesheetData,
  type TextureId,
} from "./spritesheetData/makeSpritesheetData";
import {
  type SpritesheetMetadata,
  spritesheetMetaForOption,
  spritesheetMetas,
} from "./spritesheetData/spritesheetMetaData";
import { type VariantBuildContext } from "./VariantBuildContext";

export type LoadableSpriteOption = SpriteOption["name"];

const destroySpritesheet = (
  sheet: AppSpritesheet | AppSpritesheetWithVariants | undefined,
) => {
  if (sheet !== undefined) {
    sheet.textureSource.destroy();
    sheet.destroy(true);
  }
};

export class Spritesheets {
  #loadImageAbortController: AbortController | undefined;
  #spriteOption: LoadableSpriteOption | undefined;
  /**
   * the pristine GPU source: the loaded image with the shadow preprocess baked
   * in, never room-swopped. Built by loadImage (the raw decoded texture is
   * discarded immediately after)
   */
  #originalSpritesheet: AppSpritesheetWithVariants | undefined;
  /**
   * the sheet all in-room rendering samples, rebuilt per room, built from #originalSpritesheet
   */
  #currentSpritesheet: AppSpritesheetWithVariants | undefined;

  isTextureLoaded(spriteOption: LoadableSpriteOption): boolean {
    return this.#spriteOption === spriteOption;
  }

  rebuild(
    pixiRenderer: Renderer,
    roomScenery: SceneryName,
    roomColor: ZxSpectrumRoomColour,
    spriteOption: SpriteOption,
  ): void {
    if (this.#originalSpritesheet?.spriteOption !== spriteOption.name) {
      throw new Error(
        `rebuild() requires loadImage() to have built the original sheet for "${spriteOption.name}" first`,
      );
    }

    const orig = this.#originalSpritesheet;
    // bakes sample the original sheet's pixels (a view over its source, so
    // destroying it after the bakes leaves the source untouched):
    const bt = new Texture({ source: orig.textureSource });

    destroySpritesheet(this.#currentSpritesheet);
    this.#currentSpritesheet = undefined;

    if (spriteOption.uncolourised) {
      this.#currentSpritesheet = buildUncolourisedSpritesheet(
        pixiRenderer,
        bt,
        orig,
      );
    } else {
      const context: VariantBuildContext = {
        pixiRenderer,
        roomScenery,
        roomColor,
        spriteOption: spriteOption.name,
        spritesheetMetaData: spritesheetMetaForOption(
          spriteOption,
        ) as SpritesheetMetadata,
      };

      this.#currentSpritesheet = buildAtlasSpritesheet(context, bt, orig);
    }

    bt.destroy();
  }

  get originalSpritesheet(): AppSpritesheetWithVariants {
    if (this.#originalSpritesheet === undefined) {
      throw new Error(
        "originalSpritesheet not available — loadImage() not yet completed",
      );
    }
    return this.#originalSpritesheet;
  }

  /**
   * the sheet shadow art samples: shadow.* cells are masked out of every room
   * swop and the atlas bakes from the original's (preprocessed) pixels, so
   * the current sheet's shadow cells are identical to the original's in both
   * modes
   */
  get shadowSpritesheet(): AppSpritesheetWithVariants {
    return this.spritesheetForCurrentRoom;
  }

  get spritesheetForCurrentRoom(): AppSpritesheetWithVariants {
    if (this.#currentSpritesheet === undefined) {
      throw new Error(
        "spritesheetForCurrentRoom not available — rebuild() not yet called",
      );
    }
    return this.#currentSpritesheet;
  }

  async loadImage(
    pixiRenderer: Renderer,
    spriteOption: LoadableSpriteOption,
  ): Promise<void> {
    if (this.#spriteOption === spriteOption) {
      return;
    }

    this.#loadImageAbortController?.abort();
    const abortController = new AbortController();
    this.#loadImageAbortController = abortController;
    const { signal } = abortController;

    const overrideBlobUrl =
      import.meta.env.VITE_APP === "editor" ?
        undefined
      : selectSpritesheetOverrideBlobUrl(store.getState(), spriteOption);
    const url =
      overrideBlobUrl ??
      (spriteOption === "BlockStack" ? blockStackSpritesheetUrl
      : spriteOption === "Debug" ? debugSpritesheetUrl
      : toppySpritesheetUrl);
    let strippedImageObjectUrl: string | undefined = undefined;

    try {
      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      }
      const buffer = await response.arrayBuffer();
      const contentType = response.headers.get("content-type")!;
      const isPng = contentType.includes("png");
      const strippedBuffer =
        isPng ? stripIccProfilePng(buffer) : stripIccProfileWebp(buffer);
      const blob = new Blob([strippedBuffer], {
        type: isPng ? "image/png" : "image/webp",
      });

      strippedImageObjectUrl = URL.createObjectURL(blob);
      const img = new Image();
      img.src = strippedImageObjectUrl;
      await img.decode();

      if (signal.aborted) {
        return;
      }

      // bake the pristine original sheet immediately, then discard the raw
      // decoded texture - the original is the only full-image copy kept on
      // the GPU:
      const decodedTexture = Texture.from(img);
      destroySpritesheet(this.#originalSpritesheet);
      this.#originalSpritesheet = this.#buildOriginal(
        pixiRenderer,
        spriteOption,
        decodedTexture,
      );
      decodedTexture.destroy(true);
      this.#spriteOption = spriteOption;
      this.#loadImageAbortController = undefined;
    } catch (e) {
      if (signal.aborted) {
        return;
      }
      if (detectDeviceType() === "server") {
        console.warn(
          "did not load textures - we are running under node so will use Texture.EMPTY",
        );
        destroySpritesheet(this.#originalSpritesheet);
        this.#originalSpritesheet = this.#buildOriginal(
          pixiRenderer,
          spriteOption,
          Texture.EMPTY,
        );
        this.#spriteOption = spriteOption;
        this.#loadImageAbortController = undefined;
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
  }

  #buildOriginal(
    pixiRenderer: Renderer,
    spriteOption: LoadableSpriteOption,
    decodedTexture: Texture,
  ): AppSpritesheetWithVariants {
    const spritesheetMeta = spritesheetMetas[spriteOption];
    const spriteSheetData: AppSpritesheetDataWithVariants =
      makeSpritesheetData(spritesheetMeta);

    if (decodedTexture.width === 0) {
      // running under node with no real image (Texture.EMPTY): a sheet over
      // the empty texture, with nothing to preprocess
      const emptySheet = new Spritesheet(
        decodedTexture,
        spriteSheetData,
      ) as AppSpritesheet;
      emptySheet.spriteOption = spriteOption;
      emptySheet.spritesheetMeta = spritesheetMeta;
      return withVariantsBaked(emptySheet);
    }

    const shadowSpritesMask = renderMaskTexture(pixiRenderer, {
      rects: {
        textureIds: (candidate: TextureId) => candidate.startsWith("shadow."),
        color: white,
        spritesheetDataFrames: spriteSheetData.frames,
      },
      clearColour: black,
    });

    const preprocessShadowTexturesFilter = new ShadowPreprocessFilter(
      "invertRedToAlpha",
      shadowSpritesMask,
    );

    const sprite = new Sprite(decodedTexture);
    sprite.filters = preprocessShadowTexturesFilter;

    const processedTexture = RenderTexture.create({
      width: decodedTexture.width,
      height: decodedTexture.height,
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
    spriteSheet.spriteOption = spriteOption;
    spriteSheet.spritesheetMeta = spritesheetMeta;
    applySpritesheetFlips(spriteSheet);

    sprite.destroy();
    shadowSpritesMask.destroy(true);

    return withVariantsBaked(spriteSheet);
  }

  /**
   * Throw away every baked RenderTexture (the original and the current
   * sheet). Used after a WebGL context loss: the restored WebGL context has
   * no backing for the old RenderTextures. With no raw image kept, the sprite
   * option is also reset so the main loop's isTextureLoaded check refetches
   * via loadImage, which re-bakes the original.
   */
  invalidateBakedTextures() {
    destroySpritesheet(this.#originalSpritesheet);
    this.#originalSpritesheet = undefined;
    this.#spriteOption = undefined;
    destroySpritesheet(this.#currentSpritesheet);
    this.#currentSpritesheet = undefined;
  }

  destroy() {
    this.#loadImageAbortController?.abort();
    this.#loadImageAbortController = undefined;
    this.#spriteOption = undefined;
    destroySpritesheet(this.#originalSpritesheet);
    this.#originalSpritesheet = undefined;
    destroySpritesheet(this.#currentSpritesheet);
    this.#currentSpritesheet = undefined;
  }
}
