import {
  type FreeItem,
  type UnionOfAllItemInPlayTypes,
} from "../../model/ItemInPlayNarrowedUnions";
import {
  heavyItemMass,
  terminalVelocityPixPerMs,
} from "../physics/mechanicsConstants";
import { shadowFullBlock } from "../render/shadows/shadowCastTextures";
import { FreeItemBehaviour } from "./freeItem/FreeItemBehaviour";

/**
 * the metal step stools
 */
export class PushableBlockBehaviour extends FreeItemBehaviour {
  constructor() {
    super({
      shadowCastTexture: shadowFullBlock,
      isCuboidWarped: true,
    });
  }

  override isPushableBy<RoomId extends string, RoomItemId extends string>(
    _item: FreeItem<RoomId, RoomItemId>,
    pusher: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    _forceful: boolean,
  ): _item is FreeItem<RoomId, RoomItemId> {
    // to match the original game, pushable blocks stop lifts
    return pusher.type !== "lift";
  }

  override mass(): number {
    return heavyItemMass;
  }

  override terminalFallVelocity(): number {
    return terminalVelocityPixPerMs.fall * 1.4;
  }

  override castsShadowWhileStoodOn(): boolean {
    // the stepstool sees its own shadow through the hole in it
    return true;
  }
}
