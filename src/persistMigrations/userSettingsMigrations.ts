import { createMigrate } from "redux-persist";
import { type UnknownRecord } from "type-fest";

import { type PokesEnabled } from "../store/slices/userSettings/userSettingsSlice";

/**
 * the userSettings slice's schema migrations, by the persist version that
 * introduced each
 */
export const userSettingsMigrations = createMigrate({
  // v23: move poke fields into pokesEnabled and rename
  23(state) {
    if (!state) {
      return state;
    }
    const { userSettings, ...otherSliceState } = state as UnknownRecord;
    const us = userSettings as undefined | UnknownRecord;
    if (!us) {
      return state;
    }
    // old names:
    const { infiniteLivesPoke, infiniteDoughnutsPoke, ...usRest } = us;
    return {
      ...otherSliceState,
      userSettings: {
        ...usRest,
        pokesEnabled: {
          // new names:
          infiniteLives: infiniteLivesPoke as boolean,
          infiniteDoughnuts: infiniteDoughnutsPoke as boolean,
        } satisfies PokesEnabled,
      },
    } as unknown as typeof state;
  },
  // v28: the sprites option became a spritesheet name - drop the old object
  28(state) {
    const { displaySettings } = (
      state as unknown as {
        userSettings: { displaySettings: { sprites?: unknown } };
      }
    ).userSettings;
    if (typeof displaySettings.sprites !== "string") {
      delete displaySettings.sprites;
    }
    return state;
  },
});
