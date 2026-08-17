import { importOnce } from "../utils/importOnce";

/**
 * Pixi, fetched on demand.
 */
export const importPixiOnce = importOnce(() => import("pixi.js"));
