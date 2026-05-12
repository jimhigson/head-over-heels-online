import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { migrateLegacySavedGames } from "./migrateLegacySavedGames";

const LEGACY_KEY = "persist:hohol/gameMenus/userSettings";
const NEW_SAVED_GAMES_KEY = "persist:hohol/savedGames";
const NEW_USER_SETTINGS_KEY = "persist:hohol/userSettings";
const LEGACY_PERSIST_VERSION = 17;

/**
 * Build the legacy outer redux-persist blob (the JSON string stored under
 * LEGACY_KEY in localStorage). redux-persist stores each whitelisted
 * top-level slice field as its own JSON-encoded string inside the outer
 * object — so `userSettings` and `savedGames` are double-encoded strings.
 */
const legacyOuterBlob = (savedGames: object, userSettings: object = {}) =>
  JSON.stringify({
    userSettings: JSON.stringify(userSettings),
    savedGames: JSON.stringify(savedGames),
    _persist: JSON.stringify({
      version: LEGACY_PERSIST_VERSION,
      rehydrated: true,
    }),
  });

/**
 * Parse a post-migration new key. Each top-level field was serialised
 * separately by redux-persist, so we double-decode to reconstruct the
 * logical shape.
 */
const parseNewBlob = (raw: string) => {
  const outer = JSON.parse(raw) as Record<string, string>;
  const result: Record<string, unknown> = {
    _persist: JSON.parse(outer._persist),
  };
  for (const [k, v] of Object.entries(outer)) {
    if (k !== "_persist") {
      result[k] = JSON.parse(v);
    }
  }
  return result;
};

const exampleSaveKey = `{"campaignName":"original","userId":"@@original"}`;

const exampleGameInPlay = {
  planetsLiberated: {
    blacktooth: false,
    bookworld: false,
    egyptus: false,
    penitentiary: false,
    safari: false,
  },
};

beforeEach(() => {
  const store = new Map<string, string>();
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => store.set(k, v),
      removeItem: (k: string) => store.delete(k),
    },
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test("savedGames blob is re-keyed without shape transformation", () => {
  const saveData = {
    saves: {
      [exampleSaveKey]: {
        saveTime: 1_700_000_000_000,
        store: { gameMenus: { gameInPlay: exampleGameInPlay } },
      },
    },
    lastSavedCampaignLocator: {
      userId: "@@original",
      campaignName: "original",
      version: -1,
    },
  };
  window.localStorage.setItem(LEGACY_KEY, legacyOuterBlob(saveData));

  migrateLegacySavedGames();

  const parsed = parseNewBlob(
    window.localStorage.getItem(NEW_SAVED_GAMES_KEY)!,
  );
  const save = (parsed.saves as Record<string, Record<string, unknown>>)[
    exampleSaveKey
  ];
  // shape rewriting is now done by createMigrate, not by re-keying
  expect(save.store).toEqual({ gameMenus: { gameInPlay: exampleGameInPlay } });
  expect(parsed.lastSavedCampaignLocator).toEqual(
    saveData.lastSavedCampaignLocator,
  );
});

test("preserves the original _persist version for both slices", () => {
  const userSettings = { infiniteLivesPoke: true };
  window.localStorage.setItem(
    LEGACY_KEY,
    legacyOuterBlob({ saves: {} }, userSettings),
  );

  migrateLegacySavedGames();

  const savedGamesParsed = parseNewBlob(
    window.localStorage.getItem(NEW_SAVED_GAMES_KEY)!,
  );
  const userSettingsParsed = parseNewBlob(
    window.localStorage.getItem(NEW_USER_SETTINGS_KEY)!,
  );
  expect((savedGamesParsed._persist as { version: number }).version).toBe(
    LEGACY_PERSIST_VERSION,
  );
  expect((userSettingsParsed._persist as { version: number }).version).toBe(
    LEGACY_PERSIST_VERSION,
  );
});

test("userSettings is re-keyed", () => {
  const userSettings = {
    displaySettings: {},
    soundSettings: { mute: true },
    infiniteLivesPoke: true,
  };
  window.localStorage.setItem(
    LEGACY_KEY,
    legacyOuterBlob({ saves: {} }, userSettings),
  );

  migrateLegacySavedGames();

  const parsed = parseNewBlob(
    window.localStorage.getItem(NEW_USER_SETTINGS_KEY)!,
  );
  expect(parsed.userSettings).toEqual(userSettings);
});

test("legacy key is removed after migration", () => {
  window.localStorage.setItem(LEGACY_KEY, legacyOuterBlob({ saves: {} }));

  migrateLegacySavedGames();

  expect(window.localStorage.getItem(LEGACY_KEY)).toBeNull();
});

test("legacy key absent is a no-op", () => {
  migrateLegacySavedGames();
  expect(window.localStorage.getItem(NEW_SAVED_GAMES_KEY)).toBeNull();
  expect(window.localStorage.getItem(NEW_USER_SETTINGS_KEY)).toBeNull();
});

test("unparseable JSON: silent failure, legacy key still removed", () => {
  window.localStorage.setItem(LEGACY_KEY, "not-json{{{");

  migrateLegacySavedGames();

  expect(window.localStorage.getItem(NEW_SAVED_GAMES_KEY)).toBeNull();
  expect(window.localStorage.getItem(NEW_USER_SETTINGS_KEY)).toBeNull();
  expect(window.localStorage.getItem(LEGACY_KEY)).toBeNull();
});

test("existing new keys are not clobbered", () => {
  window.localStorage.setItem(
    LEGACY_KEY,
    legacyOuterBlob({ saves: { old: true } }, { old: true }),
  );
  const existingSavedGames = JSON.stringify({ saves: "{}", _persist: "{}" });
  const existingUserSettings = JSON.stringify({
    userSettings: "{}",
    _persist: "{}",
  });
  window.localStorage.setItem(NEW_SAVED_GAMES_KEY, existingSavedGames);
  window.localStorage.setItem(NEW_USER_SETTINGS_KEY, existingUserSettings);

  migrateLegacySavedGames();

  expect(window.localStorage.getItem(NEW_SAVED_GAMES_KEY)).toBe(
    existingSavedGames,
  );
  expect(window.localStorage.getItem(NEW_USER_SETTINGS_KEY)).toBe(
    existingUserSettings,
  );
  expect(window.localStorage.getItem(LEGACY_KEY)).toBeNull();
});
