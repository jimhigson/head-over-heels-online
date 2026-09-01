import smoothFontUrl from "../../../_generated/font/blockstack-head-over-heels-smooth.woff2";
import baseFontUrl from "../../../_generated/font/blockstack-head-over-heels.woff2";

/**
 * The ui fonts are loaded dynamically (there is no static css `@font-face`):
 * a player whose persisted settings already have smooth sprites on boots
 * straight into the smooth font, and vice versa - each consumer fetches only
 * the variant it draws with. Importing the urls above costs nothing - the
 * fetch only happens when a variant is first ensured.
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
const registered = new Set<UiFontVariant>();

/**
 * load (once per session) and register the given ui font variant; resolves
 * when the font is usable
 */
export const loadHudFont = (variant: UiFontVariant): Promise<FontFace> =>
  loading.getOrInsertComputed(variant, async () => {
    const fontFace = new FontFace(
      uiFontFamilies[variant],
      `url(${fontUrls[variant]}) format("woff2")`,
    );
    await fontFace.load();
    document.fonts.add(fontFace);
    registered.add(variant);
    return fontFace;
  });

/** whether {@link loadHudFont} has already completed for this variant */
export const isUiFontLoaded = (variant: UiFontVariant): boolean =>
  registered.has(variant);

/**
 * the variant to draw with at a given backing-store resolution: above 1x the
 * extra pixels are only worth having if the glyph outlines have detail to put
 * in them, which is what the smooth variant's traced curves provide
 */
export const uiFontVariantAtResolution = (resolution: number): UiFontVariant =>
  resolution > 1 ? "smooth" : "base";
