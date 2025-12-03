import type { JsonItemUnion } from "../../../model/json/JsonItem";
import type { CreateSpriteOptions } from "../../render/createSprite";

import { tangentAxis } from "../../../utils/vectors/vectors";

const shadowLift: CreateSpriteOptions = Object.freeze({
  animationId: "shadow.lift",
  spritesheetVariant: "original",
});

const shadowSmallBlock: CreateSpriteOptions = Object.freeze({
  textureId: "shadow.smallBlock",
  spritesheetVariant: "original",
});

const shadowSmallRound: CreateSpriteOptions = Object.freeze({
  textureId: "shadow.smallRound",
  spritesheetVariant: "original",
});

const shadowFullBlock: CreateSpriteOptions = Object.freeze({
  textureId: "shadow.fullBlock",
  spritesheetVariant: "original",
});

const shadowFullBlockFlipX: CreateSpriteOptions = Object.freeze({
  textureId: "shadow.fullBlock",
  flipX: true,
  spritesheetVariant: "original",
});

const shadowBarrier: CreateSpriteOptions = Object.freeze({
  textureId: "shadow.barrier.y",
  spritesheetVariant: "original",
});

const shadowBarrierFlipX: CreateSpriteOptions = Object.freeze({
  textureId: "shadow.barrier.y",
  flipX: true,
  spritesheetVariant: "original",
});

const shadowScroll: CreateSpriteOptions = Object.freeze({
  textureId: "shadow.scroll",
  spritesheetVariant: "original",
});

export const loadItemShadowCast = (
  jsonItem: JsonItemUnion,
): CreateSpriteOptions | undefined => {
  switch (jsonItem.type) {
    case "lift":
      return shadowLift;
    case "switch":
      return shadowSmallBlock;
    case "conveyor":
      return tangentAxis(jsonItem.config.direction) === "x" ?
          shadowFullBlockFlipX
        : shadowFullBlock;
    case "barrier":
      return jsonItem.config.axis === "x" ? shadowBarrierFlipX : shadowBarrier;
    case "spring":
    case "firedDoughnut":
    case "slidingDeadly":
      return shadowSmallRound;
    case "block":
      return jsonItem.config.style === "tower" ?
          shadowSmallRound
        : shadowFullBlock;
    case "pushableBlock":
    case "movingPlatform":
    case "hushPuppy":
    case "deadlyBlock":
    case "teleporter":
    case "spikes":
      return shadowFullBlock;
    case "portableBlock":
      return jsonItem.config.style === "drum" ?
          shadowSmallRound
        : shadowSmallBlock;
    case "pickup":
      return jsonItem.config.gives === "scroll" ?
          shadowScroll
        : shadowSmallRound;
    case "ball":
    case "charles":
    case "monster":
      return shadowSmallRound;
    case "slidingBlock":
      return jsonItem.config.style === "book" ?
          shadowFullBlock
        : shadowSmallRound;
  }
};
