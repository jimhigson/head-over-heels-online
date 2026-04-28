import type { Page } from "@playwright/test";

import { expect, test } from "@playwright/test";
import chalk from "chalk";

import type { DialogId } from "../../src/game/components/dialogs/menuDialog/DialogId";

import { dispatchKeyPress } from "./gameInteractions";
import { waitForGameState } from "./gameStateQueries";
import { maximumWaitForStep } from "./gameStateQueries";
import {
  osSlowness,
  retryWithRecovery,
  slownessForHumanObserver,
} from "./infrastructure";
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
      if (cancelled) return;

      console.log(`${formattedName} ${elapsed()}: clicking Play The Game...`);
      stepStart = performance.now();
      await logSelectorExistence(page, playGameMenuItemSelector, formattedName);
      console.log(
        `${formattedName} ${elapsed()}: logSelectorExistence (playGame) took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) return;

      stepStart = performance.now();
      await page.click(playGameMenuItemSelector);
      console.log(
        `${formattedName} ${elapsed()}: click (playGame) took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) return;

      console.log(`${formattedName} ${elapsed()}: choosing campaign...`);
      stepStart = performance.now();
      await logSelectorExistence(page, campaignSelector, formattedName);
      console.log(
        `${formattedName} ${elapsed()}: logSelectorExistence (campaign) took ${formatDuration(performance.now() - stepStart)}`,
      );
      if (cancelled) return;

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
    if ((await skinItem.textContent())?.includes(targetLabel)) return;
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
  await retryWithRecovery({
    async action() {
      console.log(
        `${logHeader} ${elapsed()}: Clicking menu item: ${chalk.cyan(menuItemId)}`,
      );

      const selector = `[data-menuitem_id="${menuItemId}"]`;
      await logSelectorExistence(page, selector, logHeader);

      // small pause so the menu item is visibly highlighted before the click
      // when watching tests run in headed mode
      await page.waitForTimeout(slownessForHumanObserver());
      await page.click(selector);
    },
    logHeader,
    actionDescription: `click menu item ${menuItemId}`,
    page,
    screenshotPrefix: `click-${menuItemId}`,
  });
};

export const clickBackButton = async (page: Page, logHeader: string) => {
  await retryWithRecovery({
    async action() {
      console.log(`${logHeader} ${elapsed()}: Clicking back button`);

      const backSelector = "[data-to-parent-menu='true']";
      const backButtonExists = await page.locator(backSelector).count();

      if (backButtonExists > 0) {
        await page.click(backSelector);
        await page.waitForTimeout(500);
      } else {
        // If no back button, press Escape
        await page.keyboard.press("Escape");
        await page.waitForTimeout(500);
      }
    },
    logHeader,
    actionDescription: "click back button",
    page,
    screenshotPrefix: "click-back",
  });
};

export const clickPlayTheGame = async (page: Page, logHeader: string) => {
  await test.step("Click Play The Game", async () => {
    await retryWithRecovery({
      async action() {
        const playGameSelector = "[data-menuitem_id=playGame]";
        console.log(`${logHeader} ${elapsed()}: Clicking Play The Game`);
        await logSelectorExistence(page, playGameSelector, logHeader);
        await page.click(playGameSelector);
        await page.waitForTimeout(500);
      },
      logHeader,
      actionDescription: "click Play The Game",
      page,
      screenshotPrefix: "crowns-play-game",
    });
  });
};

export const clickOriginalCampaign = async (page: Page, logHeader: string) => {
  await test.step("Click Original Campaign", async () => {
    await retryWithRecovery({
      async action() {
        const originalGameSelector = "[data-menuitem_id=originalGame]";
        console.log(`${logHeader} ${elapsed()}: Clicking Original Campaign`);
        await logSelectorExistence(page, originalGameSelector, logHeader);
        await page.click(originalGameSelector);
        await page.waitForTimeout(500);
      },
      logHeader,
      actionDescription: "click Original Campaign",
      page,
      screenshotPrefix: "crowns-original-game",
    });
  });
};

const crownsDialogSelector = "[data-dialog-id=crowns]";

export const exitCrownsDialog = async (page: Page, logHeader: string) => {
  await test.step("Exit crowns dialog", async () => {
    await retryWithRecovery({
      async action(attempt) {
        const isRetry = attempt > 0;
        let cancelled = false;

        await Promise.race([
          (async () => {
            if (isRetry) {
              const stepStart = performance.now();
              await page
                .screenshot({
                  path: `test-results/crowns-attempt-${attempt}-before-check.png`,
                  fullPage: false,
                })
                .catch(() => {});
              console.log(
                `${logHeader} ${elapsed()}: screenshot (before-check) took ${formatDuration(performance.now() - stepStart)}`,
              );
              if (cancelled) return;
            }

            const crownsDialogVisible = await page
              .locator(crownsDialogSelector)
              .isVisible()
              .catch(() => false);
            if (cancelled) return;

            if (crownsDialogVisible) {
              console.log(
                `${logHeader} ${elapsed()}: exiting crowns dialog...`,
              );

              if (isRetry) {
                const stepStart = performance.now();
                await page
                  .screenshot({
                    path: `test-results/crowns-attempt-${attempt}-before-click.png`,
                    fullPage: false,
                  })
                  .catch(() => {});
                console.log(
                  `${logHeader} ${elapsed()}: screenshot (before-click) took ${formatDuration(performance.now() - stepStart)}`,
                );
                if (cancelled) return;

                await logSelectorExistence(
                  page,
                  crownsDialogSelector,
                  logHeader,
                );
              }

              await page.click(crownsDialogSelector);
              console.log(`${logHeader} ${elapsed()}: crowns dialog closed`);
            } else {
              if (isRetry) {
                const stepStart = performance.now();
                await page
                  .screenshot({
                    path: `test-results/crowns-attempt-${attempt}-already-closed.png`,
                    fullPage: false,
                  })
                  .catch(() => {});
                console.log(
                  `${logHeader} ${elapsed()}: screenshot (already-closed) took ${formatDuration(performance.now() - stepStart)}`,
                );
                if (cancelled) return;
              }

              console.log(
                `${logHeader} ${elapsed()}: crowns dialog not shown, continuing...`,
              );
            }
          })(),
          new Promise<never>((_, reject) =>
            setTimeout(() => {
              cancelled = true;
              return reject(
                new Error(
                  `Timeout exiting crowns dialog after ${formatDuration(maximumWaitForStep)}`,
                ),
              );
            }, maximumWaitForStep),
          ),
        ]);
      },
      logHeader,
      actionDescription: "exit crowns dialog",
      page,
      screenshotPrefix: "exit-crowns",
    });
  });
};

export const openInGameMainMenu = async (page: Page, logHeader: string) => {
  await test.step("Open in-game main menu", async () => {
    await retryWithRecovery({
      async action() {
        console.log(
          `${logHeader} ${elapsed()}: Pressing Escape to open in-game main menu`,
        );
        await dispatchKeyPress(page, "Escape", "Escape");
        await page.waitForTimeout(500);

        const inGameMainMenuSelector = "[data-dialog-id=mainMenu]";
        await page.waitForSelector(inGameMainMenuSelector, {
          timeout: 5_000 * osSlowness,
        });
        await logSelectorExistence(page, inGameMainMenuSelector, logHeader);
      },
      logHeader,
      actionDescription: "open in-game main menu",
      page,
      screenshotPrefix: "open-ingame-main-menu",
    });
  });
};

/** Generous timeout to wait through game-over and animation pauses. */
export const waitForDialog = (
  page: Page,
  dialogId: string,
  {
    state = "visible",
    timeout = longTimeout,
  }: {
    state?: "attached" | "detached" | "hidden" | "visible";
    timeout?: number;
  } = {},
) => page.locator(`[data-dialog-id="${dialogId}"]`).waitFor({ state, timeout });
