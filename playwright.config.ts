import { defineConfig, devices } from "@playwright/test";
import { produce } from "immer";

import type { ScreenshotTestOptions } from "./screenshotTests/ScreenshotTestOptions";

const desktopSize = {
  // this size gives us an upscale of exactly 8 for the game in default settings - hopefully
  // being an exact power of 2 will help with deterministic rendering on GPUs on different hardware
  // (ie, upscaling by 7 would be more difficult ratios and potentially messier)
  viewport: { width: 1024, height: 768 },
  deviceScaleFactor: 2,
};
const phoneSize = {
  // again, results in 8x upscale for the game area, but in an aspect ratio more plausible for a phone,
  // even though a fictitious size
  viewport: { width: 1600, height: 768 },
  deviceScaleFactor: 2,
};

const port = 5222;

export default defineConfig<ScreenshotTestOptions>({
  testDir: "./screenshotTests",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: "html",
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  snapshotPathTemplate:
    "{testDir}/{testFileDir}/{testFileName}-snapshots/{projectName}/{arg}{ext}",

  projects: [
    {
      name: "chromium-desktop",
      use: {
        ...devices["Desktop Chrome"],
        ...desktopSize,
      },
    },
    {
      name: "firefox-desktop",
      use: {
        ...devices["Desktop Firefox"],
        ...desktopSize,
      },
    },
    {
      name: "webkit-desktop",
      use: {
        ...devices["Desktop Safari"],
        ...desktopSize,
      },
    },
    {
      name: "mobile-chrome",
      use: {
        ...devices["Pixel 5 landscape"],
        ...phoneSize,
      },
    },
    {
      name: "mobile-safari",
      use: {
        ...devices["iPhone 12 Pro Max landscape"],
        ...phoneSize,
      },
    },
    {
      name: "mobile-safari-portrait",
      testMatch: ["roomSnapshots.spec.ts", "menuSnapshotsMainMenu.spec.ts"],
      use: {
        ...devices["iPhone 15 Pro"],
        ...produce(phoneSize, (draft) => {
          const {
            viewport: { height, width },
          } = draft;

          draft.viewport.height = width;
          draft.viewport.width = height;
        }),
        // this portrait test is only to do a quick test for general correctness of rendering
        // since the game is played in landscape mode
        rooms: ["blacktooth1head"],
        // we're only testing layout for portrait mode, so uncolourised doesn't matter:
        noUncolourised: true,
        // keep to just the main menu to check the rotation is done correctly
        mainMenuOnly: true,
      },
    },
  ],

  webServer: {
    command: `pnpm preview:game --port ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
  },
});
