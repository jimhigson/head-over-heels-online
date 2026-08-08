import { defineConfig, devices } from "@playwright/test";
import getPort from "get-port";

/**
 * the level editor is a separate web app from the game (its own vite config,
 * its own build), so it gets its own playwright config and server rather than
 * a project inside the game's. Run with:
 *   pnpm playwright test --config playwright.editor.config.ts
 *
 * The editor is built in visual-regression mode, which is what puts the redux
 * store and the editor's e2e api on the window.
 */

// see the note in playwright.config.ts: the config is re-imported in every
// worker, so the port is chosen once in the parent and inherited from there
const inheritedPort: string | undefined = process.env.PW_EDITOR_WEBSERVER_PORT;
const isRootPlaywrightProcess = inheritedPort === undefined;
const webserverPort =
  isRootPlaywrightProcess ? await getPort() : Number(inheritedPort);

if (isRootPlaywrightProcess) {
  console.log("playwright.editor.config.ts: webserverPort:", webserverPort);
  process.env.PW_EDITOR_WEBSERVER_PORT = String(webserverPort);
}

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.editor.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  reporter: "html",
  use: {
    baseURL: `http://localhost:${webserverPort}/editor/`,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium-desktop",
      use: {
        ...devices["Desktop Chrome"],
        // the editor is a desktop tool with three panes either side of the
        // room - too cramped to point at the room in the game's e2e viewport
        viewport: { width: 1_280, height: 900 },
        deviceScaleFactor: 1,
      },
    },
  ],

  webServer: {
    command: `pnpm build:editor --mode visual-regression && pnpm preview:editor --port ${webserverPort} --strictPort`,
    url: `http://localhost:${webserverPort}/editor/`,
    // the port is fresh each run, so there is never a server to reuse
    reuseExistingServer: false,
    // the command builds the editor before serving it
    timeout: 300_000,
  },
});
