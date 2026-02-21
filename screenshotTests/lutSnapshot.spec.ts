import { expect, test } from "@playwright/test";

import { progressLogHeader } from "./projectName";

test.describe("LUT Texture Visualization", () => {
  test("LUT texture snapshot", async ({ page }, testInfo) => {
    const header = progressLogHeader(testInfo.project.name, 100);
    console.log(`${header} Taking snapshot of LUT texture`);

    // Navigate to the LUT debug page
    await page.goto("/lut?track=0");

    // Wait for the LUT display div to appear
    await page.waitForSelector(".e2e-snapshot-target", { timeout: 5000 });

    // Give it a moment to fully load
    await page.waitForTimeout(500);

    // Take a screenshot of the LUT texture
    await expect(page).toHaveScreenshot("lut-texture.png", {
      fullPage: true,
      animations: "disabled",
      clip: { x: 0, y: 0, width: 512, height: 512 * 3 },
      threshold: 0.02,
      maxDiffPixels: 0,
      scale: "css",
    });

    console.log("✅ LUT texture snapshot complete");
  });
});
