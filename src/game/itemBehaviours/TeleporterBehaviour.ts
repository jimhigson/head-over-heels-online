import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { teleporterIsActive } from "../physics/mechanics/teleporterIsActive";
import { shadowFullBlock } from "../render/shadows/shadowCastTextures";
import { ItemBehaviour } from "./ItemBehaviour";

export class TeleporterBehaviour extends ItemBehaviour {
  constructor() {
    super({
      isTeleporter: true,
      shadowCastTexture: shadowFullBlock,
      isCuboidWarped: true,
    });
  }

  override isJumpOffable<RoomId extends string, RoomItemId extends string>(
    teleporter: ItemTypeUnion<"teleporter", RoomId, RoomItemId>,
  ): boolean {
    // can't jump from a teleporter (jump key teleports)
    return !teleporterIsActive(teleporter);
  }
}
