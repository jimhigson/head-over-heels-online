import { type ItemRenderExtents } from "../../src/sprites/spritesheet/spritesheetData/spritesheetMetaData";

const fullBlockWithSlightOverdraw = { xNeg: 1, xPos: 1, yNeg: 1, yPos: 1 };
const smallItemWithSlightOverdraw = { xNeg: 1, yNeg: 1, zPos: 1 };
// those ears/that trunk!
const elephantine = { xNeg: 1, xPos: 4, yNeg: 1, yPos: 4 };
const computerBot = { xNeg: 1, xPos: 3, yNeg: 1, yPos: 3 };
const deadOrAliveFish = { xPos: 1, yPos: 1, zPos: 4 };
// those ears!
const bunny = { yPos: 1, zPos: 1 };
const dalek = { xPos: 1, yPos: 1 };

// head's nose is rendered outside of his bb in the original when facing away/left:
const head = { xNeg: 0.5, xPos: 2.5, yNeg: 0.5, yPos: 2.5, zPos: 1 };
// Heels's feet rendered outside of his bb in the original when facing towards/right:
const heels = { xNeg: 1.5, xPos: 0.5, yNeg: 1.5, yPos: 0.5, zPos: 2 };
const headOverHeels = { xNeg: 1, xPos: 3, yNeg: 1, yPos: 3 };

/**
 * the shared render-overdraw table used by every spritesheet: how far each
 * item kind draws outside (or, negative, inside) each face of its physical
 * aabb
 */
export const itemRenderExtents: ItemRenderExtents = {
  head,
  heels,
  headOverHeels,
  "sceneryPlayer.head": head,
  "sceneryPlayer.heels": heels,
  "sceneryPlayer.headOverHeels": headOverHeels,

  ball: smallItemWithSlightOverdraw,
  "slidingBlock.puck": smallItemWithSlightOverdraw,
  "slidingBlock.book": fullBlockWithSlightOverdraw,

  spring: {
    // physical box is the compressed size; renders at the uncompressed size:
    zPos: 2,
  },
  lift: {
    zNeg: 2,
    zPos: 1,
  },
  switch: {
    zPos: 3,
  },
  button: {
    // physical box matches the compressed (stood-on) size; renders uncompressed:
    zPos: 2,
  },

  charles: elephantine,
  "monster.elephant": elephantine,
  "monster.elephantHead": elephantine,
  "monster.bubbleRobot": { xNeg: 1, xPos: 1, yNeg: 1, yPos: 1 },
  "monster.emperorsGuardian": computerBot,
  "monster.monkey": computerBot,
  "monster.computerBot": computerBot,
  "monster.dalek": dalek,
  "monster.homingBot": dalek,
  "monster.turtle": { xPos: 2, yPos: 2, zNeg: 2 },
  "monster.helicopterBug": { zNeg: 2, zPos: 1 },
  "monster.cyberman": { zNeg: 3, zPos: 2 },

  "pickup.scroll": { xNeg: 1, xPos: 1, yNeg: 1, yPos: 1 },
  "pickup.extra-life": bunny,
  "pickup.fast": bunny,
  "pickup.jumps": bunny,
  "pickup.shield": bunny,
  "pickup.reincarnation": deadOrAliveFish,
  "moveableDeadly.deadFish": deadOrAliveFish,
  "pickup.crown": { xPos: 2, zPos: 1 },
  "pickup.hooter": { xNeg: 2, xPos: 2, yNeg: 1, yPos: -2, zPos: 1 },

  "block.tower": { xPos: 3, yPos: 3 },
  "deadlyBlock.volcano": fullBlockWithSlightOverdraw,
  "deadlyBlock.toaster": fullBlockWithSlightOverdraw,
  pushableBlock: fullBlockWithSlightOverdraw,
  movingPlatform: fullBlockWithSlightOverdraw,
  spikes: fullBlockWithSlightOverdraw,
  conveyor: fullBlockWithSlightOverdraw,
  hushPuppy: fullBlockWithSlightOverdraw,
  teleporter: fullBlockWithSlightOverdraw,

  // renders as nothing at all - also keeps the editor from considering a
  // hover on the blocker's (large, invisible) physical box, eg the very tall
  // blocker above every door:
  blocker: "none",
};
