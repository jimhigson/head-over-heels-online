import { importOnce } from "../utils/importOnce.ts";

/**
 * make sure things are only imported once (even if brought in by multiple files)
 * by using this dynamic import helper
 */

export const importSpritesheet = importOnce(() => import("./spriteSheet.ts"));
