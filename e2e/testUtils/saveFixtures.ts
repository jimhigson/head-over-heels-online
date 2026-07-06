import { type Page } from "@playwright/test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * a captured save-game fixture: the complete `persist:`-prefixed localStorage
 * of a game that has saved in the named room, exactly as the capturing
 * version wrote it. Loading one of these into the current version proves
 * save-game compatibility with the version that captured it.
 */
export type SaveFixture = {
  /** the full semver of the game that wrote this save, eg "22.0.0" */
  capturedFromVersion: string;
  /** iso date the fixture was captured */
  capturedDate: string;
  /** the room the game had saved in when the capture was taken */
  roomId: string;
  /**
   * the persisted localStorage, keyed by localStorage key, with redux-persist's
   * double-stringified fields parsed to plain objects for readable diffs.
   * Re-encoded by {@link seedCapturedLocalStorage} when loading.
   */
  localStorage: Record<string, Record<string, unknown>>;
};

/**
 * where the library of save fixtures lives, one directory per capturing major
 * version (v22, v23...), one json file per room. Committed to the repo so the
 * library grows as versions are released. Cwd-relative: playwright and the
 * capture script both run from the repo root.
 */
export const saveFixturesDir = path.resolve("e2e/fixtures/saves");

/**
 * redux-persist re-stringifies each top-level value when writing to
 * localStorage, so seeding needs to match that format
 */
export const toPersistedValue = (obj: Record<string, unknown>): string =>
  JSON.stringify(
    Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, JSON.stringify(v)]),
    ),
  );

/**
 * seed a captured localStorage into the page before it loads the game
 */
export const seedCapturedLocalStorage = async (
  page: Page,
  captured: Record<string, Record<string, unknown>>,
): Promise<void> => {
  const entries = Object.entries(captured).map(
    ([key, value]) =>
      [
        key,
        key.startsWith("persist:") ?
          toPersistedValue(value)
        : JSON.stringify(value),
      ] as [string, string],
  );
  await page.addInitScript((seedEntries) => {
    localStorage.clear();
    for (const [key, value] of seedEntries) {
      localStorage.setItem(key, value);
    }
  }, entries);
};

/**
 * read all `persist:`-prefixed localStorage from the page, parsing
 * redux-persist's double-stringified fields to plain objects
 */
export const harvestPersistedLocalStorage = (
  page: Page,
): Promise<Record<string, Record<string, unknown>>> =>
  page.evaluate(() => {
    const harvested: Record<string, Record<string, unknown>> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      if (!key.startsWith("persist:")) {
        continue;
      }
      const envelope = JSON.parse(localStorage.getItem(key)!) as Record<
        string,
        unknown
      >;
      harvested[key] = Object.fromEntries(
        Object.entries(envelope).map(([field, value]) => [
          field,
          typeof value === "string" ? JSON.parse(value) : value,
        ]),
      );
    }
    return harvested;
  });

export type SaveFixtureFile = {
  /** the capture directory name, eg "v22" */
  versionDir: string;
  /** absolute path of the fixture json */
  filePath: string;
  fixture: SaveFixture;
};

/**
 * synchronously list every committed save fixture, for generating one test
 * per (version, room) at collection time
 */
export const listSaveFixtures = (): SaveFixtureFile[] => {
  if (!existsSync(saveFixturesDir)) {
    // no fixtures captured yet - the load spec generates no tests:
    return [];
  }
  const versionDirs = readdirSync(saveFixturesDir, {
    withFileTypes: true,
  }).filter((entry) => entry.isDirectory());

  return versionDirs.flatMap((versionDir) => {
    const dirPath = path.join(saveFixturesDir, versionDir.name);
    return readdirSync(dirPath)
      .filter((file) => file.endsWith(".json"))
      .map((file) => {
        const filePath = path.join(dirPath, file);
        return {
          versionDir: versionDir.name,
          filePath,
          fixture: JSON.parse(readFileSync(filePath, "utf-8")) as SaveFixture,
        };
      });
  });
};

/**
 * collect console errors and uncaught page errors from the page into the
 * returned array - attach before navigating, assert empty at the end of the
 * test
 */
export const collectPageErrors = (page: Page): string[] => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(`console.error: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    errors.push(`uncaught error: ${error.message}`);
  });
  return errors;
};
