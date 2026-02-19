import type {
  Page,
  PageAssertionsToHaveScreenshotOptions,
} from "@playwright/test";

import { expect, test } from "@playwright/test";
import chalk from "chalk";

import type { DialogId } from "../src/game/components/dialogs/menuDialog/DialogId";

import spritesheetColours from "../src/_generated/palette/spritesheetPalette.json" with { type: "json" };
import {
  menuItemDataAttributeDisabled,
  menuItemDataAttributeHidden,
  menuItemDataAttributeId,
} from "../src/game/components/dialogs/menuDialog/dialogs/menus/menuItemDataAttributes";
import { dispatchKeyPress } from "./dispatchKeyPress";
import { formatDuration } from "./formatDuration";
import { logSelectorExistence } from "./logSelectorExistence";
import { osSlowness } from "./osSlowness";
import { retryWithRecovery } from "./retryWithRecovery";

export const testTimeout = (process.env.CI ? 600_000 : 120_000) * osSlowness;

export const colourisedModes =
  process.env.NO_UNCOLOURISED ?
    [{ uncolourised: false }]
  : [{ uncolourised: false }, { uncolourised: true }];

export const screenshotOptions = (
  page: Page,
  uncolourised: boolean,
): PageAssertionsToHaveScreenshotOptions => ({
  fullPage: false,
  scale: "device" as const,
  animations: "disabled" as const,
  // unlike in-game screenshots, this is using html rendering so needs to be a bit more lenient:
  threshold: 0.1,
  // non-integer scaling can sometimes cause different snapping of scaled
  // nearest-neighbour graphics:
  // results tend to be about 5M pixels, so 0.0001 is ~1,000 pixels difference allowed
  maxDiffPixelRatio: 0.0002,
  timeout: 10_000 * osSlowness,
  mask: [page.locator("[data-screenshot-mask]")],
  maskColor: uncolourised ? "#ff00ff" : spritesheetColours.pink,
});

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
  uncolourised: boolean,
) => {
  const resolvedSuffix =
    typeof filenameSuffix === "string" ? filenameSuffix : (
      "-" + filenameSuffix.filter(Boolean).join("-")
    );

  await test.step(`Screenshot: ${dialogId}`, async () => {
    console.log(
      `${logHeader} Taking screenshot for dialog: ${chalk.cyan(dialogId)}`,
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
      uncolourised,
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
  uncolourised: boolean,
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
      screenshotOptions(page, uncolourised),
    );

  console.log(
    `${logHeader} ...screenshot took`,
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
        `${logHeader}: Clicking menu item: ${chalk.cyan(menuItemId)}`,
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
      console.log(`${logHeader}: Clicking back button`);

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
        console.log(`${logHeader}: Clicking Play The Game`);
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
        console.log(`${logHeader}: Clicking Original Campaign`);
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

export const exitCrownsDialog = async (page: Page, logHeader: string) => {
  await test.step("Exit crowns dialog", async () => {
    await retryWithRecovery({
      async action() {
        const crownsDialogSelector = "[data-dialog-id=crowns]";
        console.log(`${logHeader}: Exiting crowns dialog`);
        await page.click(crownsDialogSelector);

        await page.waitForSelector(crownsDialogSelector, {
          state: "detached",
          timeout: 5_000 * osSlowness,
        });
        await page.waitForTimeout(500);
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
        console.log(`${logHeader}: Pressing Escape to open in-game main menu`);
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
