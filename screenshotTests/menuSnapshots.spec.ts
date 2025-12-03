import type {
  Page,
  PageAssertionsToHaveScreenshotOptions,
} from "@playwright/test";

import { expect, test } from "@playwright/test";
import chalk from "chalk";

import type { DialogId } from "../src/game/components/dialogs/menuDialog/DialogId";
import type { goToSubmenu } from "../src/store/slices/gameMenus/gameMenusSlice";

import colours from "../gfx/spritesheetPalette.json" with { type: "json" };
import { dispatchKeyPress } from "./dispatchKeyPress";
import { dispatchToStore } from "./dispatchToStore";
import { formatDuration } from "./formatDuration";
import { forwardBrowserConsoleToNodeConsole } from "./forwardBrowserConsoleToNodeConsole";
import { logSelectorExistence } from "./logSelectorExistence";
import { formatProjectName } from "./projectName";
import { retryWithRecovery } from "./retryWithRecovery";

// CI is slower, needs more time, even on arm64 runners (fastest on github).
// Windows is even slower (on the Github runners at least).
const osSlowness = process.platform === "win32" ? 4 : 1;
const testTimeout = (process.env.CI ? 600_000 : 120_000) * osSlowness;

const screenshotOptions = (
  page: Page,
): PageAssertionsToHaveScreenshotOptions => ({
  fullPage: false,
  scale: "device" as const,
  animations: "disabled" as const,
  // unlike in-game screenshots, this is using html rendering so needs to be a bit more lenient:
  threshold: 0.1,
  maxDiffPixels: 50,
  timeout: 10_000 * osSlowness,
  mask: [page.locator("[data-screenshot-mask]")],
  maskColor: colours.pink,
});

// Track visited dialogs to avoid infinite loops and duplicates
type VisitedDialogs = Set<DialogId>;

const getCurrentDialogId = async (page: Page): Promise<DialogId | null> => {
  const dialogElement = await page.locator("[data-dialog-id]").first();
  const dialogId = await dialogElement.getAttribute("data-dialog-id");
  return dialogId as DialogId | null;
};

const takeDialogScreenshot = async (
  page: Page,
  dialogId: DialogId,
  logHeader: string,
) => {
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

    const screenshotStart = performance.now();

    await expect
      .configure({ timeout: 15_000 * osSlowness })
      .soft(page)
      .toHaveScreenshot(`${dialogId}.png`, screenshotOptions(page));

    console.log(
      `${logHeader} ...screenshot took`,
      chalk.yellow(formatDuration(performance.now() - screenshotStart)),
    );
  });
};

const getSubmenuItems = async (page: Page): Promise<string[]> => {
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

const navigateToSubmenu = async (
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

const clickBackButton = async (page: Page, logHeader: string) => {
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

const traverseMenuDepthFirst = async (
  page: Page,
  visited: VisitedDialogs,
  logHeader: string,
  projectName: string,
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
  await takeDialogScreenshot(page, currentDialogId, logHeader);

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

test.describe("Menu Visual Snapshots", () => {
  test("Snapshot all menu dialogs", async ({ page }, testInfo) => {
    test.setTimeout(testTimeout);

    const formattedName = formatProjectName(testInfo.project.name);

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
          console.log(`${formattedName}: Retrying navigation with page reload`);
          await page.reload();
        },
        logHeader: formattedName,
        actionDescription: "navigate to home page and wait for main menu",
        page,
        screenshotPrefix: "initial-navigation",
      });
    });

    try {
      await test.step("Traverse menu tree", async () => {
        await traverseMenuDepthFirst(
          page,
          visited,
          formattedName,
          testInfo.project.name,
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

  test("Snapshot in game dialogs", async ({ page }, testInfo) => {
    test.setTimeout(testTimeout);

    const formattedName = formatProjectName(testInfo.project.name);

    forwardBrowserConsoleToNodeConsole(page, formattedName);

    console.log(`${formattedName} starting in game dialogs snapshot test`);

    await test.step("Navigate and start original game", async () => {
      await retryWithRecovery({
        async action() {
          console.log(`${formattedName}: Navigating to /`);
          await page.goto("/?track=0");

          // Wait for main menu to appear
          const mainMenuSelector = "[data-dialog-id=mainMenu]";
          await page.waitForSelector(mainMenuSelector, {
            timeout: 5_000 * osSlowness,
          });

          await page.waitForTimeout(500);
        },
        async recovery() {
          console.log(`${formattedName}: Retrying navigation with page reload`);
          await page.reload();
        },
        logHeader: formattedName,
        actionDescription: "navigate to home page",
        page,
        screenshotPrefix: "crowns-initial-navigation",
      });
    });

    await test.step("Click Play The Game", async () => {
      await retryWithRecovery({
        async action() {
          const playGameSelector = "[data-menuitem_id=playGame]";
          console.log(`${formattedName}: Clicking Play The Game`);
          await logSelectorExistence(page, playGameSelector, formattedName);
          await page.click(playGameSelector);
          await page.waitForTimeout(500);
        },
        logHeader: formattedName,
        actionDescription: "click Play The Game",
        page,
        screenshotPrefix: "crowns-play-game",
      });
    });

    await test.step("Click Original Campaign", async () => {
      await retryWithRecovery({
        async action() {
          const originalGameSelector = "[data-menuitem_id=originalGame]";
          console.log(`${formattedName}: Clicking Original Campaign`);
          await logSelectorExistence(page, originalGameSelector, formattedName);
          await page.click(originalGameSelector);
          await page.waitForTimeout(500);
        },
        logHeader: formattedName,
        actionDescription: "click Original Campaign",
        page,
        screenshotPrefix: "crowns-original-game",
      });
    });

    await test.step("Screenshot: crowns", async () => {
      await retryWithRecovery({
        async action() {
          const crownsDialogSelector = "[data-dialog-id=crowns]";
          console.log(`${formattedName}: Waiting for crowns dialog`);
          await page.waitForSelector(crownsDialogSelector, {
            timeout: 5_000 * osSlowness,
          });
          await logSelectorExistence(page, crownsDialogSelector, formattedName);

          await page.waitForTimeout(500);

          console.log(
            `${formattedName} Taking screenshot for dialog: ${chalk.cyan("crowns")}`,
          );
          const screenshotStart = performance.now();

          await expect
            .configure({ timeout: 15_000 * osSlowness })
            .soft(page)
            .toHaveScreenshot("crowns.png", screenshotOptions(page));

          console.log(
            `${formattedName} ...screenshot took`,
            chalk.yellow(formatDuration(performance.now() - screenshotStart)),
          );
        },
        logHeader: formattedName,
        actionDescription: "take crowns dialog screenshot",
        page,
        screenshotPrefix: "crowns-screenshot",
      });
    });

    await test.step("Exit crowns dialog", async () => {
      await retryWithRecovery({
        async action() {
          const crownsDialogSelector = "[data-dialog-id=crowns]";
          console.log(`${formattedName}: Exiting crowns dialog`);
          await page.click(crownsDialogSelector);

          // Wait for the crowns dialog to disappear
          await page.waitForSelector(crownsDialogSelector, {
            state: "detached",
            timeout: 5_000 * osSlowness,
          });
          await page.waitForTimeout(500);
        },
        logHeader: formattedName,
        actionDescription: "exit crowns dialog",
        page,
        screenshotPrefix: "exit-crowns",
      });
    });

    await test.step("Open map dialog", async () => {
      await retryWithRecovery({
        async action() {
          console.log(
            `${formattedName}: Clicking canvas and pressing M to open map`,
          );
          await page.waitForTimeout(500);

          // Click the canvas to activate it and give it focus
          const canvas = page.locator("canvas").first();
          await canvas.click();
          await page.waitForTimeout(200);

          await dispatchKeyPress(page, "m", "KeyM");
          await page.waitForTimeout(500);

          const mapDialogSelector = "[data-dialog-id=map]";
          await page.waitForSelector(mapDialogSelector, {
            timeout: 5_000 * osSlowness,
          });
          await logSelectorExistence(page, mapDialogSelector, formattedName);
        },
        logHeader: formattedName,
        actionDescription: "open map dialog",
        page,
        screenshotPrefix: "open-map",
      });
    });

    await test.step("Screenshot: map", async () => {
      await retryWithRecovery({
        async action() {
          console.log(
            `${formattedName} Taking screenshot for dialog: ${chalk.cyan("map")}`,
          );
          const screenshotStart = performance.now();

          await expect
            .configure({ timeout: 15_000 * osSlowness })
            .soft(page)
            .toHaveScreenshot("map.png", screenshotOptions(page));

          console.log(
            `${formattedName} ...screenshot took`,
            chalk.yellow(formatDuration(performance.now() - screenshotStart)),
          );
        },
        logHeader: formattedName,
        actionDescription: "take map dialog screenshot",
        page,
        screenshotPrefix: "map-screenshot",
      });
    });

    await test.step("Exit map dialog", async () => {
      await retryWithRecovery({
        async action() {
          const mapDialogSelector = "[data-dialog-id=map]";
          console.log(`${formattedName}: Pressing Escape to exit map`);
          await dispatchKeyPress(page, "Escape", "Escape");

          // Wait for the map dialog to disappear
          await page.waitForSelector(mapDialogSelector, {
            state: "detached",
            timeout: 5_000 * osSlowness,
          });
          await page.waitForTimeout(500);
        },
        logHeader: formattedName,
        actionDescription: "exit map dialog",
        page,
        screenshotPrefix: "exit-map",
      });
    });

    await test.step("Open hold dialog", async () => {
      await retryWithRecovery({
        async action() {
          console.log(
            `${formattedName}: Clicking canvas and pressing P to open hold`,
          );
          await page.waitForTimeout(500);

          const canvas = page.locator("canvas").first();
          await canvas.click();
          await page.waitForTimeout(200);

          await dispatchKeyPress(page, "p", "KeyP");
          await page.waitForTimeout(500);

          const holdDialogSelector = "[data-dialog-id=hold]";
          await page.waitForSelector(holdDialogSelector, {
            timeout: 5_000 * osSlowness,
          });
          await logSelectorExistence(page, holdDialogSelector, formattedName);
        },
        logHeader: formattedName,
        actionDescription: "open hold dialog",
        page,
        screenshotPrefix: "open-hold",
      });
    });

    await test.step("Screenshot: hold", async () => {
      await retryWithRecovery({
        async action() {
          console.log(
            `${formattedName} Taking screenshot for dialog: ${chalk.cyan("hold")}`,
          );
          const screenshotStart = performance.now();

          await expect
            .configure({ timeout: 15_000 * osSlowness })
            .soft(page)
            .toHaveScreenshot("hold.png", screenshotOptions(page));

          console.log(
            `${formattedName} ...screenshot took`,
            chalk.yellow(formatDuration(performance.now() - screenshotStart)),
          );
        },
        logHeader: formattedName,
        actionDescription: "take hold dialog screenshot",
        page,
        screenshotPrefix: "hold-screenshot",
      });
    });

    await test.step("Exit hold dialog", async () => {
      await retryWithRecovery({
        async action() {
          const holdDialogSelector = "[data-dialog-id=hold]";
          console.log(`${formattedName}: Pressing P to exit hold`);
          await dispatchKeyPress(page, "p", "KeyP");

          await page.waitForSelector(holdDialogSelector, {
            state: "detached",
            timeout: 5_000 * osSlowness,
          });
          await page.waitForTimeout(500);
        },
        logHeader: formattedName,
        actionDescription: "exit hold dialog",
        page,
        screenshotPrefix: "exit-hold",
      });
    });

    await test.step("Open in-game main menu", async () => {
      await retryWithRecovery({
        async action() {
          console.log(
            `${formattedName}: Pressing Escape to open in-game main menu`,
          );
          await dispatchKeyPress(page, "Escape", "Escape");
          await page.waitForTimeout(500);

          const inGameMainMenuSelector = "[data-dialog-id=mainMenu]";
          await page.waitForSelector(inGameMainMenuSelector, {
            timeout: 5_000 * osSlowness,
          });
          await logSelectorExistence(
            page,
            inGameMainMenuSelector,
            formattedName,
          );
        },
        logHeader: formattedName,
        actionDescription: "open in-game main menu",
        page,
        screenshotPrefix: "open-ingame-main-menu",
      });
    });

    await test.step("Screenshot: main-inGame", async () => {
      await retryWithRecovery({
        async action() {
          console.log(
            `${formattedName} Taking screenshot for dialog: ${chalk.cyan("main-inGame")}`,
          );
          const screenshotStart = performance.now();

          await expect
            .configure({ timeout: 15_000 * osSlowness })
            .soft(page)
            .toHaveScreenshot("main-inGame.png", screenshotOptions(page));

          console.log(
            `${formattedName} ...screenshot took`,
            chalk.yellow(formatDuration(performance.now() - screenshotStart)),
          );
        },
        logHeader: formattedName,
        actionDescription: "take in-game main menu screenshot",
        page,
        screenshotPrefix: "main-inGame-screenshot",
      });
    });

    await test.step("Click progress so far", async () => {
      await retryWithRecovery({
        async action() {
          const progressSelector = "[data-menuitem_id=viewCrowns]";
          console.log(`${formattedName}: Clicking progress so far`);
          await logSelectorExistence(page, progressSelector, formattedName);
          await page.click(progressSelector);
          await page.waitForTimeout(500);

          const scoreDialogSelector = "[data-dialog-id=score]";
          await page.waitForSelector(scoreDialogSelector, {
            timeout: 5_000 * osSlowness,
          });
          await logSelectorExistence(page, scoreDialogSelector, formattedName);
        },
        logHeader: formattedName,
        actionDescription: "click progress so far",
        page,
        screenshotPrefix: "click-progress",
      });
    });

    await test.step("Screenshot: score", async () => {
      await retryWithRecovery({
        async action() {
          console.log(
            `${formattedName} Taking screenshot for dialog: ${chalk.cyan("score")}`,
          );
          const screenshotStart = performance.now();

          await expect
            .configure({ timeout: 15_000 * osSlowness })
            .soft(page)
            .toHaveScreenshot("score.png", screenshotOptions(page));

          console.log(
            `${formattedName} ...screenshot took`,
            chalk.yellow(formatDuration(performance.now() - screenshotStart)),
          );
        },
        logHeader: formattedName,
        actionDescription: "take score dialog screenshot",
        page,
        screenshotPrefix: "score-screenshot",
      });
    });

    await test.step("Screenshot: proclaim emperor", async () => {
      type GoToSubMenuAction = ReturnType<typeof goToSubmenu>;

      await retryWithRecovery({
        async action() {
          // we need to do this one directly since there's no easy way to
          // get to it other than collecting all the crowns:
          const successShowProclaimEmperor = await dispatchToStore(page, {
            type: "gameMenus/goToSubmenu",
            payload: "proclaimEmperor",
          } satisfies GoToSubMenuAction);

          if (!successShowProclaimEmperor) {
            throw new Error(
              "Failed to open proclaim emperor dialog for screenshot",
            );
          }

          console.log(
            `${formattedName} Taking screenshot for dialog: ${chalk.cyan("proclaimEmperor")}`,
          );
          const screenshotStart = performance.now();

          await expect
            .configure({ timeout: 15_000 * osSlowness })
            .soft(page)
            .toHaveScreenshot("proclaimEmperor.png", screenshotOptions(page));

          console.log(
            `${formattedName} ...screenshot took`,
            chalk.yellow(formatDuration(performance.now() - screenshotStart)),
          );
        },
        logHeader: formattedName,
        actionDescription: "take proclaimEmperor dialog screenshot",
        page,
        screenshotPrefix: "proclaimEmperor-screenshot",
      });
    });

    console.log(`${formattedName}: ✓ Captured in game dialogs`);
  });
});
