import { expect, test } from "@playwright/test";

import { progressLogHeader } from "./projectName";

test.describe("LUT Texture Visualization", () => {
  test("LUT texture snapshot", async ({ page }, testInfo) => {
    const header = progressLogHeader(testInfo.project.name, 100);
    console.log(`${header} Taking snapshot of LUT texture`);

    // Navigate to the LUT debug page
    await page.goto("/lut");

    // Wait for the LUT display div to appear
    await page.waitForSelector(".lut-display", { timeout: 5000 });

    // Give it a moment to fully load
    await page.waitForTimeout(500);

    // Take a screenshot of the LUT texture
    await expect(page).toHaveScreenshot("lut-texture.png", {
      fullPage: false,
      animations: "disabled",
      clip: { x: 0, y: 0, width: 512, height: 512 },
      threshold: 0.02,
      maxDiffPixels: 0,
    });

    console.log("✅ LUT texture snapshot complete");
  });
});
