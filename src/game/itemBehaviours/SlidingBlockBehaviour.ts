import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import {
  shadowFullBlock,
  shadowSmallRound,
} from "../render/shadows/shadowCastTextures";
import { SlidingItemBehaviour } from "./SlidingItemBehaviour";

/**
 * pucks and books
 */
export class SlidingBlockBehaviour extends SlidingItemBehaviour {
  constructor() {
    super({});
  }

  override shadowCastTexture<RoomId extends string, RoomItemId extends string>(
    slidingBlock: ItemTypeUnion<"slidingBlock", RoomId, RoomItemId>,
  ) {
    return slidingBlock.config.style === "book" ?
        shadowFullBlock
      : shadowSmallRound;
  }

  override isPortable<RoomId extends string, RoomItemId extends string>(
    slidingBlock: ItemTypeUnion<"slidingBlock", RoomId, RoomItemId>,
  ): boolean {
    // only the small ones:
    return slidingBlock.config.style === "puck";
  }

  override isCuboidWarped<RoomId extends string, RoomItemId extends string>(
    slidingBlock: ItemTypeUnion<"slidingBlock", RoomId, RoomItemId>,
  ): boolean {
    // the round puck would distort as a cuboid:
    return slidingBlock.config.style !== "puck";
  }
}
