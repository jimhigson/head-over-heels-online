import { type JsonItemUnion } from "../../../model/json/JsonItem";
import { tangentAxis } from "../../../utils/vectors/vectors";
import { type ShadowCastSpriteOptions } from "../../render/ShadowCastSpriteOptions";

const shadowLift: ShadowCastSpriteOptions = Object.freeze({
  animationId: "shadow.lift",
});

const shadowSmallBlock: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.smallBlock",
});

export const shadowSmallRound: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.smallRound",
});

const shadowFullBlock: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.fullBlock",
});

const shadowFullBlockFlipX: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.fullBlock",
  flipX: true,
});

const shadowBarrier: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.barrier.y",
});

const shadowBarrierFlipX: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.barrier.y",
  flipX: true,
});

const shadowScroll: ShadowCastSpriteOptions = Object.freeze({
  textureId: "shadow.scroll",
});

export const loadItemShadowCast = (
  jsonItem: JsonItemUnion,
): ShadowCastSpriteOptions | undefined => {
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
    case "lamp":
    case "mirror":
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
