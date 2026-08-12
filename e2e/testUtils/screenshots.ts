import {
  expect,
  type Page,
  type PageAssertionsToHaveScreenshotOptions,
  test,
} from "@playwright/test";
import chalk from "chalk";

import spritesheetColours from "../../src/_generated/palette/spritesheetPalette.json" with { type: "json" };
import { type DialogId } from "../../src/game/components/dialogs/menuDialog/DialogId";
import {
  menuItemDataAttributeDisabled,
  menuItemDataAttributeHidden,
  menuItemDataAttributeId,
} from "../../src/game/components/dialogs/menuDialog/dialogs/menus/menuItemDataAttributes";
import { type SpriteOption } from "../../src/store/slices/userSettings/userSettingsSlice";
import { osSlowness } from "./infrastructure";
import { elapsed, formatDuration } from "./logging";

export const testTimeout = (process.env.CI ? 600_000 : 120_000) * osSlowness;

/** short label for a sprite option: "uncolourised", "toppy", "debug", or "" for default BlockStack */
export const spriteOptionName = (spriteOption: SpriteOption): string =>
  spriteOption.uncolourised ? "uncolourised"
  : spriteOption.name === "Toppy" ? "toppy"
  : spriteOption.name === "Debug" ? "debug"
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

/**
 * record how this page is actually laying text out, once it has rendered.
 *
 * Headless chromium on linux chooses its hinting from a fontconfig query at
 * launch, and the two modes it can land in differ by a whole pixel of text
 * position - far more than the anti-aliasing the snapshot tolerance is sized
 * for. Which mode a run got is otherwise only visible by eye in a diff image
 * downloaded after the fact, by which time the runner is gone; these numbers
 * put it in the job's own log.
 */
const textLayoutLoggedFor = new WeakSet<Page>();

export const logTextLayout = async (page: Page, logHeader: string) => {
  // the answer cannot change within a page's life - the mode is fixed when the
  // browser launches - so one line per page is all the evidence there is
  if (textLayoutLoggedFor.has(page)) {
    return;
  }
  textLayoutLoggedFor.add(page);

  const measured = await page.evaluate(() => {
    // a dialog when one is open (that is what the menu snapshots capture),
    // otherwise the element carrying the upscale vars - both sit inside the
    // wrapper that defines --scale, which document.body does not
    const probe =
      document.querySelector("dialog") ??
      document.querySelector<HTMLElement>("[style*='--scale']") ??
      document.body;
    const probeStyle = getComputedStyle(probe);
    const { fontSize, lineHeight, fontFamily, font } = probeStyle;
    const { height, top } = probe.getBoundingClientRect();

    // the page's font measured on a canvas: these numbers come from the
    // rasteriser, not from css, so they are the direct fingerprint of the
    // hinting mode. fontBoundingBox* are what half-leading positions each
    // text baseline from - if they differ between two runs, every line of
    // text on the page sits 1px apart between those runs
    const context = document.createElement("canvas").getContext("2d");
    let glyphMetrics;
    if (context !== null) {
      context.font = font;
      const metrics = context.measureText("The game works on any");
      glyphMetrics = {
        width: metrics.width,
        inkAscent: metrics.actualBoundingBoxAscent,
        inkDescent: metrics.actualBoundingBoxDescent,
        fontAscent: metrics.fontBoundingBoxAscent,
        fontDescent: metrics.fontBoundingBoxDescent,
      };
    }

    return {
      devicePixelRatio: window.devicePixelRatio,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      // --scale is set on a wrapper inside the app, not on the root, so it has
      // to be read somewhere it is in scope
      scale: probeStyle.getPropertyValue("--scale").trim(),
      fontSize,
      lineHeight,
      fontFamily,
      glyphMetrics,
      probeTop: top,
      probeHeight: height,
    };
  });
  console.log(
    `${logHeader} ${elapsed()} [text-layout] ${JSON.stringify(measured)}`,
  );
};

/**
 * the detailed version, for a test that has already failed: every text line's
 * position, and the font's own glyph metrics.
 *
 * A snapshot that differs by text position gives no clue in the log as to
 * which lines moved, or whether the glyphs themselves are being measured
 * differently. Line rects show the shift accumulating down the page; the
 * canvas metrics fingerprint the hinting mode independently of any layout.
 */
export const logDetailedTextLayout = async (page: Page, logHeader: string) => {
  const detail = await page.evaluate(() => {
    const root = document.querySelector("dialog") ?? document.body;

    const lines = Array.from(root.querySelectorAll("*"))
      .filter((element) => (element.textContent ?? "").trim() !== "")
      .slice(0, 40)
      .map((element) => {
        const { top, left, height } = element.getBoundingClientRect();
        return `${top.toFixed(2)},${left.toFixed(2)},${height.toFixed(2)} ${(element.textContent ?? "").trim().slice(0, 24)}`;
      });

    // the same font the page is using, measured on a canvas: ascent/descent
    // come from the rasteriser rather than from css, so they move with the
    // hinting mode even when the css box does not
    const { font } = getComputedStyle(root);
    const context = document.createElement("canvas").getContext("2d");
    const metrics =
      context === null ? undefined : (
        ((context.font = font), context.measureText("The game works on any"))
      );

    return {
      font,
      glyphMetrics:
        metrics === undefined ? undefined : (
          {
            width: metrics.width,
            ascent: metrics.actualBoundingBoxAscent,
            descent: metrics.actualBoundingBoxDescent,
          }
        ),
      lines,
    };
  });

  console.log(
    `${logHeader} ${elapsed()} [text-layout-detail] font=${detail.font} glyphs=${JSON.stringify(detail.glyphMetrics)}`,
  );
  for (const line of detail.lines) {
    console.log(`${logHeader}   top,left,height ${line}`);
  }
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

    // wait for the dialog, then for any loading spinner (role=status) to leave,
    // so the screenshot is of the settled dialog rather than mid-load:
    await page.waitForSelector(`dialog[data-dialog-id="${dialogId}"]`, {
      timeout: 15_000 * osSlowness,
    });
    await page
      .getByRole("status")
      .waitFor({ state: "detached", timeout: 15_000 * osSlowness });

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
  // any spec that screenshots gets the text-layout evidence, without having to
  // remember to ask for it (no-op after the first call for a given page)
  await logTextLayout(page, logHeader);

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
  if (!process.env.CI || process.platform !== "linux") {
    return true;
  }

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
  // the dialogs here use real fonts, with different anti-aliasing, even
  // after making a best attempt to disable anti-aliasing, especially Linux
  // CI runners still show a bit of blurriness at the edges
  // also, non-integer scaling can sometimes cause different snapping of scaled
  // nearest-neighbour graphics:
  // results tend to be about 512*384=~200k pixels, so 0.03 is
  // ~6000 pixels, although most text render differences are < 1k
  maxDiffPixelRatio: 0.03,
  timeout: 10_000 * osSlowness,
  mask: [page.locator(".screenshot-mask")],
  maskColor: spriteOption.uncolourised ? "#ff00ff" : spritesheetColours.pink,
});
