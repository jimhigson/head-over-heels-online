import {
  Container,
  Graphics,
  ImageSource,
  Rectangle,
  type Renderer,
  RenderTexture,
  Sprite,
  Spritesheet,
  Texture,
} from "pixi.js";

import blockstackSpritesheetArtUrl from "../../../gfx/spritesBlockstack.webp";
import debugSpritesheetArtUrl from "../../../gfx/spritesDebug.webp";
import toppySpritesheetArtUrl from "../../../gfx/spritesToppy.webp";
import { invertRedToAlphaFilter } from "../../game/render/filters/shadows/invertRedToAlphaFilter";
import { type bakeUpscaledSpritesheetTexture } from "../../game/render/filters/upscale/bakeUpscaledSpritesheetTexture";
import { importBakeUpscaledSpritesheetTextureOnce } from "../../game/render/filters/upscale/bakeUpscaledSpritesheetTexture.import";
import { type ZxSpectrumRoomColour } from "../../originalGame";
import { selectSpritesheetOverrideBlobUrl } from "../../store/slices/spritesheetOverrideSlice";
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
import {
  composeSpritesheetForUpscale,
  type FrameRect,
} from "./composeSpritesheetForUpscale";
import { makeSpritesheetData } from "./spritesheetData/makeSpritesheetData";
import {
  spritesheetArtName,
  type SpritesheetMetadata,
  spritesheetMetas,
  type SpritesheetName,
} from "./spritesheetData/spritesheetMetaData";
import { withRepackedRects } from "./withRepackedRects";

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
  /**
   * the spritesheet whose image is loaded
   */
  #spritesheetArtName: SpritesheetName | undefined;
  /**
   * Original decoded source image (cpu-side only, not on gpu)
   * - repeated upscaling will come from this original
   */
  #spritesheetArt: HTMLImageElement | undefined;
  /**
   * how much this spritesheet has been upscaled above the source image
   */
  #spritesheetUpscale = 1;
  /**
   * the upscaled version of the texture, if turned on - the palette swopping
   * will be based on this if it exists
   */
  #bakeUpscaledSpritesheetTexture:
    typeof bakeUpscaledSpritesheetTexture | undefined;
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
  /**
   * maps textureId → where that frame now sits after the sheet is re-composed for upscaling
   */
  #repackedFrameRects: ReadonlyMap<string, FrameRect> | undefined;

  isTextureLoaded(spritesheetArtName: SpritesheetName): boolean {
    return this.#spritesheetArtName === spritesheetArtName;
  }

  get spritesheetUpscale(): number {
    return this.#spritesheetUpscale;
  }

  /**
   * whether {@link loadUpscaleBakeModule} has resolved, so a sheet can be baked at a
   * factor above 1
   */
  get isUpscaleBakeModuleLoaded(): boolean {
    return this.#bakeUpscaledSpritesheetTexture !== undefined;
  }

  /**
   * fetch the upscale bake, which only an upscaled sheet needs - so a player
   * who leaves smoothing off never downloads it. Must have resolved before
   * {@link rebuild} is called with a factor above 1.
   */
  async loadUpscaleBakeModule(): Promise<void> {
    ({ bakeUpscaledSpritesheetTexture: this.#bakeUpscaledSpritesheetTexture } =
      await importBakeUpscaledSpritesheetTextureOnce());
  }

  /**
   * replace {@link #originalSpritesheet} with one baked from the retained
   * source image at the given baked upscale factor: the frames are composed
   * into a layout of our own, with aprons around the tiled ones, then that
   * sheet is upscaled (into a texture whose backing store is
   * `spritesheetUpscale` times its logical size) before the shadow preprocess bakes
   * over it
   */
  #rebakeOriginalAtUpscale(
    pixiRenderer: Renderer,
    spritesheetUpscale: number,
  ): void {
    if (import.meta.env.DEV && this.#spritesheetArt === undefined) {
      throw new Error("cannot re-bake the original sheet before image load");
    }
    if (
      import.meta.env.DEV &&
      spritesheetUpscale !== 1 &&
      this.#bakeUpscaledSpritesheetTexture === undefined
    ) {
      throw new Error(
        "cannot bake above 1x before loadUpscaleBakeModule() has resolved",
      );
    }
    const rawTexture = new Texture({
      source: new ImageSource({ resource: this.#spritesheetArt! }),
    });
    // the composition only matters to the upscale, which is what reads across
    // a frame's edges - the plain sheet is already right at 1x
    const repacked =
      spritesheetUpscale === 1 ? undefined : (
        composeSpritesheetForUpscale(
          pixiRenderer,
          rawTexture,
          makeSpritesheetData(spritesheetMetas[this.#spritesheetArtName!])
            .frames,
        )
      );
    const baseTexture =
      repacked === undefined ? rawTexture : (
        this.#bakeUpscaledSpritesheetTexture!(
          pixiRenderer,
          repacked.texture,
          spritesheetUpscale,
          repacked.repackedCellRects.values(),
        )
      );
    destroySpritesheet(this.#originalSpritesheet);
    this.#originalSpritesheet = this.#buildOriginal(
      pixiRenderer,
      this.#spritesheetArtName!,
      baseTexture,
      repacked?.repackedFrameRects,
    );
    baseTexture.destroy(true);
    repacked?.texture.destroy(true);
    if (baseTexture !== rawTexture) {
      rawTexture.destroy(true);
    }
    this.#spritesheetUpscale = spritesheetUpscale;
    this.#repackedFrameRects = repacked?.repackedFrameRects;
  }

  rebuild(
    pixiRenderer: Renderer,
    roomScenery: SceneryName,
    roomColor: ZxSpectrumRoomColour,
    spritesheetMeta: SpritesheetMetadata,
    /**
     * baked upscale factor to bake into the original sheet (and so the
     * room sheet); 1 = no upscaling
     */
    spritesheetUpscale: number,
    /**
     * @returns whether the original spritesheet instance was recreated -
     * consumers holding sprites built from it (eg the hud) must be rebuilt
     * when it was
     */
  ): boolean {
    if (
      this.#originalSpritesheet?.spritesheetArtName !==
      spritesheetArtName(spritesheetMeta)
    ) {
      throw new Error(
        `rebuild() requires loadImage() to have built the original sheet for "${spritesheetArtName(spritesheetMeta)}" first`,
      );
    }

    const originalRebuilt =
      this.#spritesheetArt !== undefined &&
      spritesheetUpscale !== this.#spritesheetUpscale;
    if (originalRebuilt) {
      this.#rebakeOriginalAtUpscale(pixiRenderer, spritesheetUpscale);
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
        spritesheetMetaData: spritesheetMeta,
      },
      bt,
      this.#currentSheetTarget,
      this.#repackedFrameRects,
    );

    this.#currentSpritesheet = built.sheet;
    this.#currentSheetTarget = built.target;

    bt.destroy();

    return originalRebuilt;
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
    spritesheetArtName: SpritesheetName,
  ): Promise<void> {
    if (this.#spritesheetArtName === spritesheetArtName) {
      return;
    }

    this.#loadImageAbortController?.abort();
    const abortController = new AbortController();
    this.#loadImageAbortController = abortController;
    const { signal } = abortController;

    const overrideBlobUrl =
      import.meta.env.VITE_APP === "editor" ?
        undefined
      : selectSpritesheetOverrideBlobUrl(store.getState(), spritesheetArtName);
    const url =
      overrideBlobUrl ??
      (spritesheetArtName === "blockstack" ? blockstackSpritesheetArtUrl
      : spritesheetArtName === "debug" ? debugSpritesheetArtUrl
      : toppySpritesheetArtUrl);
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
      // the GPU (the decoded image itself is retained cpu-side, so the
      // original can later be re-baked at a different factor):
      const decodedTexture = Texture.from(img);
      destroySpritesheet(this.#originalSpritesheet);
      this.#originalSpritesheet = this.#buildOriginal(
        pixiRenderer,
        spritesheetArtName,
        decodedTexture,
      );
      decodedTexture.destroy(true);
      this.#spritesheetArt = img;
      this.#spritesheetUpscale = 1;
      this.#repackedFrameRects = undefined;
      this.#spritesheetArtName = spritesheetArtName;
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
          spritesheetArtName,
          Texture.EMPTY,
        );
        this.#spritesheetArt = undefined;
        this.#spritesheetUpscale = 1;
        this.#repackedFrameRects = undefined;
        this.#spritesheetArtName = spritesheetArtName;
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
    spritesheetArtName: SpritesheetName,
    decodedTexture: Texture,
    /**
     * where each frame's art lives, when the sheet being built has been
     * composed for the upscale rather than taken straight from the authored
     * image
     */
    repackedFrameRects?: ReadonlyMap<string, FrameRect>,
  ): AppSpritesheetWithVariants {
    const spritesheetMeta = spritesheetMetas[spritesheetArtName];
    const rawSheetData = makeSpritesheetData(spritesheetMeta);
    const spriteSheetData: AppSpritesheetDataWithVariants =
      repackedFrameRects === undefined ? rawSheetData : (
        {
          ...rawSheetData,
          frames: withRepackedRects(rawSheetData.frames, repackedFrameRects),
        }
      );

    if (decodedTexture.width === 0) {
      // running under node with no real image (Texture.EMPTY): a sheet over
      // the empty texture, with nothing to preprocess
      const emptySheet = new Spritesheet(
        decodedTexture,
        spriteSheetData,
      ) as AppSpritesheet;
      emptySheet.spritesheetArtName = spritesheetArtName;
      emptySheet.spritesheetMeta = spritesheetMeta;
      return withVariantsBaked(emptySheet);
    }

    const processedTexture = RenderTexture.create({
      width: decodedTexture.width,
      height: decodedTexture.height,
      // carry the baked backing store size through to the
      // processed sheet (width/height above are in logical 1x units):
      resolution: decodedTexture.source.resolution,
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
    // pixi's Spritesheet applies the sheet data's meta.scale (1) to the
    // texture source, wiping any bake resolution - restore it
    // before parsing so frame UVs are computed against the logical 1x size:
    spriteSheet.textureSource.resolution = decodedTexture.source.resolution;
    spriteSheet.parseSync();
    spriteSheet.textureSource.scaleMode = "nearest";
    spriteSheet.spritesheetArtName = spritesheetArtName;
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
   * no backing for the old RenderTextures. The sprite option (and retained
   * source image) is also reset so the main loop's isTextureLoaded check
   * refetches via loadImage, which re-bakes the original.
   */
  invalidateUpscaledTextures() {
    destroySpritesheet(this.#originalSpritesheet);
    this.#originalSpritesheet = undefined;
    this.#spritesheetArtName = undefined;
    this.#spritesheetArt = undefined;
    this.#spritesheetUpscale = 1;
    this.#repackedFrameRects = undefined;
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
    this.#spritesheetArtName = undefined;
    this.#spritesheetArt = undefined;
    this.#spritesheetUpscale = 1;
    this.#repackedFrameRects = undefined;
    destroySpritesheet(this.#originalSpritesheet);
    this.#originalSpritesheet = undefined;
    this.#destroyCurrentSheet();
  }
}
