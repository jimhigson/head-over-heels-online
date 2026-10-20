import {
  zxSpectrumHexColours,
  zxSpectrumHexColoursDimmed,
} from "../originalGame";
import {
  paletteBlockstackHex,
  paletteToppyHex,
} from "../sprites/palette/spritesheetPalette";
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

const displayBlockstackPalette = Object.fromEntries(
  objectEntriesIter(paletteBlockstackHex).filter(
    ([name]) => !paletteUtilityColours.has(name),
  ),
) as Omit<
  typeof paletteBlockstackHex,
  "replaceDark" | "replaceLight" | "ss_alphaKey" | "ss_background"
>;

const displayToppyPalette = Object.fromEntries(
  objectEntriesIter(paletteToppyHex).filter(
    ([name]) => !paletteUtilityColours.has(name),
  ),
) as Omit<typeof paletteToppyHex, "replaceDark" | "replaceLight">;

const halfbriteBlockstackPalette = transformObject(
  displayBlockstackPalette,
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
  zxSpectrumHexColours,
  ([colourName, colourValue]) => [
    `zx${colourName.charAt(0).toUpperCase()}${colourName.slice(1)}` as `zx${Capitalize<typeof colourName>}`,
    colourValue,
  ],
);

// zx Spectrum colours prefixed with 'zx' ie zxRedDimmed, zxGreenDimmed
const zxSpecTailwindColoursDimmed = transformObject(
  zxSpectrumHexColoursDimmed,
  ([colourName, colourValue]) => [
    `zx${colourName.charAt(0).toUpperCase()}${colourName.slice(1)}Dimmed` as `zx${Capitalize<typeof colourName>}Dimmed`,
    colourValue,
  ],
);
export const colorsSrgb = {
  ...displayBlockstackPalette,
  ...halfbriteBlockstackPalette,

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

type TailwindColourName = keyof typeof colorsSrgb;
type TailwindBlockstackColourName =
  | keyof typeof displayBlockstackPalette
  | keyof typeof halfbriteBlockstackPalette;
type TailwindToppyColourName = keyof typeof toppyTailwindColours;

export type TailwindTextColourClassname =
  | `text-${TailwindBlockstackColourName}`
  | `toppy:text-${TailwindToppyColourName}`
  | `zx:text-${TailwindColourName}`;
