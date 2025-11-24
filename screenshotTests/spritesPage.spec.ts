import { expect, test } from "@playwright/test";
import { createHash } from "crypto";

import type { TextureId } from "../src/sprites/spriteSheetData";

import { progressLogHeader } from "./projectName";

const batchSize = 10;

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

    await page.goto("/sprites?scale=1");

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

    // Process snapshots in batches to avoid overwhelming playwright's buffers
    console.log(
      `${progressLogHeader(testInfo.project.name, 0)} Taking ${sortedTextureIds.length} sprite snapshots in batches of ${batchSize}...`,
    );

    const processNext = async (): Promise<void> => {
      const nextTid: TextureId = safeFilenameMap.keys().next().value!;
      const spriteEle = page.locator(`[data-texture-id="${nextTid}"] .sprite`);
      const safeFilename = safeFilenameMap.get(nextTid) || "sprite-unknown.png";

      const remainingPc = () => {
        const remainingFrac = safeFilenameMap.size / sortedTextureIds.length;
        return Math.round((1 - remainingFrac) * 100);
      };

      console.log(
        `${progressLogHeader(testInfo.project.name, remainingPc())} snapshotting sprite ${nextTid} to ${safeFilename} ...`,
      );

      safeFilenameMap.delete(nextTid);

      await expect(spriteEle)
        .toHaveScreenshot(safeFilename, {
          threshold: 0.02,
          maxDiffPixels: 0,
          timeout: 20_000,
        })
        .then(() => {
          console.log(
            `${progressLogHeader(testInfo.project.name, remainingPc())} ...finished snapshotting ${safeFilename}`,
          );
        })
        .catch((err) => {
          console.error(
            `...failed snapshotting sprite ${nextTid} to ${safeFilename}:`,
            err,
          );
          throw err;
        })
        .finally(() => {
          if (safeFilenameMap.size > 0) {
            return processNext();
          }
        });
    };

    await Promise.all(new Array(batchSize).fill(0).map(() => processNext()));
  });
});
