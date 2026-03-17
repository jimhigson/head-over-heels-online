import type { SpritesheetMetaData } from "../../src/sprites/spritesheet/spritesheetData/spritesheetMetas";

const blockStack: SpritesheetMetaData = {
  useAltPaletteInDimmedRoom: true,
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
};
export default blockStack;
