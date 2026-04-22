import type { Page } from "@playwright/test";

import { expect, test } from "@playwright/test";
import chalk from "chalk";

import type { DialogId } from "../src/game/components/dialogs/menuDialog/DialogId";
import type { SpriteOption } from "../src/store/slices/gameMenus/gameMenusSlice";

import {
  menuItemDataAttributeDisabled,
  menuItemDataAttributeHidden,
  menuItemDataAttributeId,
} from "../src/game/components/dialogs/menuDialog/dialogs/menus/menuItemDataAttributes";
import { dispatchKeyPress } from "./dispatchKeyPress";
import { formatDuration } from "./formatDuration";
import { maximumWaitForStep } from "./gameTestUtils";
import { logSelectorExistence } from "./logSelectorExistence";
import { osSlowness } from "./osSlowness";
import { elapsed } from "./projectName";
import { retryWithRecovery } from "./retryWithRecovery";
import { menuScreenshotOptions } from "./screenshotOptions";

export const testTimeout = (process.env.CI ? 600_000 : 120_000) * osSlowness;

/** short label for a sprite option: "uncolourised", "toppy", or "" for default BlockStack */
export const spriteOptionName = (spriteOption: SpriteOption): string =>
  spriteOption.uncolourised ? "uncolourised"
  : spriteOption.name === "Toppy" ? "toppy"
    // no name otherwise - because it was the first variant, and I don't want to rename all the old files,
    // Blockstack colourised gets no suffix/name added to files
  : "";

/** dash-prefixed suffix for filenames: "-uncolourised", "-toppy", or "" for default */
export const spriteOptionSuffix = (spriteOption: SpriteOption): string => {
  const name = spriteOptionName(spriteOption);
  return name === "" ? "" : `-${name}`;
};

export const enabledSpriteModes: SpriteOption[] = [
  ...(process.env.NO_BLOCKSTACK ?
    []
  : [{ name: "BlockStack", uncolourised: false } as const]),
  ...(process.env.NO_UNCOLOURISED ?
    []
  : [
      {
        name: "BlockStack",
        uncolourised: true,
      } as const,
    ]),
  ...(process.env.NO_TOPPY ?
    []
  : [{ name: "Toppy", uncolourised: false } as const]),
];

// Track visited dialogs to avoid infinite loops and duplicates
export type VisitedDialogs = Set<DialogId>;

export const getCurrentDialogId = async (
  page: Page,
): Promise<DialogId | null> => {
  const dialogElement = await page.locator("[data-dialog-id]").first();
  const dialogId = await dialogElement.getAttribute("data-dialog-id");
  return dialogId as DialogId | null;
};

export const takeDialogScreenshot = async (
  page: Page,
  dialogId: DialogId,
  logHeader: string,
  filenameSuffix: (null | string)[] | string,
  spriteOption: SpriteOption,
  projectName: string,
) => {
  const resolvedSuffix =
    typeof filenameSuffix === "string" ? filenameSuffix : (
      "-" + filenameSuffix.filter(Boolean).join("-")
    );

  await test.step(`Screenshot: ${dialogId}`, async () => {
    console.log(
      `${logHeader} ${elapsed()} Taking screenshot for dialog: ${chalk.cyan(dialogId)}`,
    );

    await retryWithRecovery({
      async action() {
        await page.waitForSelector(`dialog[data-dialog-id="${dialogId}"]`, {
          timeout: 5_000 * osSlowness,
        });
        await page
          .getByRole("status")
          .waitFor({ state: "detached", timeout: 5_000 * osSlowness });
      },
      logHeader,
      actionDescription: `wait for dialog ${dialogId} without spinner`,
      page,
      screenshotPrefix: `wait-no-spinner-${dialogId}`,
    });

    await takeScreenshot(
      page,
      `${dialogId}${resolvedSuffix}`,
      logHeader,
      spriteOption,
      projectName,
    );
  });
};

/**
 * Hovers a menu item then moves the mouse off-page and fires mouseleave,
 * eliminating :hover style flakiness before taking a screenshot.
 */
export const takeScreenshot = async (
  page: Page,
  screenshotName: string,
  logHeader: string,
  spriteOption: SpriteOption,
  projectName: string,
) => {
  const menuItems = page
    .locator(
      `menu:not([role=menubar]) [${menuItemDataAttributeId}]:not([${menuItemDataAttributeHidden}='true']):not([${menuItemDataAttributeDisabled}='true'])`,
    )
    // close menu items can be hidden (so controllers can exit the dialog)
    .filter({ visible: true });

  if ((await menuItems.count()) > 0) {
    await menuItems.first().hover();
  }

  await page.mouse.move(-1, -1);
  await page.evaluate(() =>
    document.dispatchEvent(new MouseEvent("mouseleave")),
  );

  const screenshotStart = performance.now();

  await expect
    .configure({ timeout: 15_000 * osSlowness })
    .soft(page)
    .toHaveScreenshot(
      `${screenshotName}.png`,
      menuScreenshotOptions(page, spriteOption, projectName),
    );

  console.log(
    `${logHeader} ${elapsed()} ...screenshot took`,
    chalk.yellow(formatDuration(performance.now() - screenshotStart)),
  );
};

export const getSubmenuItems = async (page: Page): Promise<string[]> => {
  // Find all menu items that open submenus
  const submenuItems = await page
    .locator(
      "[data-opens-submenu='true']:not([data-menuitem_hidden='true']):not([data-menuitem_disabled='true'])",
    )
    .all();

  const itemIds: string[] = [];
  for (const item of submenuItems) {
    const id = await item.getAttribute("data-menuitem_id");
    if (id) {
      itemIds.push(id);
    }
  }

  return itemIds;
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
