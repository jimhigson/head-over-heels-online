import type { Page } from "@playwright/test";

import { test } from "@playwright/test";
import chalk from "chalk";

import type { ScreenshotTestOptions } from "./ScreenshotTestOptions";

import { forwardBrowserConsoleToNodeConsole } from "./forwardBrowserConsoleToNodeConsole";
import { logSelectorExistence } from "./logSelectorExistence";
import { logUpscale } from "./logUpscale";
import {
  clickBackButton,
  colourisedModes,
  getCurrentDialogId,
  getSubmenuItems,
  navigateToSubmenu,
  takeDialogScreenshot,
  testTimeout,
  type VisitedDialogs,
} from "./menuSnapshotUtils";
import { osSlowness } from "./osSlowness";
import { formatProjectName } from "./projectName";
import { retryWithRecovery } from "./retryWithRecovery";
import { setIsUncolourised } from "./setIsUncolourised";

const traverseMenuDepthFirst = async (
  page: Page,
  visited: VisitedDialogs,
  logHeader: string,
  projectName: string,
  filenameSuffix: string,
  uncolourised: boolean,
  depth: number = 0,
): Promise<void> => {
  const currentDialogId = await getCurrentDialogId(page);

  if (!currentDialogId) {
    console.log(`${logHeader}: No dialog found, skipping`);
    return;
  }

  if (visited.has(currentDialogId)) {
    console.log(
      `${logHeader}: Dialog ${chalk.cyan(currentDialogId)} already visited, skipping`,
    );
    return;
  }

  const indent = "  ".repeat(depth);
  console.log(
    `${logHeader}: ${indent}Visiting dialog: ${chalk.cyan(currentDialogId)} (depth: ${depth})`,
  );

  // Mark as visited
  visited.add(currentDialogId);

  // Take screenshot
  await takeDialogScreenshot(
    page,
    currentDialogId,
    logHeader,
    filenameSuffix,
    uncolourised,
  );

  // Get all submenu items
  const submenuItemIds = await getSubmenuItems(page);

  console.log(
    `${logHeader}: ${indent}Found ${submenuItemIds.length} submenu items: [${submenuItemIds.join(", ")}]`,
  );

  // Visit each submenu (depth-first)
  for (const itemId of submenuItemIds) {
    console.log(
      `${logHeader}: ${indent}Descending into submenu via: ${chalk.cyan(itemId)}`,
    );

    // Click the menu item to open submenu
    await navigateToSubmenu(page, itemId, logHeader);

    // Recursively visit the submenu
    await traverseMenuDepthFirst(
      page,
      visited,
      logHeader,
      projectName,
      filenameSuffix,
      uncolourised,
      depth + 1,
    );

    // Go back to parent
    console.log(
      `${logHeader}: ${indent}Returning from submenu to: ${chalk.cyan(currentDialogId)}`,
    );
    await clickBackButton(page, logHeader);
  }

  console.log(
    `${logHeader}: ${indent}Finished visiting dialog: ${chalk.cyan(currentDialogId)}`,
  );
};

for (const { uncolourised } of colourisedModes) {
  test.describe("Menu Visual Snapshots", () => {
    test(`Snapshot all menu dialogs (uncolourised = ${uncolourised})`, async ({
      page,
    }, testInfo) => {
      const { mainMenuOnly, noUncolourised } = testInfo.project
        .use as ScreenshotTestOptions;
      if (mainMenuOnly || (uncolourised && noUncolourised)) {
        test.skip();
        return;
      }
      test.setTimeout(testTimeout);

      const formattedName = formatProjectName(testInfo.project.name);
      const filenameSuffix = uncolourised ? "-uncolourised" : "";

      forwardBrowserConsoleToNodeConsole(page, formattedName);

      console.log(`${formattedName} starting menu snapshot test`);

      const visited: VisitedDialogs = new Set();

      await test.step("Navigate to home page and wait for main menu", async () => {
        await retryWithRecovery({
          async action() {
            console.log(`${formattedName}: Navigating to /`);
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
              `${formattedName}: Retrying navigation with page reload`,
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

      await test.step(`set uncolourised user setting to ${uncolourised}`, async () => {
        await setIsUncolourised(page, formattedName, uncolourised);
      });

      try {
        await test.step("Traverse menu tree", async () => {
          await traverseMenuDepthFirst(
            page,
            visited,
            formattedName,
            testInfo.project.name,
            filenameSuffix,
            uncolourised,
          );
        });
      } catch (error) {
        console.error(
          `${formattedName}: Failed during menu traversal - ${error}`,
        );
        await page.screenshot({
          path: `test-results/traversal-failure-${testInfo.project.name}.png`,
          fullPage: false,
        });
        throw error;
      }

      console.log(
        `${formattedName}: ✓ Visited ${visited.size} dialogs: [${Array.from(visited).join(", ")}]`,
      );
    });
  });
}
