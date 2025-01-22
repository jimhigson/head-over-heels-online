import type { Config } from "tailwindcss";

import spritesheetPalette from "./gfx/spritesheetPalette.json";
import { zxSpectrumResolution } from "./src/originalGame";
import { spritesTailwindPlugin } from "./src/spritesTailwindPlugin";

import scrollbar from "tailwind-scrollbar";

export default {
  /*corePlugins: {
    accentColor: false,
    backdropBlur: false,
    accessibility: false,
  },*/

  darkMode: ["class"],
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,md}"],
    extract: {
      md(content) {
        // allow classes in markdown to be encoded as urls like class1?class2&class3
        return content.match(/[^()&?\s]*/g) ?? [];
      },
    },
  },

  safelist: [
    {
      // any single-char sprite could be shown by parsing a markdown file, the others
      // have to be specifically referenced
      pattern: /texture-hud\.char\./,
    },
  ],
  theme: {
    colors: spritesheetPalette,
    spacing: {
      // for when rendering with (stacked) sprites - how much to pull-up the bottom sprite
      bottomStackPullup: `calc(var(--scale) * 15px)`,
      // quite specialist - in markdown, when showing a smaller item stacked on a larger one,
      // how much to move the smaller one over (with margin-left/ml)
      centreSmallBlockOnLarge: `calc(var(--scale) * 4px)`,
      0: "0px",
      1: "calc(var(--block) * 1)",
      2: "calc(var(--block) * 2)",
      3: "calc(var(--block) * 3)",
      4: "calc(var(--block) * 4)",
      5: "calc(var(--block) * 5)",
      6: "calc(var(--block) * 6)",
      7: "calc(var(--block) * 7)",
      8: "calc(var(--block) * 8)",
      9: "calc(var(--block) * 9)",
      10: "calc(var(--block) * 10)",
      11: "calc(var(--block) * 11)",
      12: "calc(var(--block) * 12)",
      13: "calc(var(--block) * 13)",
      14: "calc(var(--block) * 14)",
      15: "calc(var(--block) * 15)",
      16: "calc(var(--block) * 16)",
      17: "calc(var(--block) * 17)",
      18: "calc(var(--block) * 18)",
      19: "calc(var(--block) * 19)",
      20: "calc(var(--block) * 20)",
      selectKeysIndent: "calc(var(--block) * 11)",
      oneScaledPix: "calc(var(--scale) * 1px)",
    },
    lineHeight: {
      none: "0",
      multilineText: "calc(var(--block) + (var(--scale) * 1px))",
    },
    width: {
      1: "calc(var(--block) * 1)",
      2: "calc(var(--block) * 2)",
      3: "calc(var(--block) * 3)",
      4: "calc(var(--block) * 4)",
      5: "calc(var(--block) * 5)",
      6: "calc(var(--block) * 6)",
      7: "calc(var(--block) * 7)",
      8: "calc(var(--block) * 8)",
      9: "calc(var(--block) * 9)",
      10: "calc(var(--block) * 10)",
      11: "calc(var(--block) * 11)",
      12: "calc(var(--block) * 12)",
      13: "calc(var(--block) * 13)",
      14: "calc(var(--block) * 14)",
      15: "calc(var(--block) * 15)",
      16: "calc(var(--block) * 16)",
      17: "calc(var(--block) * 17)",
      18: "calc(var(--block) * 18)",
      19: "calc(var(--block) * 19)",
      20: "calc(var(--block) * 20)",
      zx: `calc(var(--scale) * ${zxSpectrumResolution.x}px)`,
      min: "min-content",
      max: "max-content",
    },
    height: {
      zx: `calc(var(--scale) * ${zxSpectrumResolution.y}px)`,
      min: "min-content",
      max: "max-content",
    },
    gridTemplateColumns: {
      menuItems: "calc(var(--block) * 2) max-content 1fr",
    },
    zIndex: {
      topSprite: "1",
      dialogChrome: "2",
    },
    keyframes: {
      // cursor flash - for when selecting the keys for an action
      flash: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0" },
      },
    },
    opacity: {
      // use with black sprites for EHB: https://en.wikipedia.org/wiki/Amiga_Halfbrite_mode
      halfBrite: "0.5",
    },
    animation: {
      flash: "flash 1s steps(1, end) infinite",
    },
  },
  plugins: [
    spritesTailwindPlugin,
    scrollbar({ preferredStrategy: "pseudoelements", nocompatible: true }),
  ],
} satisfies Config;
