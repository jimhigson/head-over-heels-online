import { imageSize } from "image-size";

/** every sheet the game draws from - all square, all the same size */
const sheetPaths = [
  "gfx/sprites.webp",
  "gfx/spritesToppy.webp",
  "gfx/spritesDebug.webp",
  "gfx/sprites.borders.png",
];

/**
 * The side length, in pixels, of the game's spritesheets on-disk.
 *
 * import using `with { type: "macro" };` since uses node code to get the number
 */
export const spritesheetSideLength = (): number => {
  const sizes = sheetPaths.map((path) => {
    const { width, height } = imageSize(path);
    if (width === undefined || height === undefined || width !== height) {
      throw new Error(`${path} is ${width}x${height}, not a square sheet`);
    }
    return { path, sideLength: width };
  });
  const [{ sideLength }] = sizes;
  const odd = sizes.find((sheet) => sheet.sideLength !== sideLength);
  if (odd !== undefined) {
    throw new Error(
      `${odd.path} is ${odd.sideLength}px, but the other sheets are ${sideLength}px`,
    );
  }
  return sideLength;
};
