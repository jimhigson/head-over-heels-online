import type { Config } from "tailwindcss";

import spritesheetPalette from "./gfx/spritesheetPalette.json";
import { zxSpectrumResolution } from "./src/originalGame";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /bg-/,
    },
  ],
  theme: {
    colors: spritesheetPalette,
    spacing: {
      0: "0px",
      1: "calc(var(--block) * 1)",
      2: "calc(var(--block) * 2)",
      3: "calc(var(--block) * 3)",
      4: "calc(var(--block) * 4)",
      selectKeysIndent: "calc(var(--block) * 11)",
    },
    lineHeight: {
      blockPlusOne: "calc(var(--block) + (var(--scale) * 1px))",
    },
    width: {
      zx: `calc(var(--scale) * ${zxSpectrumResolution.x}px)`,
    },
    height: {
      zx: `calc(var(--scale) * ${zxSpectrumResolution.y}px)`,
    },
  },
} satisfies Config;
