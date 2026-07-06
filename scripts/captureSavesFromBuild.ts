import { chromium } from "@playwright/test";
import { parseArgs } from "node:util";

import { captureSaveFixtures } from "../e2e/testUtils/captureSaveFixtures";

/**
 * captures save-game fixtures from a build of the game served at any url -
 * used to back-fill the e2e/fixtures/saves/ library from builds of old
 * release tags (the current version is captured by saveCompatCapture.spec.ts
 * through the normal playwright web server instead).
 *
 * To capture from an old tag:
 *
 *   git worktree add /tmp/hoh-v22 v22.0.0
 *   cd /tmp/hoh-v22 && pnpm install && pnpm exec vite build --mode visual-regression
 *   pnpm exec vite preview --port 4222 &
 *   cd - && pnpm tsx scripts/captureSavesFromBuild.ts --baseUrl=http://localhost:4222 --version=22.0.0
 *
 * (the build must expose the e2e window globals: v23+ needs
 * `--mode visual-regression`; v22 exposes them unconditionally)
 */

const {
  values: { baseUrl, version },
} = parseArgs({
  options: {
    baseUrl: { type: "string" },
    version: { type: "string" },
  },
});

if (baseUrl === undefined || version === undefined) {
  throw new Error(
    "usage: pnpm tsx scripts/captureSavesFromBuild.ts --baseUrl=http://localhost:4222 --version=22.0.0",
  );
}

const go = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    baseURL: baseUrl,
    viewport: { width: 512, height: 384 },
  });
  const page = await context.newPage();
  // the game asks for audio; mute the whole page instead of failing:
  await page.addInitScript(() => {
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
  });

  try {
    await captureSaveFixtures(page, {
      version,
      log: (message) => console.log(`captureSavesFromBuild: ${message}`),
    });
  } finally {
    await browser.close();
  }
};

go();
