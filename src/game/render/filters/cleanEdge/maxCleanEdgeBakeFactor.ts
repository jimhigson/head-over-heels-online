import { spritesheetSideLength } from "../../../../../gfx/spritesheetMeta/spritesheetSize";

/**
 * what to assume where the hardware cannot be asked - server-side rendering,
 * or a context that will not open. Four is what this cap used to be fixed at:
 * a 4096² backing store, which every gpu the game can run on will hold
 */
const assumedBakeFactor = 4;

/** the largest texture this gpu will hold, or undefined if it cannot be asked */
const askHardware = (): number | undefined => {
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

let asked: number | undefined;

/**
 * How many times over the spritesheet may be upscaled before the baked
 * texture is larger than the hardware will hold.
 *
 * Asked of the gpu rather than assumed: the answer is 4096 on the oldest
 * hardware the game runs on but 8192 or 16384 on most of it, and a sheet
 * baked to the screen's real upscale looks better than one stopped short of
 * it. The answer cannot change while the page is open, so it is asked once.
 */
export const maxCleanEdgeBakeFactor = (): number => {
  asked ??= askHardware();
  return asked === undefined ? assumedBakeFactor : (
      Math.max(1, Math.floor(asked / spritesheetSideLength))
    );
};
