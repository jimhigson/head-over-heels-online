import { createMigrate } from "redux-persist";
import type { UnknownRecord } from "type-fest";

import { migrateSavedCharacterRoomsInPlace } from "../game/gameState/saving/migrateSavedCharacterRoomsInPlace";
import type { SavedCharacterRooms } from "../game/gameState/saving/SavedGameState";
import { valuesIter } from "../utils/entries";
import {
  type LegacyPickupsSavedGame,
  movePickupsCollectedToGameInPlayInPlace,
} from "./movePickupsCollectedToGameInPlayInPlace";
import { savesInReincarnationChain } from "./savesInReincarnationChain";

/**
 * a save as the last release (v27) wrote it
 */
type V27SavedGame = LegacyPickupsSavedGame & {
  gameState: { characterRooms: SavedCharacterRooms<string> };
  gameInPlay: { reincarnationPoint?: V27SavedGame };
};

/**
 * the savedGames slice's schema migrations, by the persist version that
 * introduced each
 */
export const savedGamesMigrations = createMigrate({
  // v23: lift gameInPlay snapshot to root of each save, migrating the legacy
  // store.gameMenus.gameInPlay / store.gameInPlay.gameInPlay nesting
  23(state) {
    if (!state) {
      return state;
    }
    const s = state as UnknownRecord;
    const saves = s.saves as Record<string, UnknownRecord> | undefined;
    if (!saves) {
      return state;
    }
    for (const save of Object.values(saves)) {
      const store = save.store as Record<string, UnknownRecord> | undefined;
      if (!store) {
        continue;
      }
      const legacyInner =
        store.gameInPlay?.gameInPlay ?? store.gameMenus?.gameInPlay;
      if (legacyInner !== undefined) {
        save.gameInPlay = legacyInner;
        delete save.store;
      }
    }
    return state;
  },
  // v28: pickupsCollected moved from each save's gameState to its gameInPlay.
  // Saved rooms are also brought up to the current item formats here, so a
  // save never needs migrating as it loads
  28(state) {
    if (!state) {
      return state;
    }
    const { saves } = state as unknown as {
      saves: Record<string, V27SavedGame>;
    };
    for (const save of valuesIter(saves)) {
      for (const chainedSave of savesInReincarnationChain(save)) {
        movePickupsCollectedToGameInPlayInPlace(chainedSave);
        migrateSavedCharacterRoomsInPlace(chainedSave.gameState.characterRooms);
      }
    }
    return state;
  },
});
