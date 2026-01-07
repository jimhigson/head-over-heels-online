import plugin from "tailwindcss/plugin";

import { transformObject } from "../../utils/entries";
import { colorsSrgb, coloursP3 } from "../tailwindColours";

/**
 * Injects CSS variables for colours with P3 values in @supports block.
 * sRGB fallback for browsers without P3 support.
 */
export const fallbackColourVariables = plugin(({ addBase }) => {
  const srgbVars = transformObject(colorsSrgb, ([name, hex]) => [
    `--colour-${name}`,
    hex,
  ]);

  const p3Vars = transformObject(coloursP3, ([name, p3]) => [
    `--colour-${name}`,
    p3,
  ]);

  addBase({
    ":root": srgbVars,
    "@supports (color: color(display-p3 1 0 0))": {
      ":root": p3Vars,
    },
  });
});
