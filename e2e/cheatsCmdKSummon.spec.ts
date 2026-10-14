import { expect, type Page } from "@playwright/test";

import { advanceUntilTrue } from "./testUtils/advanceGameTime";
import {
  startCampaignViaMenu,
  waitForDialog,
} from "./testUtils/menuNavigation";
import { osSlowness } from "./testUtils/osSlowness";
import { setupE2ePage } from "./testUtils/pageSetup";
import { test } from "./testUtils/test";

/** labels of editor commands that are not items, so can't be summoned */
const nonItemLabels = [
  "Pointer tool",
  "Undo",
  "Save",
  "Playtest",
  "Rotate clockwise",
];

const countSpringsInRoom = (page: Page): Promise<number> =>
  page.evaluate(
    () =>
      Object.values(
        window._e2e_gamePageGameAi?.currentRoom?.items ?? {},
      ).filter((item) => item.type === "spring").length,
  );

const openCheatsCmdK = async (page: Page) => {
  await page.keyboard.press("Control+K");
  await waitForDialog(page, "cmdk");
};

const cmdKOptions = (page: Page) =>
  page.locator('[data-dialog-id="cmdk"] [role="option"]');

test.describe("cheats cmd-k", () => {
  test.setTimeout(120_000 * osSlowness);

  test.beforeEach(async ({ page }, testInfo) => {
    await setupE2ePage(page);
    await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
  });

  test("lists only items", async ({ page }) => {
    await openCheatsCmdK(page);

    const listedValues = await cmdKOptions(page).evaluateAll((options) =>
      options.map((option) => option.getAttribute("data-value") ?? ""),
    );

    expect(listedValues.length).toBeGreaterThan(0);
    expect<string[]>(
      listedValues.filter((listedValue) =>
        nonItemLabels.some((label) => listedValue.startsWith(`${label} `)),
      ),
    ).toEqual([]);
  });

  test("selecting an item summons it", async ({ page }) => {
    const springsBefore = await countSpringsInRoom(page);

    await openCheatsCmdK(page);
    await page.keyboard.type("Spring");
    await cmdKOptions(page)
      .filter({ hasText: /^Spring$/ })
      .click();

    await advanceUntilTrue(
      page,
      async () => (await countSpringsInRoom(page)) > springsBefore,
      "a spring to be summoned into the room",
    );
  });
});
