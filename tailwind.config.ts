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
    {
      pattern: /max-w-dialog\d+/,
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
    },
    lineHeight: {
      blockPlusOne: "calc(var(--block) + (var(--scale) * 1px))",
    },
    extend: {
      maxWidth: {
        // Built around scaled-up text of size 8x8px - 32 is number of attribute cells
        // horizontally on the ZX Spectrum resolution
        zx: `calc(var(--scale) * ${zxSpectrumResolution.x}px)`,
      },
    },
  },
  //plugins: [require("tailwindcss-animate")],
} satisfies Config;
