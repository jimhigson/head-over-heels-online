import {
  Container,
  Graphics,
  Rectangle,
  type Renderer,
  RenderTexture,
  Sprite,
  Spritesheet,
  Texture,
} from "pixi.js";

import blockStackSpritesheetUrl from "../../../gfx/sprites.webp";
import debugSpritesheetUrl from "../../../gfx/spritesDebug.webp";
import toppySpritesheetUrl from "../../../gfx/spritesToppy.webp";
import { invertRedToAlphaFilter } from "../../game/render/filters/shadows/invertRedToAlphaFilter";
import { type ZxSpectrumRoomColour } from "../../originalGame";
import { selectSpritesheetOverrideBlobUrl } from "../../store/slices/spritesheetOverrideSlice";
import { type SpriteOption } from "../../store/slices/userSettings/userSettingsSlice";
import { store } from "../../store/store";
import { detectDeviceType } from "../../utils/detectEnv/detectDeviceType";
import { objectEntriesIter } from "../../utils/entries";
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
import { buildRoomSheet } from "./buildRoomSheet";
import { makeSpritesheetData } from "./spritesheetData/makeSpritesheetData";
import {
  type SpritesheetMetadata,
  spritesheetMetaForOption,
  spritesheetMetas,
} from "./spritesheetData/spritesheetMetaData";

export type SpriteOptionName = SpriteOption["name"];

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
  #spriteOptionName: SpriteOptionName | undefined;
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
  /**
   * the GPU texture #currentSpritesheet is baked into, kept across rebuilds
   * so each room change re-bakes into the same memory rather than a GPU
   * free+alloc. The bake's first pass clears it, so no pixels survive between
   * rooms.
   */
  #currentSheetTarget: RenderTexture | undefined;

  isTextureLoaded(spriteOptionName: SpriteOptionName): boolean {
    return this.#spriteOptionName === spriteOptionName;
  }

  rebuild(
    pixiRenderer: Renderer,
    roomScenery: SceneryName,
    roomColor: ZxSpectrumRoomColour,
    spriteOption: SpriteOption,
  ): void {
    if (this.#originalSpritesheet?.spriteOptionName !== spriteOption.name) {
      throw new Error(
        `rebuild() requires loadImage() to have built the original sheet for "${spriteOption.name}" first`,
      );
    }

    const orig = this.#originalSpritesheet;
    // bakes sample the original sheet's pixels (a view over its source, so
    // destroying it after the bakes leaves the source untouched):
    const bt = new Texture({ source: orig.textureSource });

    // dispose the previous room's sheet and its per-frame textures, but keep
    // its backing texture (#currentSheetTarget) for the new bake to render
    // into:
    this.#currentSpritesheet?.destroy(false);
    this.#currentSpritesheet = undefined;

    const built = buildRoomSheet(
      {
        pixiRenderer,
        roomScenery,
        roomColor,
        spriteOption,
        spritesheetMetaData: spritesheetMetaForOption(
          spriteOption,
        ) as SpritesheetMetadata,
      },
      bt,
      this.#currentSheetTarget,
    );

    this.#currentSpritesheet = built.sheet;
    this.#currentSheetTarget = built.target;

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
    spriteOptionName: SpriteOptionName,
  ): Promise<void> {
    if (this.#spriteOptionName === spriteOptionName) {
      return;
    }

    this.#loadImageAbortController?.abort();
    const abortController = new AbortController();
    this.#loadImageAbortController = abortController;
    const { signal } = abortController;

    const overrideBlobUrl =
      import.meta.env.VITE_APP === "editor" ?
        undefined
      : selectSpritesheetOverrideBlobUrl(store.getState(), spriteOptionName);
    const url =
      overrideBlobUrl ??
      (spriteOptionName === "BlockStack" ? blockStackSpritesheetUrl
      : spriteOptionName === "Debug" ? debugSpritesheetUrl
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
        spriteOptionName,
        decodedTexture,
      );
      decodedTexture.destroy(true);
      this.#spriteOptionName = spriteOptionName;
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
          spriteOptionName,
          Texture.EMPTY,
        );
        this.#spriteOptionName = spriteOptionName;
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
    spriteOptionName: SpriteOptionName,
    decodedTexture: Texture,
  ): AppSpritesheetWithVariants {
    const spritesheetMeta = spritesheetMetas[spriteOptionName];
    const spriteSheetData: AppSpritesheetDataWithVariants =
      makeSpritesheetData(spritesheetMeta);

    if (decodedTexture.width === 0) {
      // running under node with no real image (Texture.EMPTY): a sheet over
      // the empty texture, with nothing to preprocess
      const emptySheet = new Spritesheet(
        decodedTexture,
        spriteSheetData,
      ) as AppSpritesheet;
      emptySheet.spriteOptionName = spriteOptionName;
      emptySheet.spritesheetMeta = spritesheetMeta;
      return withVariantsBaked(emptySheet);
    }

    const processedTexture = RenderTexture.create({
      width: decodedTexture.width,
      height: decodedTexture.height,
    });

    // copy the raw sheet unchanged...
    const base = new Sprite(decodedTexture);
    pixiRenderer.render({ container: base, target: processedTexture });
    base.destroy();

    // ...then replace the shadow frames in place with their alpha-encoded form.
    // No mask needed: each shadow rect is erased to transparent and redrawn
    // through the (maskless) invert filter, so only shadow pixels are touched
    const shadowOverlay = new Container();
    const eraser = new Graphics();
    const shadowFrameSprites: Sprite[] = [];
    const seenShadowRects = new Set<string>();
    for (const [id, { frame }] of objectEntriesIter(spriteSheetData.frames)) {
      if (!id.startsWith("shadow.")) {
        continue;
      }
      const { x, y, w, h } = frame;
      const rectKey = `${x},${y},${w},${h}`;
      if (seenShadowRects.has(rectKey)) {
        continue;
      }
      seenShadowRects.add(rectKey);

      eraser.rect(x, y, w, h);

      const frameSprite = new Sprite(
        new Texture({
          source: decodedTexture.source,
          frame: new Rectangle(x, y, w, h),
        }),
      );
      frameSprite.position.set(x, y);
      frameSprite.filters = invertRedToAlphaFilter;
      shadowFrameSprites.push(frameSprite);
      shadowOverlay.addChild(frameSprite);
    }
    // erase (before the inverted frames draw) so the raw white backgrounds do
    // not show through the now-transparent parts of the alpha-encoded shadows
    eraser.fill(0xff_ff_ff);
    eraser.blendMode = "erase";
    shadowOverlay.addChildAt(eraser, 0);

    pixiRenderer.render({
      container: shadowOverlay,
      target: processedTexture,
      clear: false,
    });

    const spriteSheet = new Spritesheet(
      processedTexture,
      spriteSheetData,
    ) as AppSpritesheet;
    spriteSheet.parseSync();
    spriteSheet.textureSource.scaleMode = "nearest";
    spriteSheet.spriteOptionName = spriteOptionName;
    spriteSheet.spritesheetMeta = spritesheetMeta;
    applySpritesheetFlips(spriteSheet);

    eraser.destroy();
    for (const frameSprite of shadowFrameSprites) {
      // destroy the per-frame Texture wrapper but not the shared source (that is
      // the caller's decodedTexture, destroyed once after this returns)
      frameSprite.destroy({ texture: true, textureSource: false });
    }

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
    this.#spriteOptionName = undefined;
    this.#destroyCurrentSheet();
  }

  /** the current sheet and its backing texture, destroyed together */
  #destroyCurrentSheet() {
    this.#currentSpritesheet?.destroy(false);
    this.#currentSpritesheet = undefined;
    this.#currentSheetTarget?.destroy(true);
    this.#currentSheetTarget = undefined;
  }

  destroy() {
    this.#loadImageAbortController?.abort();
    this.#loadImageAbortController = undefined;
    this.#spriteOptionName = undefined;
    destroySpritesheet(this.#originalSpritesheet);
    this.#originalSpritesheet = undefined;
    this.#destroyCurrentSheet();
  }
}
