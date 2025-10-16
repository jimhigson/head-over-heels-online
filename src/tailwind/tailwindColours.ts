import jsonPalette from "../_generated/palette/spritesheetPalette.json" with { type: "json" };
import { zxSpectrumColors, zxSpectrumColorsDimmed } from "../originalGame";
import { halfbriteHex } from "../utils/colour/halfBrite";
import { srgbHexToP3 } from "../utils/colour/srgbHexToP3";
import { transformObject } from "../utils/transformObject";

const halfbriteSpritesheetPalette = transformObject(
  jsonPalette,
  ([colourName, colourValue]) => [
    (colourName + "Halfbrite") as `${typeof colourName}Halfbrite`,
    halfbriteHex(colourValue),
  ],
);
const zxSpecTailwindColours = transformObject(
  zxSpectrumColors,
  ([colourName, colourValue]) => [
    `zx${colourName.charAt(0).toUpperCase()}${colourName.slice(1)}` as `zx${Capitalize<typeof colourName>}`,
    colourValue.toHex(),
  ],
);

// zx Spectrum colours prefixed with 'zx' ie zxRedDimmed, zxGreenDimmed
const zxSpecTailwindColoursDimmed = transformObject(
  zxSpectrumColorsDimmed,
  ([colourName, colourValue]) => [
    `zx${colourName.charAt(0).toUpperCase()}${colourName.slice(1)}Dimmed` as `zx${Capitalize<typeof colourName>}Dimmed`,
    colourValue.toHex(),
  ],
);
export const colorsSrgb = {
  ...jsonPalette,
  ...halfbriteSpritesheetPalette,

  // zx Spectrum colours prefixed with 'zx' ie zxRed, zxGreen
  ...zxSpecTailwindColours,

  ...zxSpecTailwindColoursDimmed,

  transparent: "transparent",
} as const;
export const coloursP3 = transformObject(colorsSrgb, ([name, hex]) => [
  name,
  srgbHexToP3(hex),
]);
export const coloursCssVariables = transformObject(colorsSrgb, ([name]) => [
  name,
  `var(--colour-${name})`,
]);

export type TailwindColourName = keyof typeof colorsSrgb;
export type TailwindColourisedColourName =
  | keyof typeof halfbriteSpritesheetPalette
  | keyof typeof jsonPalette;
export type TailwindSpectrumColourName =
  | keyof typeof zxSpecTailwindColours
  | keyof typeof zxSpecTailwindColoursDimmed;

export type TailwindTextColourClassname =
  `text-${TailwindColourisedColourName} zx:text-${TailwindColourName}`;
