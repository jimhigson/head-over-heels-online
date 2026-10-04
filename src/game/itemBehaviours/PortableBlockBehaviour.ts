import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import {
  shadowSmallBlock,
  shadowSmallRound,
} from "../render/shadows/shadowCastTextures";
import { FreeItemBehaviour } from "./freeItem/FreeItemBehaviour";

export class PortableBlockBehaviour extends FreeItemBehaviour {
  override shadowCastTexture<RoomId extends string, RoomItemId extends string>(
    portableBlock: ItemTypeUnion<"portableBlock", RoomId, RoomItemId>,
  ) {
    return portableBlock.config.style === "drum" ?
        shadowSmallRound
      : shadowSmallBlock;
  }

  override isCuboidWarped<RoomId extends string, RoomItemId extends string>(
    portableBlock: ItemTypeUnion<"portableBlock", RoomId, RoomItemId>,
  ): boolean {
    // the round drum would distort as a cuboid:
    return portableBlock.config.style !== "drum";
  }
}
