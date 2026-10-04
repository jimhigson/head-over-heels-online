import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { shadowFullBlock } from "../render/shadows/shadowCastTextures";
import { ItemBehaviour } from "./ItemBehaviour";

export class DeadlyBlockBehaviour extends ItemBehaviour {
  constructor() {
    super({
      shadowCastTexture: shadowFullBlock,
      isCuboidWarped: true,
    });
  }

  override isDeadly<RoomId extends string, RoomItemId extends string>(
    deadlyBlock: ItemTypeUnion<"deadlyBlock", RoomId, RoomItemId>,
  ): deadlyBlock is ItemTypeUnion<"deadlyBlock", RoomId, RoomItemId> {
    return !deadlyBlock.state.disabled;
  }
}
