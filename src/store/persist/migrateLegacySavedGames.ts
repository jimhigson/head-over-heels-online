/**
 * Re-key the legacy combined-slice localStorage entry into separate per-slice keys.
 *
 * The legacy shape: a single localStorage key
 * `persist:hohol/gameMenus/userSettings` (version 17) holding `userSettings`,
 * `savedGames`, and `_persist` in one blob.
 *
 * This migration splits that blob into:
 *   - `persist:hohol/savedGames`
 *   - `persist:hohol/userSettings`
 *
 * Both preserve the original `_persist` version from the legacy blob so that
 * each slice's own `createMigrate` (in persist.ts) runs all applicable schema
 * migrations on rehydration.
 *
 * Runs once at store-init, before redux-persist reads from localStorage.
 * The legacy entry is removed after splitting.
 *
 * If the legacy key is absent or unparseable the function is a no-op.
 */
const LEGACY_KEY = "persist:hohol/gameMenus/userSettings";
const NEW_SAVED_GAMES_KEY = "persist:hohol/savedGames";
const NEW_USER_SETTINGS_KEY = "persist:hohol/userSettings";

type LegacySavedGamesBlob = {
  saves?: Record<string, unknown>;
  lastSavedCampaignLocator?: unknown;
};

export const migrateLegacySavedGames = () => {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  const legacyRaw = window.localStorage.getItem(LEGACY_KEY);
  if (legacyRaw === null) {
    return;
  }

  try {
    const legacyOuter = JSON.parse(legacyRaw) as Record<string, string>;

    // re-key savedGames, splitting the blob into separate top-level fields
    // to match the new persistConfig's expected shape
    const savedGamesRaw = legacyOuter.savedGames;
    if (typeof savedGamesRaw === "string") {
      if (window.localStorage.getItem(NEW_SAVED_GAMES_KEY) === null) {
        const blob = JSON.parse(savedGamesRaw) as LegacySavedGamesBlob;
        const newOuter: Record<string, string> = {
          saves: JSON.stringify(blob.saves ?? {}),
          _persist: legacyOuter._persist,
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

    // re-key userSettings
    const userSettingsRaw = legacyOuter.userSettings;
    if (typeof userSettingsRaw === "string") {
      if (window.localStorage.getItem(NEW_USER_SETTINGS_KEY) === null) {
        const newOuter: Record<string, string> = {
          userSettings: userSettingsRaw,
          _persist: legacyOuter._persist,
        };
        window.localStorage.setItem(
          NEW_USER_SETTINGS_KEY,
          JSON.stringify(newOuter),
        );
      }
    }
  } catch {
    // legacy blob unparseable — drop silently; user gets initial state
  }

  window.localStorage.removeItem(LEGACY_KEY);
};
