import type {
  ItemInPlayAAbbInfo,
  UnionOfAllItemInPlayTypes,
} from "../../model/ItemInPlay";
import type { JsonItemUnion } from "../../model/json/JsonItem";

import { type Aabb, addXyz, originXyz } from "../../utils/vectors/vectors";
import { blockSizePx } from "../physics/mechanicsConstants";

export const smallItemAabb: Aabb = { x: 12, y: 12, z: blockSizePx.z };
export const mediumItemAabb: Aabb = { x: 14, y: 14, z: blockSizePx.z };
export const fullBlockAabb: Aabb = { x: 16, y: 16, z: blockSizePx.z };
export const doubleHeightCharacter: Aabb = {
  ...smallItemAabb,
  z: blockSizePx.z * 2,
};

export const volcanoAabbInfo: ItemInPlayAAbbInfo = {
  aabb: fullBlockAabb,
  renderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(fullBlockAabb, { x: 2, y: 2 }),
};

export const headAabbInfo: ItemInPlayAAbbInfo = {
  // head's nose is rendered outside of his bb in the original when facing away/left:
  aabb: smallItemAabb,
  renderAabbOffset: { x: -0.5, y: -0.5, z: 0 },
  renderAabb: addXyz(smallItemAabb, { x: 3, y: 3, z: 1 }),
};
export const heelsAabbInfo: ItemInPlayAAbbInfo = {
  // Heels's feet rendered outside of his bb in the original when facing towards/right:
  aabb: smallItemAabb,
  renderAabbOffset: { x: -1.5, y: -1.5, z: 0 },
  renderAabb: addXyz(smallItemAabb, { x: 2, y: 2, z: 2 }),
};
export const headOverHeelsAabbInfo: ItemInPlayAAbbInfo = {
  // Heels's feet rendered outside of his bb in the original when facing towards/right:
  aabb: doubleHeightCharacter,
  renderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(doubleHeightCharacter, { x: 4, y: 4 }),
};

const ballAabbInfo: ItemInPlayAAbbInfo = {
  aabb: smallItemAabb,
  renderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(smallItemAabb, { x: 1, y: 1, z: 1 }),
};
const slidingPuckAabbInfo: ItemInPlayAAbbInfo = {
  aabb: smallItemAabb,
  renderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(smallItemAabb, { x: 1, y: 1, z: 1 }),
};
const springAabbInfo: ItemInPlayAAbbInfo = {
  // compressed size:
  aabb: smallItemAabb,
  // uncompressed rendered size:
  renderAabb: addXyz(smallItemAabb, { z: 2 }),
};
const liftAabbInfo: ItemInPlayAAbbInfo = {
  aabb: smallItemAabb,
  renderAabbOffset: { x: 0, y: 0, z: -2 },
  renderAabb: addXyz(smallItemAabb, { z: 3 }),
};
const charlesOrElephantAabbInfo: ItemInPlayAAbbInfo = {
  aabb: doubleHeightCharacter,
  renderAabbOffset: { x: -1, y: -1, z: 0 },
  // those ears/that trunk!
  renderAabb: addXyz(doubleHeightCharacter, { x: 5, y: 5 }),
};
const elephantHeadAabbInfo: ItemInPlayAAbbInfo = {
  aabb: smallItemAabb,
  renderAabbOffset: { x: -1, y: -1, z: 0 },
  // those ears/that trunk!
  renderAabb: addXyz(smallItemAabb, { x: 5, y: 5 }),
};
const bubbleRobotAabbInfo: ItemInPlayAAbbInfo = {
  aabb: doubleHeightCharacter,
  renderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(doubleHeightCharacter, { x: 2, y: 2 }),
};
const computerBotAabbInfo: ItemInPlayAAbbInfo = {
  aabb: doubleHeightCharacter,
  renderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(doubleHeightCharacter, { x: 4, y: 4 }),
};
const switchAabbInfo: ItemInPlayAAbbInfo = {
  aabb: smallItemAabb,
  renderAabb: addXyz(smallItemAabb, { z: 3 }),
};
const buttonAabbInfo: ItemInPlayAAbbInfo = {
  // match the compressed size, since this is when the
  // item will be stood on, which is when the z-size most
  // matters
  aabb: { x: 15, y: 15, z: 2 },

  // but render at the uncompressed size:
  renderAabb: { x: 15, y: 15, z: 4 },
};
const scrollAabb = { x: 16, y: 4, z: 13 };
const scrollAabbInfo: ItemInPlayAAbbInfo = {
  aabb: scrollAabb,
  renderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(scrollAabb, { x: 2, y: 2 }),
};
const bunnyAabbInfo: ItemInPlayAAbbInfo = {
  aabb: smallItemAabb,
  // those ears!
  renderAabb: addXyz(smallItemAabb, { y: 1, z: 1 }),
};
const fishAabbInfo: ItemInPlayAAbbInfo = {
  aabb: smallItemAabb,
  renderAabb: addXyz(smallItemAabb, { x: 1, y: 1, z: 4 }),
};
const crownAabbInfo: ItemInPlayAAbbInfo = {
  aabb: smallItemAabb,
  renderAabb: addXyz(smallItemAabb, { x: 2, z: 1 }),
};
const hooterAabbInfo: ItemInPlayAAbbInfo = {
  aabb: smallItemAabb,
  renderAabbOffset: { x: -2, y: -1, z: 0 },
  renderAabb: addXyz(smallItemAabb, { x: 4, y: -1, z: 1 }),
};
const dalekAabbInfo: ItemInPlayAAbbInfo = {
  aabb: smallItemAabb,
  renderAabb: addXyz(smallItemAabb, { x: 1, y: 1 }),
};
const turtleAabbInfo: ItemInPlayAAbbInfo = {
  aabb: smallItemAabb,
  renderAabbOffset: {
    ...originXyz,
    z: -2,
  },
  renderAabb: addXyz(smallItemAabb, { x: 2, y: 2, z: 2 }),
};
const helicopterBugAabbInfo: ItemInPlayAAbbInfo = {
  aabb: smallItemAabb,
  renderAabbOffset: {
    ...originXyz,
    z: -2,
  },
  renderAabb: addXyz(smallItemAabb, { z: 3 }),
};
const fullBlockWithSlightOverdrawAabbInfo: ItemInPlayAAbbInfo = {
  aabb: fullBlockAabb,
  renderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(fullBlockAabb, { x: 2, y: 2 }),
};
const cybermanAabbInfo: ItemInPlayAAbbInfo = {
  aabb: doubleHeightCharacter,
  renderAabbOffset: { ...originXyz, z: -3 },
  renderAabb: addXyz(doubleHeightCharacter, { z: 5 }),
};

const towerAabb = { x: 11, y: 11, z: blockSizePx.z };
const towerAabbInfo: ItemInPlayAAbbInfo = {
  aabb: towerAabb,
  renderAabb: addXyz(towerAabb, { x: 3, y: 3 }),
};
const smallItemWithoutOverdrawAabbInfo: ItemInPlayAAbbInfo = {
  aabb: smallItemAabb,
};
const fullBlockWithoutOverdrawAabbInfo: ItemInPlayAAbbInfo = {
  aabb: fullBlockAabb,
};
const barrierXAabbInfo: ItemInPlayAAbbInfo = {
  aabb: { x: 15, y: 4, z: blockSizePx.z },
};
const barrierYAabbInfo: ItemInPlayAAbbInfo = {
  aabb: { x: 4, y: 15, z: blockSizePx.z },
};
const emitterAabbInfo: ItemInPlayAAbbInfo = {
  // zero size:
  aabb: originXyz,
};
const skiHeadAabbInfo: ItemInPlayAAbbInfo = {
  // not a full two blocks (24px) high - experimental, truer to the rendering:
  aabb: { ...smallItemAabb, z: 21 },
};
export const boundingBoxForItem = (
  item: JsonItemUnion | UnionOfAllItemInPlayTypes,
): ItemInPlayAAbbInfo => {
  switch (item.type) {
    case "spring":
      return springAabbInfo;
    case "moveableDeadly":
      switch (item.config.style) {
        case "deadFish":
          return fishAabbInfo;
      }
      break;
    case "portableBlock":
    case "slidingDeadly":
    case "firedDoughnut":
      return smallItemWithoutOverdrawAabbInfo;
    case "slidingBlock":
      return item.config.style === "book" ?
          fullBlockWithSlightOverdrawAabbInfo
        : slidingPuckAabbInfo;
    case "lift":
      return liftAabbInfo;

    case "switch": {
      return switchAabbInfo;
    }
    case "button": {
      return buttonAabbInfo;
    }

    case "pickup":
      switch (item.config.gives) {
        case "scroll":
          return scrollAabbInfo;
        case "extra-life":
        case "fast":
        case "jumps":
        case "shield":
          return bunnyAabbInfo;
        case "reincarnation":
          return fishAabbInfo;
        case "hooter":
          return hooterAabbInfo;
        case "crown":
          return crownAabbInfo;
        default:
          return smallItemWithoutOverdrawAabbInfo;
      }

    case "charles":
      return charlesOrElephantAabbInfo;

    case "ball":
      return ballAabbInfo;

    case "pushableBlock":
    case "movingPlatform":
      return fullBlockWithSlightOverdrawAabbInfo;

    case "block": {
      switch (item.config.style) {
        case "artificial":
        case "organic":
        case "book":
          return fullBlockWithoutOverdrawAabbInfo;
        case "tower":
          return towerAabbInfo;
        default:
          throw new Error("unknown block style");
      }
    }
    case "monster":
      switch (item.config.which) {
        case "skiHead":
          return skiHeadAabbInfo;
        case "cyberman":
          return cybermanAabbInfo;
        case "elephant":
          return charlesOrElephantAabbInfo;
        case "bubbleRobot":
          return bubbleRobotAabbInfo;
        case "emperorsGuardian":
        case "monkey":
        case "computerBot":
          return computerBotAabbInfo;
        case "dalek":
        case "homingBot":
          return dalekAabbInfo;
        case "turtle":
          return turtleAabbInfo;
        case "helicopterBug":
          return helicopterBugAabbInfo;
        case "emperor":
          return smallItemWithoutOverdrawAabbInfo;
        case "elephantHead":
          return elephantHeadAabbInfo;
        default:
          item.config satisfies never;
          throw new Error(`unknown monster type`);
      }

    case "deadlyBlock":
      switch (item.config.style) {
        case "volcano":
          return volcanoAabbInfo;
        case "toaster":
          return fullBlockWithSlightOverdrawAabbInfo;
        default:
          item.config.style satisfies never;
          throw new Error(`unknown deadly block style`);
      }
    case "spikes":
      return fullBlockWithSlightOverdrawAabbInfo;

    case "bubbles":
      return smallItemWithoutOverdrawAabbInfo;

    case "conveyor":
    case "hushPuppy":
      return fullBlockWithSlightOverdrawAabbInfo;
    case "teleporter": {
      return fullBlockWithSlightOverdrawAabbInfo;
    }
    case "barrier": {
      return item.config.axis === "y" ? barrierYAabbInfo : barrierXAabbInfo;
    }

    case "sceneryPlayer":
      switch (item.config.which) {
        case "head":
          return headAabbInfo;
        case "heels":
          return heelsAabbInfo;
        case "headOverHeels":
          return headOverHeelsAabbInfo;
        default:
          item.config.which satisfies never;
          throw new Error(`unknown sceneryPlayer character`);
      }

    case "emitter":
      return emitterAabbInfo;

    default:
      //console.warn("giving default aabb for item", item);
      return { aabb: mediumItemAabb };
  }
};
