import type { Config } from "tailwindcss";

import spritesheetPalette from "./gfx/spritesheetPalette.json";
import { zxSpectrumResolution } from "./src/originalGame";
import { spritesTailwindPlugin } from "./src/spritesTailwindPlugin";

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
        return content.match(/[^\(\)&\?\s]*/g) ?? [];
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
      0: "0px",
      1: "calc(var(--block) * 1)",
      2: "calc(var(--block) * 2)",
      3: "calc(var(--block) * 3)",
      4: "calc(var(--block) * 4)",
      selectKeysIndent: "calc(var(--block) * 11)",
      oneScaledPix: "calc(var(--scale) * 1px)",
    },
    lineHeight: {
      none: "0",
      multilineText: "calc(var(--block) + (var(--scale) * 1px))",
    },
    width: {
      zx: `calc(var(--scale) * ${zxSpectrumResolution.x}px)`,
    },
    height: {
      zx: `calc(var(--scale) * ${zxSpectrumResolution.y}px)`,
    },
    gridTemplateColumns: {
      menuItems: "calc(var(--block) * 2) max-content 1fr",
    },
    keyframes: {
      flash: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0" },
      },
    },
    animation: {
      flash: "flash 1s steps(1, end) infinite",
    },
  },
  plugins: [spritesTailwindPlugin],
} satisfies Config;
