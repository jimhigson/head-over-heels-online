import headOverHeelsWoff2 from "../_generated/font/blockstack-head-over-heels.woff2";

/**
 * Registers the generated Head over Heels webfont with the document so that
 * `font-family: "HeadOverHeels"` resolves. The woff2 url is resolved and
 * fingerprinted by Vite through the import above.
 */
export const loadHeadOverHeelsFont = (): Promise<FontFace> => {
  const fontFace = new FontFace(
    "HeadOverHeels",
    `url(${headOverHeelsWoff2}) format("woff2")`,
    { display: "block", weight: "normal", style: "normal" },
  );
  document.fonts.add(fontFace);
  return fontFace.load();
};
