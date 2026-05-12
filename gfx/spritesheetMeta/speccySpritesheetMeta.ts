import type { ZxSpectrumHue } from "../../src/originalGame";
import type { SpritesheetMetadata } from "../../src/sprites/spritesheet/spritesheetData/spritesheetMetaData";

import {
  zxSpectrumColors,
  zxSpectrumColorsDimmed,
} from "../../src/originalGame";
import { blockStackSpritesheetMeta } from "./blockStackSpritesheetMeta";

export const speccySpritesheetMeta: SpritesheetMetadata<
  ZxSpectrumHue,
  "BlockStack"
> = {
  name: "BlockStack",
  palette: zxSpectrumColors,
  paletteDim: zxSpectrumColorsDimmed,
  playable: blockStackSpritesheetMeta.playable,
  overrides: blockStackSpritesheetMeta.overrides,
  effectColours: {
    head: "blue",
    heels: "magenta",
    left: "green",
    right: "red",
    invulnerable: "red",
    dimText: "white",
    carry: "green",
    outline: "black",
  },
  floatingTextGradient: [
    "blue",
    "red",
    "magenta",
    "green",
    "cyan",
    "yellow",
    "white",
  ],
  buttonColours: {
    jump: "blue",
    fire: "yellow",
    carry: "green",
    carryAndJump: "red",
    menu: "white",
    map: "white",
  },
  supportsUncolourised: false,
  showFloorOverDraw: true,
  teleporterEffectBlackPoint: 0.5,
};
