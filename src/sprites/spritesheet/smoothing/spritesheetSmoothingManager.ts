import type { OverrideProperties } from "type-fest";

import { closeMenuThunk } from "../../../store/slices/gameMenus/closeMenuThunk";
import { openMenuThunk } from "../../../store/slices/gameMenus/openMenuThunk";
import { selectSmoothingInputs } from "../../../store/slices/smoothing/selectSmoothingInputs";
import {
  selectIsSmoothingInProgress,
  smoothingFailed,
  smoothingProgressed,
  smoothingSettled,
  smoothingStarted,
  smoothingSucceeded,
} from "../../../store/slices/smoothing/smoothingSlice";
import type { AppDispatch, GameRootState } from "../../../store/store";
import { entries, fromAllEntries } from "../../../utils/entries";
import { importOnce } from "../../../utils/importOnce";
import type { Xy } from "../../../utils/vectors/vectors";
import type { FrameRect } from "../repackSpritesheetForSmoothUpscale";
import { spritesheetArtLoader } from "../spritesheetArtLoader";
import type { TextureId } from "../spritesheetData/makeSpritesheetData";
import { spritesheetFramesJson } from "../spritesheetData/spritesheetFramesJson.ts" with { type: "macro" };
import type { SpritesheetName } from "../spritesheetData/spritesheetMetaData";
import { smoothedSpritesheetCacheNamePrefix } from "./smoothedSpritesheetCacheNamePrefix";
import type {
  SmoothedSpritesheetPixels,
  SmoothedSpritesheetPixelsGenerator,
} from "./smoothingAlgorithm";
import { smoothingInputsHash } from "./smoothingInputsHash.macro.ts" with { type: "macro" };

/**
 * how long smoothing runs before its dialog shows, so a quick one never
 * flashes it up
 */
const smoothingDialogShowDelayMs = 500;

/**
 * how long a drawn smoothing dialog stays once smoothing is done, so the
 * finished bar and the smoothed sprites are seen
 */
const smoothingDialogLingerMs = 500;

/**
 * named for what the smoothed sheets in it were made with, so a change to the
 * smoothing leaves its old ones behind in a cache of another name
 */
const cacheName = `${smoothedSpritesheetCacheNamePrefix}${smoothingInputsHash(spritesheetFramesJson())}`;

/**
 * everything stored beside the pixels, to make them an
 * {@link SmoothedSpritesheetPixels} again
 */
type StoredGeometry = OverrideProperties<
  Omit<SmoothedSpritesheetPixels, "pixels">,
  { repackedFrameRects: Record<TextureId, FrameRect> }
>;

type SmoothedSpritesheetCacheKey = {
  spritesheetName: SpritesheetName;
  sourceUrl: string;
  smoothUpscale: Xy;
};

/**
 * a smoothed sheet can be stored if its art has a lasting address - an override's blob
 * url is new each session. Dev builds don't store: their smoothing code changes
 * without the hash knowing
 */
const isStorable = ({ sourceUrl }: SmoothedSpritesheetCacheKey) =>
  !import.meta.env.DEV &&
  !sourceUrl.startsWith("blob:") &&
  // only secure contexts have the cache api
  "caches" in globalThis;

const requestUrls = ({
  spritesheetName,
  sourceUrl,
  smoothUpscale: { x, y },
}: SmoothedSpritesheetCacheKey) => {
  const base = `/upscaled-spritesheets/${spritesheetName}/${x}x${y}?source=${encodeURIComponent(sourceUrl)}`;
  return {
    pixelsUrl: `${base}&part=pixels`,
    geometryUrl: `${base}&part=geometry`,
  };
};

const compressed = (bytes: Uint8ClampedArray<ArrayBuffer>) =>
  new Response(
    new Blob([bytes]).stream().pipeThrough(new CompressionStream("gzip")),
  );

const decompressed = async (response: Response) =>
  new Uint8ClampedArray(
    await new Response(
      response.body!.pipeThrough(new DecompressionStream("gzip")),
    ).arrayBuffer(),
  );

/**
 * delete every stored sheet made by other smoothing code - best effort, so a
 * failure is only logged
 */
const deleteStaleCaches = async (): Promise<void> => {
  try {
    for (const name of await caches.keys()) {
      if (
        name.startsWith(smoothedSpritesheetCacheNamePrefix) &&
        name !== cacheName
      ) {
        await caches.delete(name);
      }
    }
  } catch (e) {
    console.error(
      new Error("could not delete stale smoothed spritesheets", { cause: e }),
    );
  }
};

/**
 * delete a stored sheet that could not be read, as it would fail the same way
 * every session - best effort, so a failure is only logged
 */
const deleteUnreadableStoredSpritesheet = async (
  key: SmoothedSpritesheetCacheKey,
): Promise<void> => {
  try {
    const cache = await caches.open(cacheName);
    const { pixelsUrl, geometryUrl } = requestUrls(key);
    await Promise.all([cache.delete(pixelsUrl), cache.delete(geometryUrl)]);
  } catch (e) {
    console.error(
      new Error("could not delete an unreadable smoothed spritesheet", {
        cause: e,
      }),
    );
  }
};

let staleCachesDeleted: Promise<void> | undefined;

/**
 * a smoothed sheet stored by an earlier session, if there is one
 */
const readStoredSmoothedSpritesheet = async (
  key: SmoothedSpritesheetCacheKey,
): Promise<SmoothedSpritesheetPixels | undefined> => {
  if (!isStorable(key)) {
    return undefined;
  }
  staleCachesDeleted ??= deleteStaleCaches();
  const { pixelsUrl, geometryUrl } = requestUrls(key);
  try {
    const cache = await caches.open(cacheName);
    const [pixelsResponse, geometryResponse] = await Promise.all([
      cache.match(pixelsUrl),
      cache.match(geometryUrl),
    ]);
    if (pixelsResponse === undefined || geometryResponse === undefined) {
      return undefined;
    }
    const geometry = (await geometryResponse.json()) as StoredGeometry;
    return {
      ...geometry,
      pixels: await decompressed(pixelsResponse),
      repackedFrameRects: new Map(entries(geometry.repackedFrameRects)),
    };
  } catch (e) {
    console.error(
      new Error("could not read a stored smoothed spritesheet", { cause: e }),
    );
    // not awaited: smoothing again need not wait for the deletion
    deleteUnreadableStoredSpritesheet(key);
    return undefined;
  }
};

/**
 * keep a smoothed sheet for later sessions
 */
const storeSmoothedSpritesheet = async (
  key: SmoothedSpritesheetCacheKey,
  { pixels, repackedFrameRects, ...geometry }: SmoothedSpritesheetPixels,
): Promise<void> => {
  if (!isStorable(key)) {
    return;
  }
  const cache = await caches.open(cacheName);
  const { pixelsUrl, geometryUrl } = requestUrls(key);
  await cache.put(pixelsUrl, compressed(pixels));
  await cache.put(
    geometryUrl,
    Response.json({
      ...geometry,
      repackedFrameRects: fromAllEntries(repackedFrameRects),
    } satisfies StoredGeometry),
  );
};

/**
 * null where the browser has no display-p3 canvases
 */
const displayP3Context = (
  canvas: OffscreenCanvas,
): null | OffscreenCanvasRenderingContext2D => {
  try {
    return canvas.getContext("2d", { colorSpace: "display-p3" });
  } catch {
    // a browser that does not know the colour space rejects the option outright
    return null;
  }
};

/**
 * the smoothed sheet as a png, for the css sprites.
 *
 * The game's sheet is deliberately over-saturated by putting it into p3
 * without adjusting the values; the png is too, by taking the same numbers as
 * p3. Where p3 is unavailable it falls back to srgb - less saturated, but
 * still upscaled.
 */
const smoothedSpritesheetPixelsToPng = (
  smoothedSpritesheetPixels: SmoothedSpritesheetPixels,
): Promise<Blob> => {
  const { pixels, pixelWidth, pixelHeight } = smoothedSpritesheetPixels;
  const canvas = new OffscreenCanvas(pixelWidth, pixelHeight);
  const p3Context = displayP3Context(canvas);
  // image data wants straight alpha and the pixels are premultiplied, but
  // every pixel is fully opaque or fully transparent, where the two agree
  if (p3Context === null) {
    const srgbContext = canvas.getContext("2d");
    if (srgbContext === null) {
      throw new Error("upscaled spritesheet png: canvas has no 2d context");
    }
    srgbContext.putImageData(
      new ImageData(pixels, pixelWidth, pixelHeight),
      0,
      0,
    );
  } else {
    p3Context.putImageData(
      new ImageData(pixels, pixelWidth, pixelHeight, {
        colorSpace: "display-p3",
      }),
      0,
      0,
    );
  }
  return canvas.convertToBlob({ type: "image/png" });
};

type SmoothSpritesheetPixelsOptions = {
  spritesheetName: SpritesheetName;
  /**
   * where the art comes from - usually implied by spritesheetName but
   * can be overridden for trying new artwork
   */
  sourceUrl: string;
  /**
   * smoothed pixels per source pixel, each axis. x a whole number
   */
  smoothUpscale: Xy;
};

const importSmoothingAlgorithmOnce = importOnce(
  () => import("./smoothingAlgorithm"),
);

/**
 * Smooth a sheet's art, yielding the smoothing's progress from 0 to 1 as it
 * goes - nothing, if it is read back from the device instead. It is of the
 * sheet repacked for upscaling (see `repackSpritesheetForSmoothUpscale`), so its
 * frames are at `repackedFrameRects`, not where the authored image has them.
 * Smoothed sheets are stored on the device with the Cache API, so a later
 * session reads them back rather than smoothing again. Storing them is best
 * effort: where the browser will not store, or a read, write or clean-up
 * fails, it is logged and treated as nothing stored - the sheet is smoothed
 * again, and the failure never counts as a failed smoothing.
 *
 * Returns undefined for a smoothing that `signal` stops part way, and throws
 * for one that fails; neither is stored
 */
async function* smoothSpritesheetPixels(
  options: SmoothSpritesheetPixelsOptions,
  signal: AbortSignal,
): SmoothedSpritesheetPixelsGenerator {
  const stored = await readStoredSmoothedSpritesheet(options);
  if (stored !== undefined) {
    return stored;
  }
  const { spritesheetName, sourceUrl, smoothUpscale } = options;
  const image = await spritesheetArtLoader.load(sourceUrl);
  if (signal.aborted) {
    return undefined;
  }
  // fetched only now, so a sheet read back from the device never fetches it
  const { smoothingAlgorithm } = await importSmoothingAlgorithmOnce();
  if (signal.aborted) {
    return undefined;
  }
  const smoothed = yield* smoothingAlgorithm(
    image,
    spritesheetName,
    smoothUpscale,
    signal,
  );
  const successfulAndNotAborted = smoothed !== undefined;
  if (successfulAndNotAborted) {
    // not awaited: the smoothed sheet is usable now, failure to cache
    // doesn't have to hold it up
    storeSmoothedSpritesheet(options, smoothed).catch((e: unknown) => {
      console.error(
        new Error("could not store a smoothed spritesheet", { cause: e }),
      );
    });
  }
  return smoothed;
}

/**
 * a smoothed sheet as it is held: its pixels, for the GPU, and a png of them,
 * for the css sprites
 */
export type SmoothedSpritesheet = SmoothedSpritesheetPixels & {
  /**
   * object url of the png - revoked once the sheet is no longer held
   */
  pngUrl: string;
};

/**
 * Single place the spritesheet's upscale is started and the result stored.
 *
 * Results are stored as pixels only in ram - from here they need to be processed
 * further to put either on the GPU or into an image for css to use.
 */
export class SpritesheetSmoothingManager {
  /**
   * the latest smoothing, once it is done
   */
  #currentSmoothedSpritesheet: SmoothedSpritesheet | undefined = undefined;

  /**
   * the latest smoothing - undefined until it is done, or if it failed or was
   * stopped, or there is none
   */
  get currentSmoothedSpritesheet(): SmoothedSpritesheet | undefined {
    return this.#currentSmoothedSpritesheet;
  }

  /**
   * smooth for the settings as they are now, stopping when `signal` aborts -
   * or, with none asked for, settle whatever is under way
   */
  async smoothAskedFor(
    dispatch: AppDispatch,
    getState: () => GameRootState,
    signal: AbortSignal,
  ): Promise<void> {
    const inputs = selectSmoothingInputs(getState());
    if (inputs === undefined) {
      // nothing will draw from a smoothed sheet, so its memory goes
      this.#setCurrentSmoothedSpritesheet(undefined);
      if (selectIsSmoothingInProgress(getState())) {
        dispatch(smoothingSettled({ smoothed: undefined }));
      }
      dispatch(closeMenuThunk("smoothing"));
      return;
    }

    dispatch(smoothingStarted(inputs));
    dispatch(
      openMenuThunk({
        dialogId: "smoothing",
        // drawn over the menus, which the player cannot close it with
        alwaysOnTop: true,
        notDismissable: true,
        showAfterDelayMs: smoothingDialogShowDelayMs,
        lingerMs: smoothingDialogLingerMs,
      }),
    );

    // only one smoothing is held at a time
    this.#setCurrentSmoothedSpritesheet(undefined);
    let smoothed = false;
    try {
      const { spritesheetName, sourceUrl, smoothUpscale } = inputs;
      const smoothingProgress = smoothSpritesheetPixels(
        {
          spritesheetName,
          sourceUrl,
          smoothUpscale: { x: smoothUpscale, y: smoothUpscale },
        },
        signal,
      );
      let next = await smoothingProgress.next();
      while (!next.done) {
        if (!signal.aborted) {
          dispatch(smoothingProgressed({ progress: next.value }));
        }
        next = await smoothingProgress.next();
      }
      if (signal.aborted) {
        // stopped for a newer smoothing, which says how it went
        return;
      }
      const maybeSmoothed = next.value;
      if (import.meta.env.DEV && maybeSmoothed === undefined) {
        throw new Error("smoothing returned nothing without being stopped");
      }
      const smoothedPixels = maybeSmoothed!;
      // the css sprites always need it, so it is made with the pixels
      const png = await smoothedSpritesheetPixelsToPng(smoothedPixels);
      if (signal.aborted) {
        return;
      }
      this.#setCurrentSmoothedSpritesheet({
        ...smoothedPixels,
        pngUrl: URL.createObjectURL(png),
      });
      smoothed = true;
      // one that succeeds resets the count of failures
      dispatch(smoothingSucceeded());
    } catch (e) {
      // failing while stopped is the stopping, not a failure
      if (!signal.aborted) {
        console.error(new Error("spritesheet smoothing failed", { cause: e }));
        // counts towards smoothing being turned off on this device
        dispatch(smoothingFailed());
      }
    } finally {
      if (!signal.aborted) {
        dispatch(smoothingSettled({ smoothed: smoothed ? inputs : undefined }));
        dispatch(closeMenuThunk("smoothing"));
      }
    }
  }

  /**
   * drop the smoothing held, so the next is smoothed from scratch
   */
  forget(): void {
    this.#setCurrentSmoothedSpritesheet(undefined);
  }

  #setCurrentSmoothedSpritesheet(
    smoothedSpritesheet: SmoothedSpritesheet | undefined,
  ): void {
    if (this.#currentSmoothedSpritesheet !== undefined) {
      URL.revokeObjectURL(this.#currentSmoothedSpritesheet.pngUrl);
    }
    this.#currentSmoothedSpritesheet = smoothedSpritesheet;
  }
}

/**
 * the game's one manager of spritesheet smoothing - loaded only once
 * smoothing is asked for
 */
export const spritesheetSmoothingManager = new SpritesheetSmoothingManager();
