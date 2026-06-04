import scrollbar from "tailwind-scrollbar";
import { type Config } from "tailwindcss";

import { fallbackColourVariables } from "./src/tailwind/plugins/fallbackColourVariables";
import { spritesTailwindPlugin } from "./src/tailwind/plugins/spritesTailwindPlugin";
import { coloursCssVariables } from "./src/tailwind/tailwindColours";

export default {
  /*corePlugins: {
    accentColor: false,
    backdropBlur: false,
    accessibility: false,
  },*/

  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,md}"],

  theme: {
    colors: coloursCssVariables,
    // spacing-based length scales (spacing, width, height, inset, min/max sizes,
    // scroll-margin) come from `--spacing` and the named `--*-*` variables in
    // src/tailwind/lengthScale.css, so any integer multiple works on demand.
    lineHeight: {
      none: "0",
      multilineText: "calc(var(--block) + (var(--scale) * 1px))",
    },
    borderWidth: {
      oneScaledPix: "calc(var(--scale) * 1px)",
      3: "calc(var(--block) * 3)",
    },
    gridTemplateColumns: {
      // min-content - typically 2 blocks but some menus can have custom leaders
      // can also be given explicitly to a different width (ie, number of blocks)
      // using a css variables
      menuItems: "var(--leader-col-width, min-content) max-content 1fr",
      subgrid: "subgrid",
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
    fallbackColourVariables,
    spritesTailwindPlugin,
    scrollbar({ preferredStrategy: "pseudoelements", nocompatible: true }),
  ],
} satisfies Config;
