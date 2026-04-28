import { persistVersion } from "./persist";

/**
 * One-shot migration that lifts saved games out of the legacy combined-slice
 * persist shape into the dedicated `savedGames` localStorage key.
 *
 * The legacy shape: a single localStorage key
 * `persist:hohol/gameMenus/userSettings` (set by an earlier combined
 * `gameMenusSlice` persistConfig, version 17) holding both `userSettings`
 * and `savedGames`. Each `SavedGame` inside that blob carries its
 * gameInPlay snapshot at `save.store.gameMenus.gameInPlay`.
 *
 * Runs once at store-init, before redux-persist's persistor reads from
 * localStorage. It lifts the `savedGames` blob into the new
 * `persist:hohol/savedGames` key (preserving the user's saved games),
 * rewrites each save's inner shape so the gameInPlay snapshot lives at
 * `save.gameInPlay` (no redux-state-mirror nesting), and removes the
 * legacy entry.
 *
 * `userSettings` is dropped: losing user preferences is acceptable, and
 * dropping them avoids a cross-version schema reconciliation. If the
 * legacy key is absent or unparseable the function is a no-op.
 */
const LEGACY_KEY = "persist:hohol/gameMenus/userSettings";
const NEW_SAVED_GAMES_KEY = "persist:hohol/savedGames";

type LegacySavedGameInner = {
  /**
   * Legacy redux-state-mirror nesting; either `store.gameMenus.gameInPlay`
   * (oldest), `store.gameInPlay.gameInPlay` (intermediate), or absent (new
   * shape — `gameInPlay` lives at the root of the save).
   */
  store?: {
    gameMenus?: { gameInPlay?: unknown };
    gameInPlay?: { gameInPlay?: unknown };
  };
  gameInPlay?: unknown;
};

type LegacySavedGamesBlob = {
  saves?: Record<string, LegacySavedGameInner>;
  lastSavedCampaignLocator?: unknown;
};

/**
 * Walks the savedGames blob and lifts each save's gameInPlay snapshot to
 * the root of the save (dropping any `.store.gameMenus.gameInPlay` /
 * `.store.gameInPlay.gameInPlay` redux-state-mirror nesting). Idempotent —
 * saves already on the new shape are left untouched.
 */
const rewriteSaveStoreShapes = (blob: LegacySavedGamesBlob): void => {
  const saves = blob.saves ?? {};
  for (const id of Object.keys(saves)) {
    const save = saves[id];
    if (save === undefined) continue;
    const legacyInner =
      save.store?.gameInPlay?.gameInPlay ?? save.store?.gameMenus?.gameInPlay;
    if (legacyInner !== undefined) {
      save.gameInPlay = legacyInner;
      delete save.store;
    }
  }
};

export const migrateLegacySavedGames = () => {
  if (typeof window === "undefined" || !window.localStorage) return;

  const legacyRaw = window.localStorage.getItem(LEGACY_KEY);
  if (legacyRaw === null) return;

  try {
    // redux-persist stores each whitelisted (or top-level state) field as its
    // own JSON-encoded string, wrapped in a flat outer JSON object alongside
    // an `_persist` metadata field.
    const legacyOuter = JSON.parse(legacyRaw) as Record<string, string>;
    const savedGamesRaw = legacyOuter.savedGames;

    if (typeof savedGamesRaw === "string") {
      // don't clobber saves the user has accumulated under the new key
      if (window.localStorage.getItem(NEW_SAVED_GAMES_KEY) === null) {
        const blob = JSON.parse(savedGamesRaw) as LegacySavedGamesBlob;
        rewriteSaveStoreShapes(blob);

        // savedGamesSlice has no whitelist, so each top-level state field is
        // serialised separately under the new key.
        const newOuter: Record<string, string> = {
          saves: JSON.stringify(blob.saves ?? {}),
          _persist: JSON.stringify({
            version: persistVersion,
            rehydrated: true,
          }),
        };
        if (blob.lastSavedCampaignLocator !== undefined) {
          newOuter.lastSavedCampaignLocator = JSON.stringify(
            blob.lastSavedCampaignLocator,
          );
        }
        window.localStorage.setItem(
          NEW_SAVED_GAMES_KEY,
          JSON.stringify(newOuter),
        );
      }
    }
  } catch {
    // legacy blob unparseable — drop silently; user gets initial state
  }

  window.localStorage.removeItem(LEGACY_KEY);
};
