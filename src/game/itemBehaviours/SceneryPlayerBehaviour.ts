import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { terminalVelocityPixPerMs } from "../physics/mechanicsConstants";
import { FreeItemBehaviour } from "./freeItem/FreeItemBehaviour";

/**
 * the (non-playable) characters in the final room
 */
export class SceneryPlayerBehaviour extends FreeItemBehaviour {
  constructor() {
    super({
      castsShadowWhileStoodOn: true,
      isPortable: true,
    });
  }

  override terminalFallVelocity<
    RoomId extends string,
    RoomItemId extends string,
  >(sceneryPlayer: ItemTypeUnion<"sceneryPlayer", RoomId, RoomItemId>): number {
    // head glides, so falls slower
    return sceneryPlayer.config.which === "heels" ?
        super.terminalFallVelocity(sceneryPlayer)
      : terminalVelocityPixPerMs.glide;
  }
}
