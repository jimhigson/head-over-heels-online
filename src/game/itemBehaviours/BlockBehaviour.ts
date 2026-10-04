import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import {
  shadowFullBlock,
  shadowSmallRound,
} from "../render/shadows/shadowCastTextures";
import { ItemBehaviour } from "./ItemBehaviour";

export class BlockBehaviour extends ItemBehaviour {
  constructor() {
    super();
  }

  override shadowCastTexture<RoomId extends string, RoomItemId extends string>(
    block: ItemTypeUnion<"block", RoomId, RoomItemId>,
  ) {
    return block.config.style === "tower" ? shadowSmallRound : shadowFullBlock;
  }

  override isCuboidWarped<RoomId extends string, RoomItemId extends string>(
    block: ItemTypeUnion<"block", RoomId, RoomItemId>,
  ): boolean {
    // towers' art is a repeated column, not a single box, so would distort:
    return block.config.style !== "tower";
  }
}
