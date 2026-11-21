import {
  BufferImageSource,
  Container,
  Graphics,
  ImageSource,
  Rectangle,
  type Renderer,
  RenderTexture,
  Sprite,
  Spritesheet,
  Texture,
  type WebGLRenderer,
} from "pixi.js";

import { invertRedToAlphaFilter } from "../../game/render/filters/shadows/invertRedToAlphaFilter";
import type { ZxSpectrumRoomColour } from "../../originalGame";
import { store } from "../../store/store";
import { detectDeviceType } from "../../utils/detectEnv/detectDeviceType";
import { objectEntriesIter } from "../../utils/entries";
import type { SceneryName } from "../planets";
import {
  type AppSpritesheet,
  type AppSpritesheetDataWithVariants,
  type AppSpritesheetWithVariants,
  withVariantsBaked,
} from "./AppSpritesheet";
import { buildRoomSheet } from "./buildRoomSheet";
import type { FrameRect } from "./repackSpritesheetForSmoothUpscale";
import type { SmoothedSpritesheetPixels } from "./smoothing/smoothingAlgorithm";
import { spritesheetSmoothingManagerLoader } from "./smoothing/spritesheetSmoothingManagerLoader";
import { spritesheetArtLoader } from "./spritesheetArtLoader";
import { spritesheetArtSourceUrl } from "./spritesheetArtSourceUrl";
import {
  makeSpritesheetData,
  type TextureId,
} from "./spritesheetData/makeSpritesheetData";
import {
  spritesheetArtName,
  type SpritesheetMetadata,
  spritesheetMetas,
  type SpritesheetName,
} from "./spritesheetData/spritesheetMetaData";
import { spritesheetOverBakedTexture } from "./spritesheetOverBakedTexture";
import { withRepackedRects } from "./withRepackedRects";

type SmoothedSheet = {
  spritesheetSmoothUpscale: number;
  baseTexture: RenderTexture;
  repackedFrameRects: ReadonlyMap<TextureId, FrameRect>;
};

const destroySpritesheet = (
  sheet: AppSpritesheet | AppSpritesheetWithVariants | undefined,
) => {
  if (sheet !== undefined) {
    sheet.textureSource.destroy();
    sheet.destroy(true);
  }
};

/**
 * Put an upscaled sheet's pixels on the GPU as a texture of its logical size,
 * backed at its resolution.
 *
 * The pixels go up at 1:1 first, then are drawn texel-for-texel into the
 * texture at the resolution - a buffer source uploads at its logical size, so
 * it cannot carry a resolution itself. Both steps keep the pixels
 * premultiplied, so the texture holds exactly what the smoothing drew.
 */
const uploadSmoothedSpritesheetPixels = (
  pixiRenderer: WebGLRenderer,
  { pixels, pixelWidth, pixelHeight, resolution }: SmoothedSpritesheetPixels,
): RenderTexture => {
  const uploaded = new Texture({
    source: new BufferImageSource({
      resource: pixels,
      width: pixelWidth,
      height: pixelHeight,
      format: "rgba8unorm",
      alphaMode: "premultiplied-alpha",
      scaleMode: "nearest",
    }),
  });
  const width = pixelWidth / resolution;
  const height = pixelHeight / resolution;
  const target = RenderTexture.create({ width, height, resolution });
  // sized again, to whole pixels: the logical height times the resolution
  // can come out a hair under the whole number
  target.resize(width, height, resolution);
  const copy = new Sprite(uploaded);
  copy.scale.set(1 / resolution);
  pixiRenderer.render({ container: copy, target, clear: true });
  copy.destroy();
  uploaded.destroy(true);
  return target;
};

export class Spritesheets {
  #loadImageAbortController: AbortController | undefined;
  /**
   * the spritesheet whose image is loaded
   */
  #spritesheetArtName: SpritesheetName | undefined;
  /**
   * the decoded art (cpu-side only, not on gpu), kept to rebuild the 1x
   * original sheet from
   */
  #spritesheetArt: ImageBitmap | undefined;
  /**
   * how much this spritesheet has been upscaled above the source image
   */
  #spritesheetSmoothUpscale = 1;
  /**
   * the pristine GPU source: the loaded image with the shadow preprocess baked
   * in, never room-swopped. Built by loadImage (the raw decoded texture is
   * discarded immediately after)
   */
  #originalSpritesheet: AppSpritesheetWithVariants | undefined;
  /**
   * the sheet all in-room rendering samples, rebuilt per room, built from #originalSpritesheet
   */
  #currentRoomSpritesheet: AppSpritesheetWithVariants | undefined;
  /**
   * the GPU texture #currentRoomSpritesheet is baked into, kept across rebuilds
   * so each room change re-bakes into the same memory rather than a GPU
   * free+alloc. The bake's first pass clears it, so no pixels survive between
   * rooms.
   */
  #currentRoomSheetTexture: RenderTexture | undefined;
  /**
   * what #currentRoomSpritesheet was baked for - a rebuild asking for the same
   * again keeps it, rather than baking an identical sheet
   */
  #currentRoomSheetBakedFor:
    | {
        originalSpritesheet: AppSpritesheetWithVariants;
        roomScenery: SceneryName;
        roomColor: ZxSpectrumRoomColour;
        spritesheetMeta: SpritesheetMetadata;
      }
    | undefined;
  /**
   * maps textureId → where that frame now sits after the sheet is re-composed for upscaling
   */
  #repackedFrameRects: ReadonlyMap<TextureId, FrameRect> | undefined;
  /**
   * an upscaled base texture {@link uploadSmoothUpscaledToGpu} has finished, waiting for
   * {@link rebuild} to build the original sheet from it
   */
  #smoothedSheet: SmoothedSheet | undefined;

  isTextureLoaded(spritesheetArtName: SpritesheetName): boolean {
    return this.#spritesheetArtName === spritesheetArtName;
  }

  get spritesheetSmoothUpscale(): number {
    return this.#spritesheetSmoothUpscale;
  }

  /**
   * whether {@link rebuild} can be called at this factor: the sheet is
   * already at it, or needs no smoothing, or {@link uploadSmoothUpscaledToGpu} has uploaded it
   */
  isSmoothedAt(spritesheetSmoothUpscale: number): boolean {
    return (
      spritesheetSmoothUpscale === 1 ||
      spritesheetSmoothUpscale === this.#spritesheetSmoothUpscale ||
      spritesheetSmoothUpscale === this.#smoothedSheet?.spritesheetSmoothUpscale
    );
  }

  /**
   * upload the finished smoothing of the loaded art to the GPU, ready for
   * {@link rebuild} at its upscale. The upscaled sheet is in a layout of its
   * own, with aprons around the tiled frames, in a texture whose backing store
   * is the upscale times its logical size
   */
  uploadSmoothUpscaledToGpu(pixiRenderer: WebGLRenderer): void {
    if (import.meta.env.DEV && this.#spritesheetArt === undefined) {
      throw new Error("cannot upload a smoothing before image load");
    }
    if (
      import.meta.env.DEV &&
      spritesheetSmoothingManagerLoader.loaded()?.currentSmoothedSpritesheet ===
        undefined
    ) {
      throw new Error("cannot upload a smoothing before it is done");
    }
    const upscaled =
      spritesheetSmoothingManagerLoader.loaded()!.currentSmoothedSpritesheet!;
    this.#discardSmoothedSheet();
    this.#smoothedSheet = {
      spritesheetSmoothUpscale: upscaled.smoothUpscale.x,
      baseTexture: uploadSmoothedSpritesheetPixels(pixiRenderer, upscaled),
      repackedFrameRects: upscaled.repackedFrameRects,
    };
  }

  #discardSmoothedSheet() {
    this.#smoothedSheet?.baseTexture.destroy(true);
    this.#smoothedSheet = undefined;
  }

  /**
   * replace {@link #originalSpritesheet} with one at the given smoothed upscale
   * factor - from the retained source image at 1x, otherwise from what
   * {@link uploadSmoothUpscaledToGpu} uploaded - with the shadow preprocess baked over it
   */
  #rebuildOriginalAtSmoothUpscale(
    pixiRenderer: Renderer,
    spritesheetSmoothUpscale: number,
  ): void {
    if (import.meta.env.DEV && this.#spritesheetArt === undefined) {
      throw new Error("cannot re-bake the original sheet before image load");
    }
    if (
      import.meta.env.DEV &&
      spritesheetSmoothUpscale !== 1 &&
      this.#smoothedSheet?.spritesheetSmoothUpscale !== spritesheetSmoothUpscale
    ) {
      throw new Error(
        `cannot rebuild at ${spritesheetSmoothUpscale}x before uploadSmoothUpscaledToGpu() has uploaded it`,
      );
    }
    // the plain image is already right at 1x: the composition only matters
    // to the upscale, which is what reads across a frame's edges
    const smoothedSheet =
      spritesheetSmoothUpscale === 1 ? undefined : this.#smoothedSheet!;
    if (smoothedSheet === undefined) {
      this.#discardSmoothedSheet();
    }
    this.#smoothedSheet = undefined;
    const baseTexture =
      smoothedSheet?.baseTexture ??
      new Texture({
        source: new ImageSource({ resource: this.#spritesheetArt! }),
      });
    destroySpritesheet(this.#originalSpritesheet);
    this.#originalSpritesheet = this.#buildOriginal(
      pixiRenderer,
      this.#spritesheetArtName!,
      baseTexture,
      smoothedSheet?.repackedFrameRects,
    );
    baseTexture.destroy(true);
    this.#spritesheetSmoothUpscale = spritesheetSmoothUpscale;
    this.#repackedFrameRects = smoothedSheet?.repackedFrameRects;
  }

  rebuild(
    pixiRenderer: Renderer,
    roomScenery: SceneryName,
    roomColor: ZxSpectrumRoomColour,
    spritesheetMeta: SpritesheetMetadata,
    /**
     * smoothed upscale factor to build the original sheet at (and so the
     * room sheet); 1 = no upscaling. Above 1, {@link uploadSmoothUpscaledToGpu} must have
     * uploaded it first
     */
    spritesheetSmoothUpscale: number,
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
      spritesheetSmoothUpscale !== this.#spritesheetSmoothUpscale;
    if (originalRebuilt) {
      this.#rebuildOriginalAtSmoothUpscale(
        pixiRenderer,
        spritesheetSmoothUpscale,
      );
    }

    const orig = this.#originalSpritesheet;

    const bakedFor = this.#currentRoomSheetBakedFor;
    if (
      this.#currentRoomSpritesheet !== undefined &&
      bakedFor !== undefined &&
      bakedFor.originalSpritesheet === orig &&
      bakedFor.roomScenery === roomScenery &&
      bakedFor.roomColor.hue === roomColor.hue &&
      bakedFor.roomColor.shade === roomColor.shade &&
      bakedFor.spritesheetMeta === spritesheetMeta
    ) {
      // eg moving between rooms of the same scenery and colour:
      return originalRebuilt;
    }

    // bakes sample the original sheet's pixels (a view over its source, so
    // destroying it after the bakes leaves the source untouched):
    const bt = new Texture({ source: orig.textureSource });

    // dispose the previous room's sheet and its per-frame textures, but keep
    // its backing texture (#currentRoomSheetTexture) for the new bake to render
    // into:
    this.#currentRoomSpritesheet?.destroy(false);
    this.#currentRoomSpritesheet = undefined;

    const built = buildRoomSheet(
      {
        pixiRenderer,
        roomScenery,
        roomColor,
        spritesheetMetaData: spritesheetMeta,
      },
      bt,
      this.#currentRoomSheetTexture,
      this.#repackedFrameRects,
    );

    this.#currentRoomSpritesheet = built.sheet;
    this.#currentRoomSheetTexture = built.target;
    this.#currentRoomSheetBakedFor = {
      originalSpritesheet: orig,
      roomScenery,
      // copied, since the room's own colour may change after:
      roomColor: { ...roomColor },
      spritesheetMeta,
    };

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
    if (this.#currentRoomSpritesheet === undefined) {
      throw new Error(
        "spritesheetForCurrentRoom not available — rebuild() not yet called",
      );
    }
    return this.#currentRoomSpritesheet;
  }

  async loadImage(
    pixiRenderer: Renderer,
    spritesheetArtName: SpritesheetName,
  ): Promise<void> {
    if (this.#spritesheetArtName === spritesheetArtName) {
      return;
    }

    this.#loadImageAbortController?.abort();
    this.#discardSmoothedSheet();
    const abortController = new AbortController();
    this.#loadImageAbortController = abortController;
    const { signal } = abortController;

    const url = spritesheetArtSourceUrl(store.getState(), spritesheetArtName);

    try {
      const art = await spritesheetArtLoader.load(url);

      if (signal.aborted) {
        return;
      }

      // bake the pristine original sheet immediately, then discard the raw
      // decoded texture - the original is the only full-image copy kept on
      // the GPU (the decoded art itself is retained cpu-side, so the
      // original can later be rebuilt at 1x from it):
      const decodedTexture = Texture.from(art);
      destroySpritesheet(this.#originalSpritesheet);
      this.#originalSpritesheet = this.#buildOriginal(
        pixiRenderer,
        spritesheetArtName,
        decodedTexture,
      );
      decodedTexture.destroy(true);
      this.#spritesheetArt = art;
      this.#spritesheetSmoothUpscale = 1;
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
        this.#spritesheetSmoothUpscale = 1;
        this.#repackedFrameRects = undefined;
        this.#spritesheetArtName = spritesheetArtName;
        this.#loadImageAbortController = undefined;
      } else {
        throw new Error(`failed to load spritesheet from ${url}`, {
          cause: e,
        });
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
    repackedFrameRects?: ReadonlyMap<TextureId, FrameRect>,
  ): AppSpritesheetWithVariants {
    const spritesheetMeta = spritesheetMetas[spritesheetArtName];
    const spriteSheetData: AppSpritesheetDataWithVariants = withRepackedRects(
      makeSpritesheetData(spritesheetMeta),
      repackedFrameRects,
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

    const spriteSheet = spritesheetOverBakedTexture(
      processedTexture,
      spriteSheetData,
      spritesheetArtName,
      spritesheetMeta,
    );

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
  discardTexturesAfterContextLoss() {
    this.#discardSmoothedSheet();
    destroySpritesheet(this.#originalSpritesheet);
    this.#originalSpritesheet = undefined;
    this.#spritesheetArtName = undefined;
    this.#spritesheetArt = undefined;
    this.#spritesheetSmoothUpscale = 1;
    this.#repackedFrameRects = undefined;
    this.#destroyCurrentRoomSheet();
  }

  /** the current sheet and its backing texture, destroyed together */
  #destroyCurrentRoomSheet() {
    this.#currentRoomSpritesheet?.destroy(false);
    this.#currentRoomSpritesheet = undefined;
    this.#currentRoomSheetTexture?.destroy(true);
    this.#currentRoomSheetTexture = undefined;
    this.#currentRoomSheetBakedFor = undefined;
  }

  destroy() {
    this.#discardSmoothedSheet();
    this.#loadImageAbortController?.abort();
    this.#loadImageAbortController = undefined;
    this.#spritesheetArtName = undefined;
    this.#spritesheetArt = undefined;
    this.#spritesheetSmoothUpscale = 1;
    this.#repackedFrameRects = undefined;
    destroySpritesheet(this.#originalSpritesheet);
    this.#originalSpritesheet = undefined;
    this.#destroyCurrentRoomSheet();
  }
}
