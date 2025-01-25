import type { Config } from "tailwindcss";

import spritesheetPalette from "./gfx/spritesheetPalette.json";
import { zxSpectrumResolution } from "./src/originalGame";
import { spritesTailwindPlugin } from "./src/spritesTailwindPlugin";

import scrollbar from "tailwind-scrollbar";
import { transformObject } from "./src/utils/entries";

function halfbrite(hex) {
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

  // zx-spectrum colours:
  zxRed: "#f00",
  zxGreen: "#0f0",
  zxBlue: "#00f",
  zxCyan: "#0ff",
  zxMagenta: "#f0f",
  zxYellow: "#ff0",
  zxBlack: "#000",
  zxWhite: "#fff",
  zxRedDimmed: "#800",
  zxGreenDimmed: "#080",
  zxBlueDimmed: "#008",
  zxCyanDimmed: "#088",
  zxMagentaDimmed: "#808",
  zxYellowDimmed: "#880",
  zxBlackDimmed: "#000",
  zxWhiteDimmed: "#888",
} as const;

export type TailwindPalette = keyof typeof colors;

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
    colors,
    spacing: {
      // for when rendering with (stacked) sprites - how much to pull-up the bottom sprite
      bottomStackPullup: `calc(var(--scale) * 17px)`,
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
