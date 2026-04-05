import type { SpritesheetMetadata } from "../../src/sprites/spritesheet/spritesheetData/spritesheetMetaData";

import {
  paletteToppy,
  type ToppyPaletteColourName,
} from "../../src/sprites/palette/spritesheetPalette";

export const toppySpritesheetMeta: SpritesheetMetadata<
  ToppyPaletteColourName,
  "Toppy"
> = {
  name: "Toppy",
  palette: paletteToppy,
  playable: {
    head: {
      awayLeft: { shadowMask: true },
      away: { shadowMask: true, shadowMaskFalling: true },
      awayRight: {
        blinking: true,
        shadowMask: true,
        shadowMaskFalling: true,
        standing: 2,
      },
      right: {
        blinking: true,
        looking1: true,
        looking2: true,
        shadowMask: true,
        shadowMaskFalling: true,
        standing: 2,
      },
      towardsRight: {
        blinking: true,
        looking1: true,
        looking2: true,
        shadowMask: true,
        shadowMaskFalling: true,
        standing: 2,
      },
      towards: {
        blinking: true,
        looking1: true,
        looking2: true,
        standing: 2,
      },
      towardsLeft: {
        blinking: true,
        standing: 2,
      },
      left: {},
    },
    heels: {
      awayLeft: { shadowMask: true },
      away: { shadowMask: true },
      awayRight: {
        blinking: true,
        looking1: true,
        shadowMask: true,
        standing: 2,
      },
      right: { blinking: true, looking1: true, shadowMask: true, standing: 2 },
      towardsRight: {
        blinking: true,
        looking1: true,
        looking2: true,
        shadowMask: true,
        standing: 2,
      },
      towards: { blinking: true, looking1: true, standing: 2 },
      towardsLeft: { blinking: true, looking1: true, standing: 2 },
      left: {},
    },
  },
  missedTextures: [
    "dalek.dark.1",
    "dalek.dark.2",
    "block.organic.dark",
    "block.organic.dark.disappearing",
    "ball.uncolourised",
    "skiHead.starsAndStripes.away",
    "skiHead.starsAndStripes.towards",
    "skiHead.starsAndStripes.left",
    "skiHead.starsAndStripes.right",
  ],
  swops: {
    deactivated: {
      colours: {
        cool1: "grey1",
        cool2: "grey2",
        cool3: "grey3",
        cool4: "black",
        grey1: "grey2",
        grey2: "grey3",
        grey3: "black",
        pink1: "grey1",
        pink2: "grey2",
        warm1: "cool1",
        warm2: "cool1",
        warm3: "grey1",
        warm4: "grey2",
        warm5: "grey3",
        warm6: "black",
      },
      playableDeactivatedPreserveColours: {
        head: ["cool2", "cool3"],
        heels: ["pink1", "pink2"],
      },
    },
    doughnutted: {
      colours: {
        cool1: "warm3",
        cool2: "pink1",
        cool3: "warm4",
        grey1: "pink1",
        grey2: "warm4",
        grey3: "warm5",
      },
    },
  },
  effectColours: {
    head: "cool2",
    heels: "pink2",
    left: "warm1",
    right: "cool3",
    invulnerable: "warm2",
    dimText: "grey2",
    carry: "pink1",
  },
};
