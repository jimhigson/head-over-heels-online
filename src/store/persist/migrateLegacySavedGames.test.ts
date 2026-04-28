import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { migrateLegacySavedGames } from "./migrateLegacySavedGames";
import { persistVersion } from "./persist";

const LEGACY_KEY = "persist:hohol/gameMenus/userSettings";
const NEW_KEY = "persist:hohol/savedGames";

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
    _persist: JSON.stringify({ version: 17, rehydrated: true }),
  });

/**
 * Parse the post-migration new key. Each top-level field of savedGames was
 * serialised separately by redux-persist, so we double-decode the string
 * fields to reconstruct the slice's logical shape.
 */
const parseNewBlob = (raw: string) => {
  const outer = JSON.parse(raw) as Record<string, string>;
  return {
    saves: JSON.parse(outer.saves) as Record<string, unknown>,
    _persist: JSON.parse(outer._persist) as {
      version: number;
      rehydrated: boolean;
    },
    lastSavedCampaignLocator:
      outer.lastSavedCampaignLocator === undefined ?
        undefined
      : (JSON.parse(outer.lastSavedCampaignLocator) as unknown),
  };
};

const exampleGameInPlay = {
  planetsLiberated: {
    blacktooth: false,
    bookworld: false,
    egyptus: false,
    penitentiary: false,
    safari: false,
  },
  roomsExplored: { egyptus1: true },
  scrollsRead: {},
  freeCharacters: {},
  campaignLocator: {
    userId: "@@original",
    campaignName: "original",
    version: -1,
  },
};

const exampleSaveKey = `{"campaignName":"original","userId":"@@original"}`;

beforeEach(() => {
  // Provide a minimal in-memory window.localStorage. The migration function
  // checks `typeof window === "undefined"` so this also covers that branch.
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

test("oldest save shape (`save.store.gameMenus.gameInPlay`) is lifted to `save.gameInPlay`", () => {
  const legacy = legacyOuterBlob({
    saves: {
      [exampleSaveKey]: {
        saveTime: 1_700_000_000_000,
        gameState: { dummy: true },
        store: { gameMenus: { gameInPlay: exampleGameInPlay } },
      },
    },
    lastSavedCampaignLocator: {
      userId: "@@original",
      campaignName: "original",
      version: -1,
    },
  });
  window.localStorage.setItem(LEGACY_KEY, legacy);

  migrateLegacySavedGames();

  const newRaw = window.localStorage.getItem(NEW_KEY);
  expect(newRaw).not.toBeNull();
  const parsed = parseNewBlob(newRaw!);
  const save = parsed.saves[exampleSaveKey] as Record<string, unknown>;
  expect(save.gameInPlay).toEqual(exampleGameInPlay);
  expect(save.store).toBeUndefined();
  expect(parsed._persist.version).toBe(persistVersion);
  expect(parsed.lastSavedCampaignLocator).toEqual({
    userId: "@@original",
    campaignName: "original",
    version: -1,
  });
  // legacy key removed
  expect(window.localStorage.getItem(LEGACY_KEY)).toBeNull();
});

test("intermediate save shape (`save.store.gameInPlay.gameInPlay`) is also lifted", () => {
  const legacy = legacyOuterBlob({
    saves: {
      [exampleSaveKey]: {
        saveTime: 1_700_000_000_000,
        gameState: { dummy: true },
        store: { gameInPlay: { gameInPlay: exampleGameInPlay } },
      },
    },
  });
  window.localStorage.setItem(LEGACY_KEY, legacy);

  migrateLegacySavedGames();

  const parsed = parseNewBlob(window.localStorage.getItem(NEW_KEY)!);
  const save = parsed.saves[exampleSaveKey] as Record<string, unknown>;
  expect(save.gameInPlay).toEqual(exampleGameInPlay);
  expect(save.store).toBeUndefined();
});

test("newest save shape (`save.gameInPlay` already at root) is preserved unchanged", () => {
  const legacy = legacyOuterBlob({
    saves: {
      [exampleSaveKey]: {
        saveTime: 1_700_000_000_000,
        gameState: { dummy: true },
        gameInPlay: exampleGameInPlay,
      },
    },
  });
  window.localStorage.setItem(LEGACY_KEY, legacy);

  migrateLegacySavedGames();

  const parsed = parseNewBlob(window.localStorage.getItem(NEW_KEY)!);
  const save = parsed.saves[exampleSaveKey] as Record<string, unknown>;
  expect(save.gameInPlay).toEqual(exampleGameInPlay);
});

test("legacy key absent is a no-op", () => {
  migrateLegacySavedGames();
  expect(window.localStorage.getItem(NEW_KEY)).toBeNull();
  expect(window.localStorage.getItem(LEGACY_KEY)).toBeNull();
});

test("legacy key with unparseable JSON: silent failure, but legacy key still removed", () => {
  window.localStorage.setItem(LEGACY_KEY, "not-json{{{");

  migrateLegacySavedGames();

  expect(window.localStorage.getItem(NEW_KEY)).toBeNull();
  expect(window.localStorage.getItem(LEGACY_KEY)).toBeNull();
});

test("new key already populated: legacy is removed but the existing new save is not clobbered", () => {
  const legacy = legacyOuterBlob({
    saves: {
      [exampleSaveKey]: {
        saveTime: 1_700_000_000_000,
        gameState: { dummy: true },
        store: { gameMenus: { gameInPlay: exampleGameInPlay } },
      },
    },
  });
  const existingNewBlob = JSON.stringify({
    saves: JSON.stringify({
      existing: { saveTime: 999, gameInPlay: { keep: true } },
    }),
    _persist: JSON.stringify({ version: persistVersion, rehydrated: true }),
  });
  window.localStorage.setItem(LEGACY_KEY, legacy);
  window.localStorage.setItem(NEW_KEY, existingNewBlob);

  migrateLegacySavedGames();

  expect(window.localStorage.getItem(NEW_KEY)).toBe(existingNewBlob);
  expect(window.localStorage.getItem(LEGACY_KEY)).toBeNull();
});
