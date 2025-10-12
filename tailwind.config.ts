import type { Config } from "tailwindcss";

import scrollbar from "tailwind-scrollbar";

import spritesheetPalette from "./gfx/spritesheetPalette.json";
import { resolutions, zxSpectrumColors } from "./src/originalGame";
import { spritesTailwindPlugin } from "./src/spritesTailwindPlugin";
import { halfbriteHex } from "./src/utils/colour/halfBrite";
import { transformObject } from "./src/utils/entries";

const colors = {
  ...spritesheetPalette,
  ...transformObject(spritesheetPalette, ([colourName, colourValue]) => [
    colourName + "Halfbrite",
    halfbriteHex(colourValue),
  ]),

  ...zxSpectrumColors,

  transparent: "transparent",
} as const;

export type TailwindPalette = keyof typeof colors;

const blockMultiples = {
  0: "0px",
  // cheating, but fitting everything on small screens is hard!
  quarter: "calc(var(--block) / 4)",
  half: "calc(var(--block) / 2)",
  threeQuarters: "calc(var(--block) * 0.75)",
  oneScaledPix: "calc(var(--scale) * 1px)",
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
  21: "calc(var(--block) * 21)",
  22: "calc(var(--block) * 22)",
  23: "calc(var(--block) * 23)",
  24: "calc(var(--block) * 24)",
  25: "calc(var(--block) * 25)",
  26: "calc(var(--block) * 26)",
  27: "calc(var(--block) * 27)",
  28: "calc(var(--block) * 28)",
  29: "calc(var(--block) * 29)",
  30: "calc(var(--block) * 30)",
  31: "calc(var(--block) * 31)",
  32: "calc(var(--block) * 32)",
  // negative numbers
  m1: "calc(var(--block) * -1)",
  m2: "calc(var(--block) * -2)",
  m3: "calc(var(--block) * -3)",
  m4: "calc(var(--block) * -4)",
  m5: "calc(var(--block) * -5)",
  m6: "calc(var(--block) * -6)",
  m7: "calc(var(--block) * -7)",
  m8: "calc(var(--block) * -8)",
  m9: "calc(var(--block) * -9)",
  m10: "calc(var(--block) * -10)",
  m11: "calc(var(--block) * -11)",
  m12: "calc(var(--block) * -12)",
  m13: "calc(var(--block) * -13)",
  m14: "calc(var(--block) * -14)",
  m15: "calc(var(--block) * -15)",
  m16: "calc(var(--block) * -16)",
  m17: "calc(var(--block) * -17)",
  m18: "calc(var(--block) * -18)",
  m19: "calc(var(--block) * -19)",
  m20: "calc(var(--block) * -20)",
  m21: "calc(var(--block) * -21)",
  m22: "calc(var(--block) * -22)",
  m23: "calc(var(--block) * -23)",
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
      pattern: /texture-hud_char_/,
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
    },
    lineHeight: {
      none: "0",
      multilineText: "calc(var(--block) + (var(--scale) * 1px))",
    },
    width: {
      ...blockMultiples,
      zx: `calc(var(--scale) * ${resolutions.zxSpectrum.size.x}px)`,
      wideDialog: "calc(100dvw - 2 * var(--block))",
      // using h for the w - for transverse views
      tallDialog: "calc(100dvh - 2 * var(--block))",
      min: "min-content",
      max: "max-content",
      full: "100%",
      // using h for the w - for transverse views
      fullScrH: "100dvh",
    },
    height: {
      zx: `calc(var(--scale) * ${resolutions.zxSpectrum.size.y}px)`,
      tallDialog: "calc(100dvh - 2 * var(--block))",
      // using w for the h - for transverse views
      wideDialog: "calc(100dvw - 2 * var(--block))",
      ...blockMultiples,
      min: "min-content",
      max: "max-content",
      full: "100%",

      fullScrW: "100dvw",
    },
    top: blockMultiples,
    left: blockMultiples,
    right: blockMultiples,
    bottom: blockMultiples,
    borderWidth: blockMultiples,
    minWidth: {
      ...blockMultiples,
      full: "100%",
    },
    maxWidth: {
      ...blockMultiples,
      // widest dialog is 50% wider than the zx screen:
      widestDialog: `calc(var(--scale) * ${resolutions.zxSpectrum.size.x * 1.4}px)`,
      full: "100%",
    },
    maxHeight: {
      ...blockMultiples,

      min: "min-content",
      full: "100%",
    },
    gridTemplateColumns: {
      // min-content - typically 2 blocks but some menus can have custom leaders
      // can also be given explicitly to a different width (ie, number of blocks)
      // using a css variables
      menuItems: "var(--leader-col-width, min-content) max-content 1fr",
    },
    zIndex: {
      // smallest possible bump-up in render order
      slightlyAbove: "1",
      border: "10",
      dialog: "20",
      topSprite: "30",
      cheats: "40",
      // eg, the body opening from selects
      popups: "50",
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
    dropShadow: {
      oneBlock: "var(--block) var(--block) 0 rgba(0, 0, 0, 0.66)",
    },
  },
  plugins: [
    spritesTailwindPlugin,
    scrollbar({ preferredStrategy: "pseudoelements", nocompatible: true }),
  ],
} satisfies Config;
