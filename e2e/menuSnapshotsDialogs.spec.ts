import type { Page } from "@playwright/test";

import { test } from "@playwright/test";
import chalk from "chalk";

import type { SpriteOption } from "../src/store/slices/gameMenus/gameMenusSlice";
import type { ScreenshotTestOptions } from "./ScreenshotTestOptions";

import { osSlowness, retryWithRecovery } from "./testUtils/infrastructure";
import {
  elapsed,
  formatProjectName,
  forwardBrowserConsoleToNodeConsole,
  logSelectorExistence,
  logUpscale,
} from "./testUtils/logging";
import {
  clickBackButton,
  getCurrentDialogId,
  navigateToSubmenu,
} from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";
import {
  enabledSpriteModes,
  getSubmenuItems,
  spriteOptionSuffix,
  takeDialogScreenshot,
  testTimeout,
  type VisitedDialogs,
} from "./testUtils/screenshots";
import { setSpriteOption } from "./testUtils/setSpriteOption";

const traverseMenuDepthFirst = async (
  page: Page,
  visited: VisitedDialogs,
  logHeader: string,
  projectName: string,
  spriteOption: SpriteOption,
  depth: number = 0,
): Promise<void> => {
  const currentDialogId = await getCurrentDialogId(page);

  if (!currentDialogId) {
    console.log(`${logHeader} ${elapsed()}: No dialog found, skipping`);
    return;
  }

  if (visited.has(currentDialogId)) {
    console.log(
      `${logHeader} ${elapsed()}: Dialog ${chalk.cyan(currentDialogId)} already visited, skipping`,
    );
    return;
  }

  const indent = "  ".repeat(depth);
  console.log(
    `${logHeader} ${elapsed()}: ${indent}Visiting dialog: ${chalk.cyan(currentDialogId)} (depth: ${depth})`,
  );

  // Mark as visited
  visited.add(currentDialogId);

  // Take screenshot
  await takeDialogScreenshot(
    page,
    currentDialogId,
    logHeader,
    spriteOptionSuffix(spriteOption),
    spriteOption,
    projectName,
  );

  // Get all submenu items
  const submenuItemIds = await getSubmenuItems(page);

  console.log(
    `${logHeader} ${elapsed()}: ${indent}Found ${submenuItemIds.length} submenu items: [${submenuItemIds.join(", ")}]`,
  );

  // Visit each submenu (depth-first)
  for (const itemId of submenuItemIds) {
    console.log(
      `${logHeader} ${elapsed()}: ${indent}Descending into submenu via: ${chalk.cyan(itemId)}`,
    );

    // Click the menu item to open submenu
    await navigateToSubmenu(page, itemId, logHeader);

    // Recursively visit the submenu
    await traverseMenuDepthFirst(
      page,
      visited,
      logHeader,
      projectName,
      spriteOption,
      depth + 1,
    );

    // Go back to parent
    console.log(
      `${logHeader} ${elapsed()}: ${indent}Returning from submenu to: ${chalk.cyan(currentDialogId)}`,
    );
    await clickBackButton(page, logHeader);
  }

  console.log(
    `${logHeader} ${elapsed()}: ${indent}Finished visiting dialog: ${chalk.cyan(currentDialogId)}`,
  );
};

for (const spriteOption of enabledSpriteModes) {
  test.describe(`Menu Visual Snapshots ${JSON.stringify(spriteOption)}`, () => {
    test.beforeEach(async ({ page }) => {
      await setupE2ePage(page);
    });

    test(`Snapshot all menu dialogs ${JSON.stringify(spriteOption)}`, async ({
      page,
    }, testInfo) => {
      const { mainMenuOnly, noUncolourised } = testInfo.project
        .use as ScreenshotTestOptions;
      if (mainMenuOnly || (spriteOption.uncolourised && noUncolourised)) {
        test.skip();
        return;
      }
      test.setTimeout(testTimeout);

      const formattedName = formatProjectName(testInfo.project.name);

      forwardBrowserConsoleToNodeConsole(page, formattedName);

      console.log(`${formattedName} ${elapsed()} starting menu snapshot test`);

      const visited: VisitedDialogs = new Set();

      await test.step("Navigate to home page and wait for main menu", async () => {
        await retryWithRecovery({
          async action() {
            console.log(`${formattedName} ${elapsed()}: Navigating to /`);
            await page.goto("/?track=0");

            // Wait for main menu to appear (it opens automatically)
            const mainMenuSelector = "[data-dialog-id=mainMenu]";
            await page.waitForSelector(mainMenuSelector, {
              timeout: 5_000 * osSlowness,
            });
            await logSelectorExistence(page, mainMenuSelector, formattedName);

            await page.waitForTimeout(500);
          },
          async recovery() {
            // Reload the page on failure
            console.log(
              `${formattedName} ${elapsed()}: Retrying navigation with page reload`,
            );
            await page.reload();
          },
          logHeader: formattedName,
          actionDescription: "navigate to home page and wait for main menu",
          page,
          screenshotPrefix: "initial-navigation",
        });
      });

      await logUpscale(page, formattedName);

      await test.step(`set sprite option to ${JSON.stringify(spriteOption)}`, async () => {
        await setSpriteOption(page, formattedName, spriteOption);
      });

      try {
        await test.step("Traverse menu tree", async () => {
          await traverseMenuDepthFirst(
            page,
            visited,
            formattedName,
            testInfo.project.name,
            spriteOption,
          );
        });
      } catch (error) {
        console.error(
          `${formattedName} ${elapsed()}: Failed during menu traversal - ${error}`,
        );
        await page.screenshot({
          path: `test-results/traversal-failure-${testInfo.project.name}.png`,
          fullPage: false,
        });
        throw error;
      }

      console.log(
        `${formattedName} ${elapsed()}: ✓ Visited ${visited.size} dialogs: [${Array.from(visited).join(", ")}]`,
      );
    });
  });
}
