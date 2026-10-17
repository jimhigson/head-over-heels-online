import Macros from "unplugin-macros/vite";
import glsl from "vite-plugin-glsl";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // glsl: item behaviours make renderers, which import shaders
  plugins: [Macros(), glsl()],
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
      // must precede any setup file that (transitively) imports the sound modules:
      "src/_testUtils/sounds/stubWebAudio.ts",
      "src/_testUtils/stubLocalStorage.ts",
      "src/_testUtils/installAppTickerForTests.ts",
      "src/game/itemBehaviours/itemBehaviourCache.ts",
    ],
  },
});
