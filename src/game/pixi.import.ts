import { importOnce } from "../utils/importOnce";

/**
 * Pixi, fetched on demand.
 *
 * Only the parts a caller destructures are kept - the namespace never escapes
 * into a value the bundler has to preserve whole, which is what would drag the
 * entire library into the shared chunk that loads before the main menu.
 */
export const importPixiOnce = importOnce(() => import("pixi.js"));
