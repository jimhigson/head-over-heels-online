//import type { GameMenusSlicePersisted as GameMenusSlicePersistedProduction } from "hohjs-production/src/store/persist/persist";

/**
 * This file is commented out, but useful. It checks that the values saved to the
 * store are backwards compatible with the current production version, so that it
 * can be guaranteed to be able to load current saves.
 *
 * This is really useful and works like magic when uncommented.
 *
 * However, it fails typechecking. Pnpm can't have two packages of the same name with
 * different dependencies, so it tries to use the same pixi.js version for both. This
 * fails because pixi has breaking changes in its types.
 *
 * Unfortunately this means this can't work on CI/CD, although it probably can when
 * main and production use the same pixi version (or different versions where pixi
 * didn't break semver between them)
 *
 * Uncomment to manually check this before a release I guess :-/
 */
import { test } from "vitest";

test("current GameMenusSlicePersisted can be assigned from a save made in the production version", () => {
  // const fakeProductionSave = {} as unknown as GameMenusSlicePersistedProduction;
  // const checkCanLoad = (_save: GameMenusSlicePersisted) => {};
  //checkCanLoad(fakeProductionSave);
});
