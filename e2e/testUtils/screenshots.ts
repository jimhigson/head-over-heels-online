import type {
  Page,
  PageAssertionsToHaveScreenshotOptions,
} from "@playwright/test";

import { expect, test } from "@playwright/test";
import chalk from "chalk";

import type { DialogId } from "../../src/game/components/dialogs/menuDialog/DialogId";
import type { SpriteOption } from "../../src/store/slices/gameMenus/gameMenusSlice";

import spritesheetColours from "../../src/_generated/palette/spritesheetPalette.json" with { type: "json" };
import {
  menuItemDataAttributeDisabled,
  menuItemDataAttributeHidden,
  menuItemDataAttributeId,
} from "../../src/game/components/dialogs/menuDialog/dialogs/menus/menuItemDataAttributes";
import { osSlowness, retryWithRecovery } from "./infrastructure";
import { elapsed, formatDuration } from "./logging";

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

/**
 * Heuristic for whether the current environment supports P3 colour space
 * in canvas rendering. Linux CI runners using WebKit/Safari don't support
 * P3, causing slight colour differences from macOS-captured snapshots.
 * In these environments we need a more lenient per-pixel threshold.
 */
const supportsP3ColourSpace = (projectName: string): boolean => {
  if (!process.env.CI || process.platform !== "linux") return true;

  const name = projectName.toLowerCase();
  return !name.includes("webkit") && !name.includes("safari");
};

/** options for in-game canvas screenshots (room snapshots) — zero diff pixels allowed */
export const roomScreenshotOptions = (
  projectName: string,
): PageAssertionsToHaveScreenshotOptions => ({
  fullPage: false,
  // playwright default is 0.2, which is very permissive to palette changes.
  // Whereas 0 makes builds fail with invisible differences between
  // the OS running the test, at least in webkit/safari.
  // Keep a much smaller threshold than normal, but not zero:
  threshold: supportsP3ColourSpace(projectName) ? 0.02 : 0.2,
  // use smaller 'css' screenshots to reduce file size:
  scale: "css",
  maxDiffPixels: 0,
});

/**
 * options for menu/dialog screenshots (HTML rendering).
 * Unlike in-game screenshots, this is using html rendering so needs to be
 * a bit more lenient.
 */
export const menuScreenshotOptions = (
  page: Page,
  spriteOption: SpriteOption,
  projectName: string,
): PageAssertionsToHaveScreenshotOptions => ({
  fullPage: false,
  // use smaller 'css' screenshots to reduce file size:
  scale: "css",
  animations: "disabled",
  threshold: supportsP3ColourSpace(projectName) ? 0.1 : 0.2,
  // non-integer scaling can sometimes cause different snapping of scaled
  // nearest-neighbour graphics:
  // results tend to be about 5M pixels, so 0.0001 is ~1,000 pixels difference allowed
  maxDiffPixelRatio: 0.0002,
  timeout: 10_000 * osSlowness,
  mask: [page.locator(".screenshot-mask")],
  maskColor: spriteOption.uncolourised ? "#ff00ff" : spritesheetColours.pink,
});
