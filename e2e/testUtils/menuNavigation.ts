import { expect, type Page, test } from "@playwright/test";
import chalk from "chalk";

import { type DialogId } from "../../src/game/components/dialogs/menuDialog/DialogId";
import { dispatchKeyPress } from "./gameInteractions";
import { maximumWaitForStep, waitForGameState } from "./gameStateQueries";
import { osSlowness } from "./infrastructure";
import {
  elapsed,
  formatDuration,
  formatProjectName,
  logSelectorExistence,
} from "./logging";

const longTimeout = 30_000 * osSlowness;

export const playGameMenuItemSelector = "[data-menuitem_id=playGame]";

export const getCurrentDialogId = async (
  page: Page,
): Promise<DialogId | null> => {
  const dialogElement = await page.locator("[data-dialog-id]").first();
  const dialogId = await dialogElement.getAttribute("data-dialog-id");
  return dialogId as DialogId | null;
};

export const startGame = async (
  page: Page,
  projectName: string,
  campaignSelector: string,
) => {
  let cancelled = false;

  await Promise.race([
    (async () => {
      const formattedName = formatProjectName(projectName);

      let stepStart = performance.now();
      await page.goto("/?cheats=1&track=0");
      console.log(
        `${formattedName} ${elapsed()}: goto took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) {
        return;
      }

      console.log(`${formattedName} ${elapsed()}: clicking Play The Game...`);
      stepStart = performance.now();
      await logSelectorExistence(page, playGameMenuItemSelector, formattedName);
      console.log(
        `${formattedName} ${elapsed()}: logSelectorExistence (playGame) took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) {
        return;
      }

      stepStart = performance.now();
      await page.click(playGameMenuItemSelector);
      console.log(
        `${formattedName} ${elapsed()}: click (playGame) took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) {
        return;
      }

      console.log(`${formattedName} ${elapsed()}: choosing campaign...`);
      stepStart = performance.now();
      await logSelectorExistence(page, campaignSelector, formattedName);
      console.log(
        `${formattedName} ${elapsed()}: logSelectorExistence (campaign) took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) {
        return;
      }

      stepStart = performance.now();
      await page.click(campaignSelector);
      console.log(
        `${formattedName} ${elapsed()}: click (campaign) took ${formatDuration(performance.now() - stepStart)}`,
      );
    })(),
    new Promise<never>((_, reject) =>
      setTimeout(() => {
        cancelled = true;
        return reject(
          new Error(
            `Timeout starting game after ${formatDuration(maximumWaitForStep)}`,
          ),
        );
      }, maximumWaitForStep),
    ),
  ]);
};

export const startCampaignViaMenu = async (
  page: Page,
  projectName: string,
  campaignMenuItemId: "originalGame" | "remake",
) => {
  const formattedName = formatProjectName(projectName);
  await startGame(
    page,
    projectName,
    `[data-menuitem_id=${campaignMenuItemId}]`,
  );
  await waitForGameState(page);
  await exitCrownsDialog(page, formattedName);
  await page
    .locator('[data-dialog-id="crowns"]')
    .waitFor({ state: "detached" });
};

/**
 * Cycle the Skin switch in Display Options until the named label is shown.
 * Caller must already be on a screen where the Options menu item is visible
 * (e.g. the initial main menu).
 */
export const setSkinViaMenus = async (
  page: Page,
  projectName: string,
  targetLabel: "BlockStack" | "Speccy" | "Toppy",
) => {
  const formattedName = formatProjectName(projectName);
  await navigateToSubmenu(page, "options", formattedName);
  await page.locator('[data-dialog-id="modernisationOptions"]').waitFor();
  await navigateToSubmenu(page, "display", formattedName);
  await page.locator('[data-dialog-id="displayOptions"]').waitFor();

  const skinItem = page.locator('[data-menuitem_id="spritesOption"]');
  for (let i = 0; i < 4; i++) {
    if ((await skinItem.textContent())?.includes(targetLabel)) {
      return;
    }
    await skinItem.click();
  }
  expect((await skinItem.textContent()) ?? "").toContain(targetLabel);
};

/** Back out of any open submenus until the main menu is reached. */
export const backToMainMenu = async (page: Page, projectName: string) => {
  const formattedName = formatProjectName(projectName);
  for (let i = 0; i < 5; i++) {
    if (
      await page
        .locator('[data-dialog-id="mainMenu"]')
        .isVisible()
        .catch(() => false)
    ) {
      return;
    }
    await clickBackButton(page, formattedName);
  }
};

export const navigateToSubmenu = async (
  page: Page,
  menuItemId: string,
  logHeader: string,
) => {
  console.log(
    `${logHeader} ${elapsed()}: Clicking menu item: ${chalk.cyan(menuItemId)}`,
  );

  const selector = `[data-menuitem_id="${menuItemId}"]`;
  // playwright's click auto-waits for the item to be visible, stable and
  // enabled, so no retry is needed - a genuinely missing item is a real failure
  await page.click(selector);
};

export const clickBackButton = async (page: Page, logHeader: string) => {
  console.log(`${logHeader} ${elapsed()}: Clicking back button`);

  // the dialog currently on top, so we can wait for it to actually change:
  const dialogBefore = await getCurrentDialogId(page);

  const backSelector = "[data-to-parent-menu='true']";
  if ((await page.locator(backSelector).count()) > 0) {
    await page.click(backSelector);
  } else {
    // no back button - press Escape to leave the dialog
    await page.keyboard.press("Escape");
  }

  // wait for the top dialog to change (or disappear) rather than guessing a
  // fixed settle time - the menu transition is what the next step depends on:
  await page.waitForFunction(
    (previous) =>
      document
        .querySelector("[data-dialog-id]")
        ?.getAttribute("data-dialog-id") !== previous,
    dialogBefore,
    { timeout: longTimeout },
  );
};

export const clickPlayTheGame = async (page: Page, logHeader: string) => {
  await test.step("Click Play The Game", async () => {
    console.log(`${logHeader} ${elapsed()}: Clicking Play The Game`);
    // the campaign-select menu item the next step clicks auto-waits, so this
    // click just needs to land - playwright auto-waits for actionability:
    await page.click(playGameMenuItemSelector);
  });
};

export const clickOriginalCampaign = async (page: Page, logHeader: string) => {
  await test.step("Click Original Campaign", async () => {
    console.log(`${logHeader} ${elapsed()}: Clicking Original Campaign`);
    await page.click("[data-menuitem_id=originalGame]");
  });
};

const crownsDialogSelector = "[data-dialog-id=crowns]";

/**
 * dismiss the crowns dialog, which opens whenever a new game starts. It shows a
 * LOADING banner ({@link role}=status) while the game loads and only becomes
 * clickable once loading is done, so wait for the banner to leave before
 * clicking - clicking while it still loads is ignored.
 */
export const exitCrownsDialog = async (page: Page, logHeader: string) => {
  await test.step("Exit crowns dialog", async () => {
    const crownsDialog = page.locator(crownsDialogSelector);

    await crownsDialog.waitFor({ state: "visible", timeout: longTimeout });
    // the LOADING banner (role=status) is present only while the game loads;
    // wait for it to leave so the dialog's onClick is wired up:
    await crownsDialog
      .locator('[role="status"]')
      .waitFor({ state: "detached", timeout: longTimeout });

    console.log(`${logHeader} ${elapsed()}: dismissing crowns dialog`);
    await crownsDialog.click();
    await crownsDialog.waitFor({ state: "detached", timeout: longTimeout });
  });
};

export const openInGameMainMenu = async (page: Page, logHeader: string) => {
  await test.step("Open in-game main menu", async () => {
    console.log(
      `${logHeader} ${elapsed()}: Pressing Escape to open in-game main menu`,
    );
    await dispatchKeyPress(page, "Escape", "Escape");
    await page
      .locator("[data-dialog-id=mainMenu]")
      .waitFor({ state: "visible", timeout: longTimeout });
  });
};

/** Generous timeout to wait through game-over and animation pauses. */
export const waitForDialog = async (
  page: Page,
  dialogId: string,
  {
    state = "visible",
    timeout = longTimeout,
  }: {
    state?: "attached" | "detached" | "hidden" | "visible";
    timeout?: number;
  } = {},
) => {
  await page
    .locator(`[data-dialog-id="${dialogId}"]`)
    .waitFor({ state, timeout });
  if (state === "visible" || state === "attached") {
    // the Suspense fallback dialog carries no data-dialog-id, so the wait
    // above already proves the lazy chunk loaded; this additionally waits for
    // any in-dialog loading spinner. Count-based so multiple role=status
    // nodes can't strict-mode-throw. Bounded rather than strict because some
    // spinners are legitimately long-lived (eg the community games list while
    // its db fetch is in flight) - the snapshot helper does the strict wait
    await expect(page.locator('[role="status"]'))
      .toHaveCount(0, { timeout })
      .catch(() => {});
  }
};
