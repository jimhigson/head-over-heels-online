import Macros from "unplugin-macros/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [Macros()],
  test: {
    // Only include .test.ts and .test.tsx files, exclude .spec.ts (used by Playwright)
    include: ["**/*.test.ts", "**/*.test.tsx"],
    exclude: [
      "**/*.spec.ts",
      "node_modules",
      "dist",
      "build",
      ".claude/worktrees",
    ],
    setupFiles: [
      "src/_testUtils/stubLocalStorage.ts",
      "src/_testUtils/installAppTickerForTests.ts",
    ],
  },
});
