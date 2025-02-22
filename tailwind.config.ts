import type { Config } from "tailwindcss";

import spritesheetPalette from "./gfx/spritesheetPalette.json";
import { zxSpectrumColors, zxSpectrumResolution } from "./src/originalGame";
import { spritesTailwindPlugin } from "./src/spritesTailwindPlugin";

import scrollbar from "tailwind-scrollbar";
import { transformObject } from "./src/utils/entries";

function halfbrite(hex: string) {
  // Remove the hash (#) if it exists
  hex = hex.replace(/^#/, "");

  // Parse the RGB values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Halve the brightness of each channel
  r = Math.floor(r / 2);
  g = Math.floor(g / 2);
  b = Math.floor(b / 2);

  // Convert back to hex and pad with zeros if necessary
  const toHex = (val: number) => val.toString(16).padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const colors = {
  ...spritesheetPalette,
  ...transformObject(spritesheetPalette, ([colourName, colourValue]) => [
    colourName + "Halfbrite",
    halfbrite(colourValue),
  ]),

  ...zxSpectrumColors,
} as const;

export type TailwindPalette = keyof typeof colors;

const blockMultiples = {
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
};

export default {
  /*corePlugins: {
    accentColor: false,
    backdropBlur: false,
    accessibility: false,
  },*/

  experimental: {
    optimizeUniversalDefaults: true,
  },

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
    colors,
    spacing: {
      // for when rendering with (stacked) sprites - how much to pull-up the bottom sprite
      bottomStackPullup: `calc(var(--scale) * 17px)`,
      // quite specialist - in markdown, when showing a smaller item stacked on a larger one,
      // how much to move the smaller one over (with margin-left/ml)
      centreSmallBlockOnLarge: `calc(var(--scale) * 4px)`,
      ...blockMultiples,
      selectKeysIndent: "calc(var(--block) * 11)",
      oneScaledPix: "calc(var(--scale) * 1px)",
    },
    lineHeight: {
      none: "0",
      multilineText: "calc(var(--block) + (var(--scale) * 1px))",
    },
    width: {
      ...blockMultiples,
      zx: `calc(var(--scale) * ${zxSpectrumResolution.x}px)`,
      wideDialog: "calc(100svw - 2 * var(--block))",
      min: "min-content",
      max: "max-content",
      full: "100%",
    },
    maxWidth: {
      // widest dialog is 50% wider than the zx screen:
      widestDialog: `calc(var(--scale) * ${zxSpectrumResolution.x * 1.4}px)`,
    },
    height: {
      zx: `calc(var(--scale) * ${zxSpectrumResolution.y}px)`,
      tallDialog: "calc(100svh - 2 * var(--block))",
      ...blockMultiples,
      min: "min-content",
      max: "max-content",
      full: "100%",
    },
    gridTemplateColumns: {
      // min-content - typically 2 blocks but some menus can have custom leaders
      menuItems: "min-content max-content 1fr",
    },
    zIndex: {
      border: "10",
      dialog: "20",
      topSprite: "30",
    },
    keyframes: {
      // cursor flash - for when selecting the keys for an action
      flash: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0" },
      },
    },
    opacity: {
      // use with black background sprites for EHB: https://en.wikipedia.org/wiki/Amiga_Halfbrite_mode
      halfBrite: "0.5",
    },
    brightness: {
      // for EHB: https://en.wikipedia.org/wiki/Amiga_Halfbrite_mode
      halfBrite: "0.5",
    },
    animation: {
      flash: "flash 1s steps(1, end) infinite",
    },
    aspectRatio: {
      pal: "4 / 3",
    },
  },
  plugins: [
    spritesTailwindPlugin,
    scrollbar({ preferredStrategy: "pseudoelements", nocompatible: true }),
  ],
} satisfies Config;
