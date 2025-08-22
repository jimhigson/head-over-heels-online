import { originXyz, type Aabb } from "../../utils/vectors/vectors";
import type { UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import type { JsonItemUnion } from "../../model/json/JsonItem";
import { blockSizePx } from "../../sprites/spritePivots";

export const smallItemAabb: Aabb = { x: 12, y: 12, z: blockSizePx.h };
export const mediumItemAabb: Aabb = { x: 14, y: 14, z: blockSizePx.h };
export const fullBlockAabb: Aabb = { x: 16, y: 16, z: blockSizePx.h };
export const doubleHeightCharacter: Aabb = {
  ...smallItemAabb,
  z: blockSizePx.h * 2,
};

export const boundingBoxForItem = (
  item: JsonItemUnion | UnionOfAllItemInPlayTypes,
): { aabb: Aabb; renderAabb?: Aabb } => {
  switch (item.type) {
    case "spring":
    case "portableBlock":
    case "moveableDeadly":
    case "slidingDeadly":
    case "firedDoughnut":
      return { aabb: smallItemAabb };
    case "slidingBlock":
      return item.config.style === "book" ?
          { aabb: fullBlockAabb }
        : { aabb: smallItemAabb };
    case "lift":
      return {
        aabb: { ...smallItemAabb, z: smallItemAabb.z },
      };

    case "switch": {
      return {
        aabb: { ...smallItemAabb, z: smallItemAabb.z },
      };
    }
    case "button": {
      return {
        // match the compressed size, since this is when the
        // item will be stood on, which is when the z-size most
        // matters
        aabb: { x: 15, y: 15, z: 2 },
      };
    }

    case "pickup":
      return item.config.gives === "scroll" ?
          { aabb: { x: 16, y: 4, z: 13 } }
        : { aabb: smallItemAabb };

    case "charles":
      return { aabb: doubleHeightCharacter };

    case "ball":
      return { aabb: { x: 12, y: 12, z: 12 } };
    case "pushableBlock":
    case "movingPlatform":
      return { aabb: fullBlockAabb };

    case "block": {
      switch (item.config.style) {
        case "artificial":
        case "organic":
        case "book":
          return { aabb: fullBlockAabb };
        case "tower":
          return { aabb: { x: 11, y: 11, z: blockSizePx.h } };
        default:
          throw new Error("unknown block style");
      }
    }
    case "monster":
      switch (item.config.which) {
        case "skiHead":
          // this not being a full two blocks (24px) high is experimental and may break some rooms,
          // but is truer to the rendering
          return { aabb: { ...smallItemAabb, z: 21 } };
        case "bubbleRobot":
        case "cyberman":
        case "elephant":
        case "emperorsGuardian":
        case "monkey":
        case "computerBot":
          return { aabb: doubleHeightCharacter };
        case "helicopterBug":
        case "dalek":
        case "emperor":
        case "homingBot":
        case "elephantHead":
          return { aabb: smallItemAabb };
        case "turtle":
          return { aabb: smallItemAabb };
        default:
          item.config satisfies never;
          throw new Error(`unknown monster type`);
      }

    case "deadlyBlock":
    case "spikes":
      return { aabb: fullBlockAabb };

    case "bubbles":
      return { aabb: smallItemAabb };

    case "conveyor":
    case "hushPuppy":
    case "teleporter": {
      return { aabb: fullBlockAabb };
    }
    case "barrier": {
      return {
        aabb:
          item.config.axis === "y" ?
            { x: 3, y: 15, z: blockSizePx.h }
          : { x: 15, y: 3, z: blockSizePx.h },
      };
    }

    case "sceneryPlayer":
      return item.config.which === "headOverHeels" ?
          { aabb: doubleHeightCharacter }
        : { aabb: smallItemAabb };

    case "emitter":
      // zero-size:
      return { aabb: originXyz };

    default:
      //console.warn("giving default aabb for item", item);
      return { aabb: mediumItemAabb };
  }
};
