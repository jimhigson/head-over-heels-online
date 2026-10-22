import Macros from "unplugin-macros/vite";
import glsl from "vite-plugin-glsl";
import { defineConfig } from "vitest/config";

import { macroRunner } from "./buildTools/macroRunner";

export default defineConfig({
  // glsl: item behaviours make renderers, which import shaders
  plugins: [Macros({ runner: macroRunner() }), glsl()],
  resolve: {
    // as in the app's builds, third-party react libraries run on preact:
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
  test: {
    // Only include .test.ts and .test.tsx files, exclude .spec.ts (used by Playwright)
    include: ["**/*.test.ts", "**/*.test.tsx"],
    exclude: [
      "**/*.spec.ts",
      // at any depth, eg a skill's own install under .claude/skills:
      "**/node_modules/**",
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
