import type { Page } from "@playwright/test";

import { expect, test } from "@playwright/test";

import { localStorage_v22 } from "./fixtures/localStorage_v22";
import { waitForGameState } from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import { setupE2ePage } from "./testUtils/pageSetup";

/**
 * redux-persist re-stringifies each top-level value when writing to localStorage,
 * so we need to match that format
 */
const toPersistedValue = (obj: Record<string, unknown>) =>
  JSON.stringify(
    Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, JSON.stringify(v)]),
    ),
  );

const seedLocalStorage = async (
  page: Page,
  captured: Record<string, Record<string, unknown>>,
) => {
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

test.describe("redux-persist migrations", () => {
  test.setTimeout(60_000 * osSlowness);

  test.beforeEach(async ({ page }) => {
    await setupE2ePage(page);
  });

  test("v22 localStorage loads and game starts with migrated save", async ({
    page,
  }) => {
    await seedLocalStorage(page, localStorage_v22);

    await page.goto("/?track=0");
    await waitForGameState(page);

    const pokesEnabled = await page.evaluate(
      () =>
        window._e2e_store?.getState().userSettings.userSettings.pokesEnabled,
    );
    expect(pokesEnabled).toEqual({
      infiniteLives: true,
      infiniteDoughnuts: undefined,
    });
  });
});
