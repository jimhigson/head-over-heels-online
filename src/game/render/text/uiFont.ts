import smoothFontUrl from "../../../_generated/font/blockstack-head-over-heels-smooth.woff2";
import baseFontUrl from "../../../_generated/font/blockstack-head-over-heels.woff2";

/**
 * The ui fonts are loaded dynamically (there is no static css `@font-face`):
 * a player whose persisted settings already have smooth sprites on boots
 * straight into the smooth font and never fetches the base one, and vice
 * versa. Importing the urls above costs nothing - the fetch only happens when
 * a variant is first ensured.
 */

export type UiFontVariant = "base" | "smooth";

export const uiFontFamilies = {
  base: "HeadOverHeels",
  smooth: "HeadOverHeelsSmooth",
} as const satisfies { [V in UiFontVariant]: string };

const fontUrls = {
  base: baseFontUrl,
  smooth: smoothFontUrl,
} as const satisfies { [V in UiFontVariant]: string };

const loading = new Map<UiFontVariant, Promise<FontFace>>();

/**
 * load (once per session) and register the given ui font variant; resolves
 * when the font is usable
 */
export const ensureUiFontLoaded = (variant: UiFontVariant): Promise<FontFace> =>
  loading.getOrInsertComputed(variant, async () => {
    const fontFace = new FontFace(
      uiFontFamilies[variant],
      `url(${fontUrls[variant]}) format("woff2")`,
    );
    await fontFace.load();
    document.fonts.add(fontFace);
    return fontFace;
  });

