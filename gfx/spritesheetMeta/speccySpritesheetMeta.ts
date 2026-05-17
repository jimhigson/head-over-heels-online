import {
  type ZxSpectrumPaletteColour,
  zxSpectrumPaletteColours,
} from "../../src/originalGame";
import { type SpritesheetMetadata } from "../../src/sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { blockStackSpritesheetMeta } from "./blockStackSpritesheetMeta";

export const speccySpritesheetMeta: SpritesheetMetadata<
  ZxSpectrumPaletteColour,
  "BlockStack"
> = {
  name: "BlockStack",
  palette: zxSpectrumPaletteColours,
  playable: blockStackSpritesheetMeta.playable,
  overrides: blockStackSpritesheetMeta.overrides,
  swops: {
    deactivated: {
      colours: {
        blueDimmed: "blackBasic",
        blueBasic: "blackBasic",
        redDimmed: "blueDimmed",
        magentaDimmed: "blueDimmed",
        redBasic: "blueDimmed",
        magentaBasic: "blueDimmed",
        greenDimmed: "blueBasic",
        cyanDimmed: "blueBasic",
        greenBasic: "blueBasic",
        yellowDimmed: "blueBasic",
        cyanBasic: "blueBasic",
        whiteDimmed: "blueBasic",
        yellowBasic: "blueBasic",
        whiteBasic: "blueBasic",
      },
    },
  },
  effectColours: {
    head: "whiteBasic",
    heels: "whiteBasic",
    left: "whiteBasic",
    right: "blackBasic",
    invulnerable: "whiteBasic",
    dimText: "whiteBasic",
    carry: "whiteBasic",
    outline: "blackBasic",
  },
  floatingTextGradient: [
    "blueBasic",
    "redBasic",
    "magentaBasic",
    "greenBasic",
    "cyanBasic",
    "yellowBasic",
    "whiteBasic",
  ],
  buttonColours: {
    jump: "blueBasic",
    fire: "yellowBasic",
    carry: "greenBasic",
    carryAndJump: "redBasic",
    menu: "whiteBasic",
    map: "whiteBasic",
  },
  supportsUncolourised: false,
  showFloorOverDraw: true,
  teleporterEffectBlackPoint: 0.01,
  mapToZxSpectrumForDeathEffectPalette: {
    blackBasic: "blackBasic",
    blackDimmed: "blackBasic",
    blueDimmed: "blueDimmed",
    blueBasic: "blueBasic",
    redDimmed: "blueBasic",
    redBasic: "blueBasic",
    magentaDimmed: "blueBasic",
    magentaBasic: "blueBasic",
    greenDimmed: "cyanDimmed",
    greenBasic: "whiteDimmed",
    cyanDimmed: "cyanDimmed",
    cyanBasic: "cyanBasic",
    yellowDimmed: "whiteDimmed",
    yellowBasic: "whiteBasic",
    whiteDimmed: "whiteDimmed",
    whiteBasic: "whiteBasic",
  },
};
