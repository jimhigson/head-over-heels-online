import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Only include .test.ts and .test.tsx files, exclude .spec.ts (used by Playwright)
    include: ["**/*.test.ts", "**/*.test.tsx"],
    exclude: ["**/*.spec.ts", "node_modules", "dist", "build"],
  },
});
