import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import { type JsonItemUnion } from "../../model/json/JsonItem";
import { type Aabb, addXyz, originXyz } from "../../utils/vectors/vectors";
import { blockSizePx } from "../physics/mechanicsConstants";

export const smallItemAabb: Aabb = { x: 12, y: 12, z: blockSizePx.z };
const mediumItemAabb: Aabb = { x: 14, y: 14, z: blockSizePx.z };
export const fullBlockAabb: Aabb = { x: 16, y: 16, z: blockSizePx.z };
const doubleHeightCharacter: Aabb = {
  ...smallItemAabb,
  z: blockSizePx.z * 2,
};

type BoundingBoxForItem = {
  readonly aabb: Aabb;
  /** the render extent - camera-invariant, since the sprite doesn't rotate */
  readonly renderAabb?: Aabb;
  /** the base-angle render offset, which renderAabbOffset at each camera angle is derived from */
  readonly baseRenderAabbOffset?: Aabb;
};

const volcanoAabbInfo: BoundingBoxForItem = {
  aabb: fullBlockAabb,
  baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(fullBlockAabb, { x: 2, y: 2 }),
};

export const headAabbInfo: BoundingBoxForItem = {
  // head's nose is rendered outside of his bb in the original when facing away/left:
  aabb: smallItemAabb,
  baseRenderAabbOffset: { x: -0.5, y: -0.5, z: 0 },
  renderAabb: addXyz(smallItemAabb, { x: 3, y: 3, z: 1 }),
};
export const heelsAabbInfo: BoundingBoxForItem = {
  // Heels's feet rendered outside of his bb in the original when facing towards/right:
  aabb: smallItemAabb,
  baseRenderAabbOffset: { x: -1.5, y: -1.5, z: 0 },
  renderAabb: addXyz(smallItemAabb, { x: 2, y: 2, z: 2 }),
};
export const headOverHeelsAabbInfo: BoundingBoxForItem = {
  // Heels's feet rendered outside of his bb in the original when facing towards/right:
  aabb: doubleHeightCharacter,
  baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(doubleHeightCharacter, { x: 4, y: 4 }),
};

const ballAabbInfo: BoundingBoxForItem = {
  aabb: smallItemAabb,
  baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(smallItemAabb, { x: 1, y: 1, z: 1 }),
};
const slidingPuckAabbInfo: BoundingBoxForItem = {
  aabb: smallItemAabb,
  baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(smallItemAabb, { x: 1, y: 1, z: 1 }),
};
const springAabbInfo: BoundingBoxForItem = {
  // compressed size:
  aabb: smallItemAabb,
  // uncompressed rendered size:
  renderAabb: addXyz(smallItemAabb, { z: 2 }),
};
const liftAabbInfo: BoundingBoxForItem = {
  aabb: smallItemAabb,
  baseRenderAabbOffset: { x: 0, y: 0, z: -2 },
  renderAabb: addXyz(smallItemAabb, { z: 3 }),
};
const charlesOrElephantAabbInfo: BoundingBoxForItem = {
  aabb: doubleHeightCharacter,
  baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
  // those ears/that trunk!
  renderAabb: addXyz(doubleHeightCharacter, { x: 5, y: 5 }),
};
const elephantHeadAabbInfo: BoundingBoxForItem = {
  aabb: smallItemAabb,
  baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
  // those ears/that trunk!
  renderAabb: addXyz(smallItemAabb, { x: 5, y: 5 }),
};
const bubbleRobotAabbInfo: BoundingBoxForItem = {
  aabb: doubleHeightCharacter,
  baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(doubleHeightCharacter, { x: 2, y: 2 }),
};
const computerBotAabbInfo: BoundingBoxForItem = {
  aabb: doubleHeightCharacter,
  baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(doubleHeightCharacter, { x: 4, y: 4 }),
};
const switchAabbInfo: BoundingBoxForItem = {
  aabb: smallItemAabb,
  renderAabb: addXyz(smallItemAabb, { z: 3 }),
};
const buttonAabbInfo: BoundingBoxForItem = {
  // match the compressed size, since this is when the
  // item will be stood on, which is when the z-size most
  // matters
  aabb: { x: 15, y: 15, z: 2 },

  // but render at the uncompressed size:
  renderAabb: { x: 15, y: 15, z: 4 },
};
const scrollAabb = { x: 16, y: 4, z: 13 };
const scrollAabbInfo: BoundingBoxForItem = {
  aabb: scrollAabb,
  baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(scrollAabb, { x: 2, y: 2 }),
};
const bunnyAabbInfo: BoundingBoxForItem = {
  aabb: smallItemAabb,
  // those ears!
  renderAabb: addXyz(smallItemAabb, { y: 1, z: 1 }),
};
const fishAabbInfo: BoundingBoxForItem = {
  aabb: smallItemAabb,
  renderAabb: addXyz(smallItemAabb, { x: 1, y: 1, z: 4 }),
};
const crownAabbInfo: BoundingBoxForItem = {
  aabb: smallItemAabb,
  renderAabb: addXyz(smallItemAabb, { x: 2, z: 1 }),
};
const hooterAabbInfo: BoundingBoxForItem = {
  aabb: smallItemAabb,
  baseRenderAabbOffset: { x: -2, y: -1, z: 0 },
  renderAabb: addXyz(smallItemAabb, { x: 4, y: -1, z: 1 }),
};
const dalekAabbInfo: BoundingBoxForItem = {
  aabb: smallItemAabb,
  renderAabb: addXyz(smallItemAabb, { x: 1, y: 1 }),
};
const turtleAabbInfo: BoundingBoxForItem = {
  aabb: smallItemAabb,
  baseRenderAabbOffset: {
    ...originXyz,
    z: -2,
  },
  renderAabb: addXyz(smallItemAabb, { x: 2, y: 2, z: 2 }),
};
const helicopterBugAabbInfo: BoundingBoxForItem = {
  aabb: smallItemAabb,
  baseRenderAabbOffset: {
    ...originXyz,
    z: -2,
  },
  renderAabb: addXyz(smallItemAabb, { z: 3 }),
};
const fullBlockWithSlightOverdrawAabbInfo: BoundingBoxForItem = {
  aabb: fullBlockAabb,
  baseRenderAabbOffset: { x: -1, y: -1, z: 0 },
  renderAabb: addXyz(fullBlockAabb, { x: 2, y: 2 }),
};
const cybermanAabbInfo: BoundingBoxForItem = {
  aabb: doubleHeightCharacter,
  baseRenderAabbOffset: { ...originXyz, z: -3 },
  renderAabb: addXyz(doubleHeightCharacter, { z: 5 }),
};

const towerAabb = { x: 11, y: 11, z: blockSizePx.z };
const towerAabbInfo: BoundingBoxForItem = {
  aabb: towerAabb,
  renderAabb: addXyz(towerAabb, { x: 3, y: 3 }),
};
const smallItemWithoutOverdrawAabbInfo: BoundingBoxForItem = {
  aabb: smallItemAabb,
};
const fullBlockWithoutOverdrawAabbInfo: BoundingBoxForItem = {
  aabb: fullBlockAabb,
};
const barrierXAabbInfo: BoundingBoxForItem = {
  aabb: { x: 15, y: 4, z: blockSizePx.z },
};
const barrierYAabbInfo: BoundingBoxForItem = {
  aabb: { x: 4, y: 15, z: blockSizePx.z },
};
const zeroVolumeAabb: BoundingBoxForItem = {
  aabb: originXyz,
};
const skiHeadAabbInfo: BoundingBoxForItem = {
  // not a full two blocks (24px) high - experimental, truer to the rendering:
  aabb: { ...smallItemAabb, z: 21 },
};
export const boundingBoxForItem = (
  item: JsonItemUnion | UnionOfAllItemInPlayTypes,
): BoundingBoxForItem => {
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

    case "lamp":
    case "mirror":
      return fullBlockWithoutOverdrawAabbInfo;
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

    case "floatingText":
    case "timer":
      return zeroVolumeAabb;

    case "emitter":
      return item.config.times ? { aabb: fullBlockAabb } : zeroVolumeAabb;

    default:
      //console.warn("giving default aabb for item", item);
      return { aabb: mediumItemAabb };
  }
};
