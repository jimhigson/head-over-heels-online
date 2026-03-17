import type {
  Page,
  PageAssertionsToHaveScreenshotOptions,
} from "@playwright/test";

import type { SpriteOption } from "../src/store/slices/gameMenus/gameMenusSlice";

import spritesheetColours from "../src/_generated/palette/spritesheetPalette.json" with { type: "json" };
import { osSlowness } from "./osSlowness";

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
