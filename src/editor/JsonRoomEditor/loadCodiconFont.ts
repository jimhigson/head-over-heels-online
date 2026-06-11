import codiconTtf from "monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.ttf";

/**
 * Registers monaco's codicon icon font with the document at page boot, so it
 * is already loaded (or loading) before the lazily-loaded monaco first
 * paints an icon.
 *
 * Left to monaco, the font only starts downloading when the first icon glyph
 * renders (eg when json validation markers appear in the glyph margin),
 * which is late and unpredictable - icons pop in, and the editor's
 * true-site-size measurement is non-deterministic since the fetch can land
 * either side of the measurement window.
 *
 * The import above resolves to the same fingerprinted asset as the url in
 * monaco's own @font-face css (vite dedupes assets by content hash), so
 * whichever face the browser matches, there is only one download.
 */
export const loadCodiconFont = (): Promise<FontFace> => {
  const fontFace = new FontFace(
    "codicon",
    `url(${codiconTtf}) format("truetype")`,
    { display: "block" },
  );
  document.fonts.add(fontFace);
  return fontFace.load();
};
