import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import { type JsonItemUnion } from "../../model/json/JsonItem";
import { type Aabb, originXyz } from "../../utils/vectors/vectors";
import { blockSizePx } from "../physics/mechanicsConstants";

export const smallItemAabb: Aabb = { x: 12, y: 12, z: blockSizePx.z };
const mediumItemAabb: Aabb = { x: 14, y: 14, z: blockSizePx.z };
export const fullBlockAabb: Aabb = { x: 16, y: 16, z: blockSizePx.z };
export const doubleHeightCharacterAabb: Aabb = {
  ...smallItemAabb,
  z: blockSizePx.z * 2,
};

// physical box for playable characters (their sprites overdraw this - see
// the itemRenderExtents table in the spritesheet meta):
export const headAabb = smallItemAabb;
export const heelsAabb = smallItemAabb;
export const headOverHeelsAabb = doubleHeightCharacterAabb;

export const towerAabb: Aabb = { x: 11, y: 11, z: blockSizePx.z };
const scrollAabb: Aabb = { x: 16, y: 4, z: 13 };
// match the compressed size, since this is when the item will be stood on,
// which is when the z-size most matters:
const buttonAabb: Aabb = { x: 15, y: 15, z: 2 };
const barrierXAabb: Aabb = { x: 15, y: 4, z: blockSizePx.z };
const barrierYAabb: Aabb = { x: 4, y: 15, z: blockSizePx.z };
// not a full two blocks (24px) high - experimental, truer to the rendering:
const skiHeadAabb: Aabb = { ...smallItemAabb, z: 21 };

/**
 * the PHYSICAL bounding box for an item kind, for collision detection. Purely
 * physical: how the item kind *draws* relative to this box is the
 * itemRenderExtents table in the spritesheet meta
 */
export const boundingBoxForItem = (
  item: JsonItemUnion | UnionOfAllItemInPlayTypes,
): Aabb => {
  switch (item.type) {
    case "spring":
    case "portableBlock":
    case "slidingDeadly":
    case "firedDoughnut":
    case "lift":
    case "switch":
    case "ball":
    case "bubbles":
      return smallItemAabb;

    case "moveableDeadly":
      if (item.config.style === "deadFish") {
        return smallItemAabb;
      }
      return mediumItemAabb;

    case "pickup":
      return item.config.gives === "scroll" ? scrollAabb : smallItemAabb;

    case "slidingBlock":
      return item.config.style === "book" ? fullBlockAabb : smallItemAabb;

    case "button":
      return buttonAabb;

    case "charles":
      return doubleHeightCharacterAabb;

    case "pushableBlock":
    case "movingPlatform":
    case "spikes":
    case "conveyor":
    case "hushPuppy":
    case "lamp":
    case "mirror":
    case "teleporter":
    case "deadlyBlock":
      return fullBlockAabb;

    case "block": {
      switch (item.config.style) {
        case "artificial":
        case "organic":
        case "book":
          return fullBlockAabb;
        case "tower":
          return towerAabb;
        default:
          throw new Error("unknown block style");
      }
    }
    case "monster":
      switch (item.config.which) {
        case "skiHead":
          return skiHeadAabb;
        case "cyberman":
        case "elephant":
        case "bubbleRobot":
        case "emperorsGuardian":
        case "monkey":
        case "computerBot":
          return doubleHeightCharacterAabb;
        case "dalek":
        case "homingBot":
        case "turtle":
        case "helicopterBug":
        case "emperor":
        case "elephantHead":
          return smallItemAabb;
        default:
          item.config satisfies never;
          throw new Error(`unknown monster type`);
      }

    case "barrier":
      return item.config.axis === "y" ? barrierYAabb : barrierXAabb;

    case "sceneryPlayer":
      switch (item.config.which) {
        case "head":
          return headAabb;
        case "heels":
          return heelsAabb;
        case "headOverHeels":
          return headOverHeelsAabb;
        default:
          item.config.which satisfies never;
          throw new Error(`unknown sceneryPlayer character`);
      }

    case "floatingText":
    case "timer":
      return originXyz;

    case "emitter":
      return item.config.times ? fullBlockAabb : originXyz;

    default:
      return mediumItemAabb;
  }
};
