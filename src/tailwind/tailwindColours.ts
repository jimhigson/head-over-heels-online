import jsonPalette from "../_generated/palette/spritesheetPalette.json" with { type: "json" };
import jsonToppyPalette from "../_generated/palette/spritesheetToppyPalette.json" with { type: "json" };
import { zxSpectrumColors, zxSpectrumColorsDimmed } from "../originalGame";
import { halfbriteHex } from "../utils/colour/halfbrite";
import { srgbHexToP3 } from "../utils/colour/srgbHexToP3";
import { objectEntriesIter } from "../utils/entries";
import { transformObject } from "../utils/transformObject";

/** colour names that are internal to the spritesheet and not for display in CSS */
const paletteUtilityColours = new Set([
  "replaceLight",
  "replaceDark",
  "ss_alphaKey",
  "ss_background",
]);

const displayPalette = Object.fromEntries(
  objectEntriesIter(jsonPalette).filter(
    ([name]) => !paletteUtilityColours.has(name),
  ),
) as Omit<
  typeof jsonPalette,
  "replaceDark" | "replaceLight" | "ss_alphaKey" | "ss_background"
>;

const displayToppyPalette = Object.fromEntries(
  objectEntriesIter(jsonToppyPalette).filter(
    ([name]) => !paletteUtilityColours.has(name),
  ),
) as Omit<typeof jsonToppyPalette, "replaceDark" | "replaceLight">;

const halfbriteSpritesheetPalette = transformObject(
  displayPalette,
  ([colourName, colourValue]) => [
    (colourName + "Halfbrite") as `${typeof colourName}Halfbrite`,
    halfbriteHex(colourValue),
  ],
);

const toppyTailwindColours = transformObject(
  displayToppyPalette,
  ([colourName, colourValue]) => [
    `toppy${colourName.charAt(0).toUpperCase()}${colourName.slice(1)}` as `toppy${Capitalize<typeof colourName>}`,
    colourValue,
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
  ...displayPalette,
  ...halfbriteSpritesheetPalette,

  // toppy colours prefixed with 'toppy' ie toppyWarm1, toppyCool2
  ...toppyTailwindColours,

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
  | keyof typeof displayPalette
  | keyof typeof halfbriteSpritesheetPalette;
export type TailwindToppyColourName = keyof typeof toppyTailwindColours;
export type TailwindSpectrumColourName =
  | keyof typeof zxSpecTailwindColours
  | keyof typeof zxSpecTailwindColoursDimmed;

export type TailwindTextColourClassname =
  `text-${TailwindColourisedColourName} zx:text-${TailwindColourName} toppy:text-${TailwindToppyColourName}`;
