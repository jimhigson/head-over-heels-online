import { type JsonItemUnion } from "../../../model/json/JsonItem";
import { tangentAxis } from "../../../utils/vectors/vectors";
import { type ShadowCastSpriteOptions } from "../../render/ShadowCastSpriteOptions";

const shadowLift: ShadowCastSpriteOptions =
  import.meta.env.DEV ?
    Object.freeze({
      animationId: "shadow.lift",
    })
  : {
      animationId: "shadow.lift",
    };

const shadowSmallBlock: ShadowCastSpriteOptions =
  import.meta.env.DEV ?
    Object.freeze({
      textureId: "shadow.smallBlock",
    })
  : {
      textureId: "shadow.smallBlock",
    };

export const shadowSmallRound: ShadowCastSpriteOptions =
  import.meta.env.DEV ?
    Object.freeze({
      textureId: "shadow.smallRound",
    })
  : {
      textureId: "shadow.smallRound",
    };

const shadowFullBlock: ShadowCastSpriteOptions =
  import.meta.env.DEV ?
    Object.freeze({
      textureId: "shadow.fullBlock",
    })
  : {
      textureId: "shadow.fullBlock",
    };

const shadowFullBlockFlipX: ShadowCastSpriteOptions =
  import.meta.env.DEV ?
    Object.freeze({
      textureId: "shadow.fullBlock",
      flipX: true,
    })
  : {
      textureId: "shadow.fullBlock",
      flipX: true,
    };

// the barrier shadow art is drawn for a y-axis barrier; the x-axis variant is
// the same art flipped. Which axis the barrier renders along swaps on odd
// quarter camera turns, so the flip must swap with it:
const shadowBarrier: ShadowCastSpriteOptions =
  import.meta.env.DEV ?
    Object.freeze({
      textureId: "shadow.barrier.y",
      flipsOnOddQuarterCameraTurns: true,
    })
  : {
      textureId: "shadow.barrier.y",
      flipsOnOddQuarterCameraTurns: true,
    };

const shadowBarrierFlipX: ShadowCastSpriteOptions =
  import.meta.env.DEV ?
    Object.freeze({
      textureId: "shadow.barrier.y",
      flipX: true,
      flipsOnOddQuarterCameraTurns: true,
    })
  : {
      textureId: "shadow.barrier.y",
      flipX: true,
      flipsOnOddQuarterCameraTurns: true,
    };

const shadowScroll: ShadowCastSpriteOptions =
  import.meta.env.DEV ?
    Object.freeze({
      textureId: "shadow.scroll",
    })
  : {
      textureId: "shadow.scroll",
    };

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
