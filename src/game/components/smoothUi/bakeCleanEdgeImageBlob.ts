/**
 * Upscale an image (a spritesheet the css shows sprites from) with the same
 * cleanEdge bake the game engine gives its own spritesheets - the same call,
 * on a renderer of its own, so the css sprites and the drawn ones come out of
 * one implementation rather than two.
 *
 * Pixi is imported only when this runs. Smoothing is off by default, so a
 * player who never turns it on never fetches the engine for it; one who does
 * was going to fetch it on starting a game anyway.
 *
 * The renderer's own canvas is 1x1: the size that matters is the render
 * texture's, which is bounded by the largest texture the gpu will hold.
 * Rendering into a canvas that big instead would ask for a webgl context on a
 * drawing buffer of that size, which chromium refuses one step below its own
 * reported maximum.
 *
 * @returns a png blob of the upscaled image, `factor` times the source size
 */
export const bakeCleanEdgeImageBlob = async (
  /** url of the source image (eg the sprites webp asset) */
  imageUrl: string,
  /** integer upscale factor, capped by what the hardware will hold */
  factor: number,
): Promise<Blob> => {
  // imported one at a time and destructured at the await, rather than through
  // a Promise.all whose result is array-destructured: the namespace has to
  // stay whole to pass through the array, which keeps every export of the
  // barrel alive and hands the shared chunk the entire library
  const { Texture, WebGLRenderer } = await import("pixi.js");
  const { bakeCleanEdgeTexture } =
    await import("../../render/filters/cleanEdge/bakeCleanEdgeTexture");

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(
      `cleanEdge ui bake: could not fetch ${imageUrl}: HTTP ${response.status}`,
    );
  }
  // premultiplied to match what the game's bake pipeline samples:
  const bitmap = await createImageBitmap(await response.blob(), {
    premultiplyAlpha: "premultiply",
    colorSpaceConversion: "none",
  });

  // the webgl renderer by name rather than autoDetectRenderer: the game only
  // ever renders with webgl (see the pixi patch), and naming it keeps this
  // bake's reach the same as the game's rather than the union of every
  // backend the detector could have picked
  const renderer = new WebGLRenderer();
  await renderer.init({ width: 1, height: 1, antialias: false });
  const sourceTexture = Texture.from(bitmap);

  try {
    const baked = bakeCleanEdgeTexture(renderer, sourceTexture, factor);
    try {
      const canvas = renderer.extract.canvas(baked);
      const blob =
        canvas.convertToBlob !== undefined ?
          await canvas.convertToBlob({ type: "image/png" })
        : await new Promise<Blob>((resolve, reject) => {
            if (canvas.toBlob === undefined) {
              reject(new Error("cleanEdge ui bake: canvas cannot make a blob"));
              return;
            }
            canvas.toBlob((made) => {
              if (made === null) {
                reject(new Error("cleanEdge ui bake: canvas made no blob"));
                return;
              }
              resolve(made);
            }, "image/png");
          });
      return blob;
    } finally {
      baked.destroy(true);
    }
  } finally {
    sourceTexture.destroy(true);
    // the renderer exists only for this one bake; holding it would keep a
    // second webgl context alive for the rest of the session
    renderer.destroy();
    bitmap.close();
  }
};
