import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { teleporterIsActive } from "../physics/mechanics/teleporterIsActive";
import { FreeItemBehaviour } from "./freeItem/FreeItemBehaviour";

export class PortableTeleporterBehaviour extends FreeItemBehaviour {
  constructor() {
    super({
      isTeleporter: true,
      isPortable: true,
    });
  }

  override isJumpOffable<RoomId extends string, RoomItemId extends string>(
    portableTeleporter: ItemTypeUnion<"portableTeleporter", RoomId, RoomItemId>,
  ): boolean {
    // can't jump from a teleporter (jump key teleports)
    return !teleporterIsActive(portableTeleporter);
  }
}
