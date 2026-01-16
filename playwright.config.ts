import { defineConfig, devices } from "@playwright/test";

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

export default defineConfig({
  testDir: "./screenshotTests",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: "html",
  use: {
    baseURL: "http://localhost:5201",
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
  ],

  webServer: {
    command: "pnpm preview:game",
    url: "http://localhost:5201",
    reuseExistingServer: !process.env.CI,
  },
});
