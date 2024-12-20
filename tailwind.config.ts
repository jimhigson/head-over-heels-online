import type { Config } from "tailwindcss";

import spritesheetPalette from "./gfx/spritesheetPalette.json";
import { zxSpectrumResolution } from "./src/originalGame";

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
    {
      pattern: /max-w-dialog\d+/,
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
        // Built around scaled-up text of size 8x8px - 32 is number of attribute cells
        // horizontally on the ZX Spectrum resolution
        dialog1: `${1 * zxSpectrumResolution.x}px`,
        dialog2: `${2 * zxSpectrumResolution.x}px`,
        dialog3: `${3 * zxSpectrumResolution.x}px`,
        dialog4: `${4 * zxSpectrumResolution.x}px`,
        dialog5: `${5 * zxSpectrumResolution.x}px`,
        dialog6: `${6 * zxSpectrumResolution.x}px`,
        dialog7: `${7 * zxSpectrumResolution.x}px`,
        dialog8: `${8 * zxSpectrumResolution.x}px`,
        dialog9: `${9 * zxSpectrumResolution.x}px`,
        dialog10: `${10 * zxSpectrumResolution.x}px`,
        dialog11: `${11 * zxSpectrumResolution.x}px`,
        dialog12: `${12 * zxSpectrumResolution.x}px`,
        dialog13: `${13 * zxSpectrumResolution.x}px`,
        dialog14: `${14 * zxSpectrumResolution.x}px`,
        dialog15: `${15 * zxSpectrumResolution.x}px`,
        dialog16: `${16 * zxSpectrumResolution.x}px`,
      },
    },
  },
  //plugins: [require("tailwindcss-animate")],
} satisfies Config;
