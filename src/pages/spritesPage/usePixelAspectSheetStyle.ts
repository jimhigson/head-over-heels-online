import { type JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

import { importBakeUpscaledSpritesheetBlobOnce } from "../../game/components/upscaledSpritesUi/bakeUpscaledSpritesheetBlobForCss.import";
import { spritesheetArtUrls } from "../../game/components/upscaledSpritesUi/spritesheetArtUrls";
import { maxSpritesheetUpscale } from "../../game/render/filters/upscale/maxSpritesheetUpscale";
import { palPixelAspect } from "../../originalGame";
import { type SpritesheetName } from "../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { useAppSelector } from "../../store/hooks";
import {
  selectIsUpscaledSprites,
  useSpritesheetArtName,
} from "../../store/slices/gameMenus/gameMenusSelectors";
import { type PixelAspectName } from "./pixelAspectNames";

declare module "preact" {
  // augmenting preact's JSX.CSSProperties requires a namespace here
  // eslint-disable-next-line no-namespace
  namespace JSX {
    interface CSSProperties {
      "--pixelAspectY"?: number;
    }
  }
}

/**
 * the sheet the css sprites draw from and the squash of their height, set
 * on a container of them
 */
export type PixelAspectSheetStyle = Pick<
  JSX.CSSProperties,
  "--pixelAspectY" | "--spritesheetArtUrl"
>;

export type PixelAspectSheet = {
  /**
   * undefined for square pixels, where the sprites are left as the page
   * draws them
   */
  style: PixelAspectSheetStyle | undefined;
  /**
   * how much shorter than square the pixels are shown
   */
  pixelAspectY: number;
};

type BakedSheet = {
  objectUrl: string;
  pixelAspectY: number;
  /**
   * what the sheet was baked for, so a render for another scale or sheet
   * does not draw it in the meantime
   */
  forScale: number;
  forSheet: SpritesheetName;
};

const hasArtUrl = (
  name: SpritesheetName,
): name is keyof typeof spritesheetArtUrls => name in spritesheetArtUrls;

/**
 * how the css sprites show the pixel aspect chosen: for PAL's pixels, their
 * height squashed to them and, while the smooth upscale is on, drawn from a
 * sheet baked at `scale` pixels wide and PAL's share of that tall, so each
 * baked pixel lands on one of the page's
 */
export const usePixelAspectSheetStyle = (
  pixelAspect: PixelAspectName,
  /**
   * the page's pixels per source pixel
   */
  scale: number,
): PixelAspectSheet => {
  const spritesheetArtName = useSpritesheetArtName();
  const upscaled = useAppSelector(selectIsUpscaledSprites);
  const [bakedSheet, setBakedSheet] = useState<BakedSheet | undefined>(
    undefined,
  );
  const artUrl =
    hasArtUrl(spritesheetArtName) ?
      spritesheetArtUrls[spritesheetArtName]
    : undefined;

  useEffect(() => {
    setBakedSheet(undefined);
    if (pixelAspect !== "PAL" || !upscaled || artUrl === undefined) {
      return;
    }
    let cancelled = false;
    let objectUrl: string | undefined;
    const bake = async () => {
      const { bakeUpscaledSpritesheetBlobForCss } =
        await importBakeUpscaledSpritesheetBlobOnce();
      // a whole number of pixels wide, as far as the hardware will hold
      const bakeScale = Math.min(Math.round(scale), maxSpritesheetUpscale());
      const { blob, upscale } = await bakeUpscaledSpritesheetBlobForCss(
        artUrl,
        { x: bakeScale, y: bakeScale / palPixelAspect },
        spritesheetArtName,
      );
      if (cancelled) {
        return;
      }
      objectUrl = URL.createObjectURL(blob);
      setBakedSheet({
        objectUrl,
        pixelAspectY: upscale.y / upscale.x,
        forScale: scale,
        forSheet: spritesheetArtName,
      });
    };
    bake();
    return () => {
      cancelled = true;
      if (objectUrl !== undefined) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [pixelAspect, upscaled, artUrl, spritesheetArtName, scale]);

  if (pixelAspect === "square") {
    return { style: undefined, pixelAspectY: 1 };
  }
  if (
    bakedSheet === undefined ||
    bakedSheet.forScale !== scale ||
    bakedSheet.forSheet !== spritesheetArtName
  ) {
    return {
      style: { "--pixelAspectY": 1 / palPixelAspect },
      pixelAspectY: 1 / palPixelAspect,
    };
  }
  return {
    style: {
      "--spritesheetArtUrl": `url("${bakedSheet.objectUrl}")`,
      "--pixelAspectY": bakedSheet.pixelAspectY,
    },
    pixelAspectY: bakedSheet.pixelAspectY,
  };
};
