import {
  type BlockstackPaletteColourName,
  paletteBlockstack,
  paletteBlockstackDim,
} from "../../src/sprites/palette/spritesheetPalette";
import { type SpritesheetMetadata } from "../../src/sprites/spritesheet/spritesheetData/spritesheetMetaData";

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
    // sprites that share another's region of the sheet (their own regions can
    // later be blanked). The whiteRabbit power-ups and planet icons are
    // placeholders not yet given distinct art, so they render as their canonical
    // source rather than the placeholder pixels currently in the iff:
    "whiteRabbit.fast": { copyFrom: { textureId: "whiteRabbit.extra-life" } },
    "whiteRabbit.shield": { copyFrom: { textureId: "whiteRabbit.extra-life" } },
    "whiteRabbit.jumps": { copyFrom: { textureId: "whiteRabbit.extra-life" } },
    "planet.safari": { copyFrom: { textureId: "planet.blacktooth" } },
    "planet.egyptus": { copyFrom: { textureId: "planet.blacktooth" } },
    "planet.penitentiary": { copyFrom: { textureId: "planet.blacktooth" } },
    "planet.bookworld": { copyFrom: { textureId: "planet.blacktooth" } },
    // exact duplicates:
    "shadowMask.fullBlock": { copyFrom: { textureId: "shadowMask.book" } },
    "particle.heels.3": { copyFrom: { textureId: "particle.head.3" } },
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
    // a two-tone blue reflection: darker palette colours become metallicBlue,
    // lighter ones pastelBlue (metallicBlue/pastelBlue map to themselves):
    mirrorReflection: {
      colours: {
        pureBlack: "metallicBlue",
        shadow: "pastelBlue",
        redShadow: "pastelBlue",
        midGrey: "pastelBlue",
        replaceDark: "pastelBlue",
        midRed: "pastelBlue",
        moss: "pastelBlue",
        replaceLight: "pastelBlue",
        pink: "pastelBlue",
        lightGrey: "pastelBlue",
        lightBeige: "pastelBlue",
        highlightBeige: "pastelBlue",
        white: "pastelBlue",
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
    outline: "pureBlack",
  },
  floatingTextGradient: [
    "shadow",
    "redShadow",
    "midGrey",
    "metallicBlue",
    "midRed",
    "moss",
    "pink",
    "lightBeige",
    "pastelBlue",
    "lightGrey",
    "highlightBeige",
  ],
  buttonColours: {
    jump: "pastelBlue",
    fire: "highlightBeige",
    carry: "moss",
    carryAndJump: "midRed",
    menu: "lightGrey",
    map: "lightGrey",
    rotateClockwise: "lightGrey",
    rotateAnticlockwise: "lightGrey",
  },
  supportsUncolourised: true,
  showFloorOverDraw: true,
  // we have black outlines, so use an almost black blackpoint
  // on this spritesheet:
  teleporterEffectBlackPoint: 0.1,
  mapToZxSpectrumForDeathEffectPalette: {
    pureBlack: "blackBasic",
    shadow: "blueBasic",
    midGrey: "cyanDimmed",
    lightGrey: "whiteDimmed",
    white: "whiteBasic",
    pastelBlue: "whiteDimmed",
    metallicBlue: "cyanDimmed",
    pink: "magentaBasic",
    moss: "cyanDimmed",
    redShadow: "cyanDimmed",
    midRed: "cyanDimmed",
    lightBeige: "yellowBasic",
    highlightBeige: "cyanBasic",
    replaceLight: "whiteDimmed",
    replaceDark: "cyanDimmed",
  },
  mapToZxSpectrumPalette: {
    moss: "greenBasic",
    pink: "magentaBasic",
    metallicBlue: "cyanDimmed",
    pastelBlue: "cyanBasic",
    highlightBeige: "yellowBasic",
    lightBeige: "yellowDimmed",
    midRed: "redBasic",
    redShadow: "redDimmed",
    lightGrey: "whiteBasic",
  },
};
