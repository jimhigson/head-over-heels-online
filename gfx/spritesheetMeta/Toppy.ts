import type { SpritesheetMetaData } from "../../src/sprites/spritesheet/spritesheetData/spritesheetMetas";

const toppy: SpritesheetMetaData = {
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
};
export default toppy;
