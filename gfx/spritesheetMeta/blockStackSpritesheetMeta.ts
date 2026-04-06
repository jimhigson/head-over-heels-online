import type { SpritesheetMetadata } from "../../src/sprites/spritesheet/spritesheetData/spritesheetMetaData";

import {
  type BlockstackPaletteColourName,
  paletteBlockstack,
  paletteBlockstackDim,
} from "../../src/sprites/palette/spritesheetPalette";

export const blockStackSpritesheetMeta: SpritesheetMetadata<
  BlockstackPaletteColourName,
  "BlockStack"
> = {
  name: "BlockStack",
  palette: paletteBlockstack,
  paletteDim: paletteBlockstackDim,
  playable: {
    head: {
      awayLeft: {
        shadowMask: true,
      },
      away: {
        shadowMask: true,
        shadowMaskFalling: true,
      },
      awayRight: {
        blinking: true,
        shadowMask: true,
        shadowMaskFalling: true,
        standing: 3,
      },
      right: {
        blinking: true,
        shadowMask: true,
        shadowMaskFalling: true,
        standing: 3,
      },
      towardsRight: {
        blinking: true,
        shadowMask: true,
        shadowMaskFalling: true,
        standing: 2,
      },
      towards: {
        blinking: true,
        standing: 3,
      },
      towardsLeft: {
        blinking: true,
        standing: 3,
      },
      left: {},
    },
    heels: {
      awayLeft: {
        shadowMask: true,
      },
      away: {
        shadowMask: true,
      },
      awayRight: {
        blinking: true,
        shadowMask: true,
        standing: 2,
      },
      right: {
        blinking: true,
        shadowMask: true,
        standing: true,
      },
      towardsRight: {
        blinking: true,
        shadowMask: true,
        standing: 2,
      },
      towards: {
        blinking: true,
        standing: true,
      },
      towardsLeft: {
        blinking: true,
        standing: 2,
      },
      left: {},
    },
  },
  // override the sprite's pivot to get the 'lean forward' effect when falling
  // where it isn't already baked into the sprite:
  overrides: {
    "head.falling.awayRight": { pivot: { x: 11, y: 24 } },
    "head.falling.towardsLeft": { pivot: { x: 13, y: 24 } },
    "head.falling.awayLeft": { pivot: { x: 12, y: 25 } },
  },
  swops: {
    deactivated: {
      colours: {
        lightBeige: "lightGrey",
        redShadow: "shadow",
        pink: "lightGrey",
        moss: "lightGrey",
        midRed: "midGrey",
        highlightBeige: "lightGrey",
        pastelBlue: "lightGrey",
        metallicBlue: "midGrey",
        replaceLight: "lightGrey",
        replaceDark: "midGrey",
      },
      playableDeactivatedPreserveColours: {
        head: ["metallicBlue", "pastelBlue"],
        heels: ["pink"],
      },
    },
    doughnutted: {
      colours: {
        midGrey: "midRed",
        lightGrey: "lightBeige",
        white: "highlightBeige",
        metallicBlue: "redShadow",
        shadow: "redShadow",
        pastelBlue: "lightBeige",
        pink: "midRed",
        moss: "midRed",
        replaceDark: "midRed",
        replaceLight: "lightBeige",
      },
    },
  },
  effectColours: {
    head: "pastelBlue",
    heels: "pink",
    left: "moss",
    right: "midRed",
    invulnerable: "midRed",
    dimText: "midGrey",
    carry: "moss",
  },
};
