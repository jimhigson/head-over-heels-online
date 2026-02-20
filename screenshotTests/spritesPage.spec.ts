import { expect, test } from "@playwright/test";
import { createHash } from "crypto";

import type { TextureId } from "../src/sprites/spriteSheetData";

import { progressLogHeader } from "./projectName";

const sanitiseForFilename = (textureId: string): string => {
  return textureId
    .replace(/@/g, "at")
    .replace(/\(/g, "lparen")
    .replace(/\)/g, "rparen")
    .replace(/\[/g, "lbrack")
    .replace(/\]/g, "rbrack")
    .replace(/\{/g, "lbrace")
    .replace(/\}/g, "rbrace")
    .replace(/\+/g, "plus")
    .replace(/-/g, "minus")
    .replace(/\*/g, "star")
    .replace(/\//g, "slash")
    .replace(/\\/g, "bslash")
    .replace(/\|/g, "pipe")
    .replace(/&/g, "and")
    .replace(/#/g, "hash")
    .replace(/\$/g, "dollar")
    .replace(/%/g, "pct")
    .replace(/\^/g, "caret")
    .replace(/~/g, "tilde")
    .replace(/!/g, "bang")
    .replace(/\?/g, "qmark")
    .replace(/:/g, "colon")
    .replace(/;/g, "semi")
    .replace(/'/g, "apos")
    .replace(/"/g, "quote")
    .replace(/</g, "lt")
    .replace(/>/g, "gt")
    .replace(/=/g, "eq")
    .replace(/\s+/g, "_") // spaces to underscore
    .replace(/[^a-zA-Z0-9._]/g, "_"); // anything else to underscore
};

test.describe("Sprites page", () => {
  // eslint-disable-next-line no-empty-pattern -- playwright requires destructuring here
  test.beforeEach(async ({}, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium-desktop",
      `This test runs only in chromium-desktop`,
    );
  });

  test("Individual sprite snapshots", async ({ page }, testInfo) => {
    test.setTimeout(5 * 60 * 1_000); // Long timeout for many snapshots

    // loading at a larger size (8x) makes the diffs easier to view in the playwright report,
    // since it doesn't scale up small images
    await page.goto("/sprites?scale=1&track=0");

    // Wait for the e2e-snapshot-target container first
    await page.waitForSelector(".e2e-snapshot-target", { timeout: 5_000 });

    // Get all sprite elements with data-texture-id attribute
    const textureIds = (await page
      .locator("[data-texture-id]")
      .evaluateAll((els) =>
        els.map((el) => el.getAttribute("data-texture-id")!),
      )) as TextureId[];

    console.log(`found ${textureIds.length} texture ids`);

    if (textureIds.length === 0) {
      throw new Error("No sprites found with [data-texture-id] attribute");
    }

    // Sort texture IDs to ensure consistent ordering
    const sortedTextureIds = [...textureIds].sort();

    // Snapshot the list of texture IDs to catch deletions/additions etc:
    await expect(JSON.stringify(sortedTextureIds, null, 2)).toMatchSnapshot(
      "texture-ids-list.json",
    );

    // Pre-compute filenames with hash suffix for uniqueness, eg on case-insensitive FS
    // it wouldn't tell the difference between "hud.char.c" and "hud.char.C"
    const safeFilenameMap = new Map<TextureId, string>();
    for (const tid of sortedTextureIds) {
      // Sanitize: replace common special chars with readable equivalents
      const sanitized = sanitiseForFilename(tid);

      // Create a 6-character hash of the ID for uniqueness
      const hash = createHash("sha256")
        .update(tid)
        .digest("hex")
        .substring(0, 6);

      // Add hash suffix to ensure uniqueness (Playwright handles sanitization)
      const filename = `sprite-${sanitized}_${hash}.png`;
      safeFilenameMap.set(tid, filename);
    }

    // Process snapshots one at a time
    const totalCount = safeFilenameMap.size;
    console.log(
      `${progressLogHeader(testInfo.project.name, 0)} Taking ${totalCount} sprite snapshots...`,
    );

    while (safeFilenameMap.size > 0) {
      const [tid, safeFilename] = safeFilenameMap.entries().next().value!;

      await test.step(`sprite: ${tid}`, async () => {
        const spriteEle = page.locator(`[data-texture-id="${tid}"] .sprite`);
        const completed = totalCount - safeFilenameMap.size;
        const progress = Math.round((completed / totalCount) * 100);

        console.log(
          `${progressLogHeader(testInfo.project.name, progress)} [${completed + 1}/${totalCount}] Snapshotting ${tid} to ${safeFilename}...`,
        );

        await expect.soft(spriteEle).toHaveScreenshot(safeFilename, {
          threshold: 0.02,
          maxDiffPixels: 0,
          scale: "css",
          timeout: 5000,
        });

        safeFilenameMap.delete(tid);
      });
    }
  });
});
