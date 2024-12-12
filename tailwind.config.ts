import type { Config } from "tailwindcss";

import spritesheetPalette from "./gfx/spritesheetPalette.json";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    //safelist all ways to specify margin/padding, since this can be dynamically written out:
    {
      pattern: /(m|p)(l|r|t|b|x|y|e)?-/,
    },
    {
      pattern: /leading-/,
    },
    {
      pattern: /bg-/,
    },
  ],
  theme: {
    colors: spritesheetPalette,
    spacing: {
      // Built around scaled-up text of size 8x8px:
      0: "0px",
      1: "8px",
      2: "16px",
      3: "24px",
      4: "32px",
      5: "40px",
      6: "48px",
      7: "56px",
      8: "64px",
      9: "72px",
      10: "80px",
      11: "88px",
      12: "96px",
      13: "104px",
      14: "112px",
      15: "120px",
      16: "128px",
    },
    lineHeight: {
      1: "8px",
      2: "16px",
      3: "24px",
      4: "32px",
      5: "40px",
      6: "48px",
      7: "56px",
      8: "64px",
    },
    fontSize: {
      base: "24px",
      l: "32px",
    },
    extend: {
      scale: {
        double: "2",
      },
      maxWidth: {
        // suitable for dialogs opened for game menus
        mostOfScreen: "76rem",
      },
    },
  },
  //plugins: [require("tailwindcss-animate")],
} satisfies Config;
