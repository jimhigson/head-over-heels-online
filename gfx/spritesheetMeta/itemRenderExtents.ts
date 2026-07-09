import {
  doubleHeightCharacterAabb,
  fullBlockAabb,
  smallItemAabb,
  towerAabb,
} from "../../src/game/collision/boundingBoxes";
import { type ItemRenderExtents } from "../../src/sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { addXyz, originXyz } from "../../src/utils/vectors/vectors";

const fullBlockWithSlightOverdraw = {
  baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(fullBlockAabb, { x: 2, y: 2 }),
};
const smallItemWithSlightOverdraw = {
  baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(smallItemAabb, { x: 1, y: 1, z: 1 }),
};
// those ears/that trunk!
const elephantine = {
  baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(doubleHeightCharacterAabb, { x: 5, y: 5 }),
};
const computerBot = {
  baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(doubleHeightCharacterAabb, { x: 4, y: 4 }),
};
const deadOrAliveFish = {
  renderAabb: addXyz(smallItemAabb, { x: 1, y: 1, z: 4 }),
};
// those ears!
const bunny = {
  renderAabb: addXyz(smallItemAabb, { y: 1, z: 1 }),
};
const dalek = {
  renderAabb: addXyz(smallItemAabb, { x: 1, y: 1 }),
};

const scrollAabb = { x: 16, y: 4, z: 13 };

// head's nose is rendered outside of his bb in the original when facing away/left:
const head = {
  baseRenderAabbOffset: { x: -0.5, y: -0.5, z: 0 },
  renderAabb: addXyz(smallItemAabb, { x: 3, y: 3, z: 1 }),
};
// Heels's feet rendered outside of his bb in the original when facing towards/right:
const heels = {
  baseRenderAabbOffset: { x: -1.5, y: -1.5, z: 0 },
  renderAabb: addXyz(smallItemAabb, { x: 2, y: 2, z: 2 }),
};
const headOverHeels = {
  baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(doubleHeightCharacterAabb, { x: 4, y: 4 }),
};

/**
 * the shared render-overdraw table used by every spritesheet: how much bigger
 * (or, for the portal, smaller) each item kind draws than its physical aabb
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
    renderAabb: addXyz(smallItemAabb, { z: 2 }),
  },
  lift: {
    baseRenderAabbOffset: { x: 0, y: 0, z: -2 },
    renderAabb: addXyz(smallItemAabb, { z: 3 }),
  },
  switch: {
    renderAabb: addXyz(smallItemAabb, { z: 3 }),
  },
  button: {
    // physical box matches the compressed (stood-on) size; renders uncompressed:
    renderAabb: { x: 15, y: 15, z: 4 },
  },

  charles: elephantine,
  "monster.elephant": elephantine,
  "monster.elephantHead": {
    baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
    renderAabb: addXyz(smallItemAabb, { x: 5, y: 5 }),
  },
  "monster.bubbleRobot": {
    baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
    renderAabb: addXyz(doubleHeightCharacterAabb, { x: 2, y: 2 }),
  },
  "monster.emperorsGuardian": computerBot,
  "monster.monkey": computerBot,
  "monster.computerBot": computerBot,
  "monster.dalek": dalek,
  "monster.homingBot": dalek,
  "monster.turtle": {
    baseRenderAabbOffset: { ...originXyz, z: -2 },
    renderAabb: addXyz(smallItemAabb, { x: 2, y: 2, z: 2 }),
  },
  "monster.helicopterBug": {
    baseRenderAabbOffset: { ...originXyz, z: -2 },
    renderAabb: addXyz(smallItemAabb, { z: 3 }),
  },
  "monster.cyberman": {
    baseRenderAabbOffset: { ...originXyz, z: -3 },
    renderAabb: addXyz(doubleHeightCharacterAabb, { z: 5 }),
  },

  "pickup.scroll": {
    baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
    renderAabb: addXyz(scrollAabb, { x: 2, y: 2 }),
  },
  "pickup.extra-life": bunny,
  "pickup.fast": bunny,
  "pickup.jumps": bunny,
  "pickup.shield": bunny,
  "pickup.reincarnation": deadOrAliveFish,
  "moveableDeadly.deadFish": deadOrAliveFish,
  "pickup.crown": {
    renderAabb: addXyz(smallItemAabb, { x: 2, z: 1 }),
  },
  "pickup.hooter": {
    baseRenderAabbOffset: { x: -2, y: -1, z: 0 },
    renderAabb: addXyz(smallItemAabb, { x: 4, y: -1, z: 1 }),
  },

  "block.tower": {
    renderAabb: addXyz(towerAabb, { x: 3, y: 3 }),
  },
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
  blocker: {
    renderAabb: originXyz,
  },
};
