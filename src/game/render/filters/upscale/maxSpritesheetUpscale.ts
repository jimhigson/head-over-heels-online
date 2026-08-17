import { spritesheetSideLength } from "../../../../../gfx/spritesheetMeta/spritesheetSize" with { type: "macro" };

/**
 * what to assume where the hardware cannot be asked - server-side rendering,
 * or a context that will not open. Four is what this cap used to be fixed at:
 * a 4096² backing store, which every gpu the game can run on will hold
 */
const assumedSpritesheetUpscale = 4;

/** the largest texture this gpu will hold, or undefined if it cannot be asked
 *
 * Typical max texture sizes
 *  4096 - smallest for hardware the game supports
 *  8192 or 16384 = more common
 */
const askHardwareForLargestTextureSize = (): number | undefined => {
  if (typeof document === "undefined") {
    return undefined;
  }
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
  if (gl === null) {
    return undefined;
  }
  const size: unknown = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  // the probe context is of no further use, and holding it would keep a gpu
  // context alive for nothing
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return typeof size === "number" && size > 0 ? size : undefined;
};

const computeFactor = (): number => {
  const largestTextureSize = askHardwareForLargestTextureSize();
  return largestTextureSize === undefined ?
      assumedSpritesheetUpscale
    : Math.max(1, Math.ceil(largestTextureSize / spritesheetSideLength()));
};

let cachedAnswer: number | undefined;

/**
 * How many times over the spritesheet may be upscaled before the baked
 * texture is larger than the hardware will hold.
 */
export const maxSpritesheetUpscale = (): number =>
  (cachedAnswer ??= computeFactor());
