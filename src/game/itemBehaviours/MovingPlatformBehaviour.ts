import {
  type FreeItem,
  type UnionOfAllItemInPlayTypes,
} from "../../model/ItemInPlayNarrowedUnions";
import { shadowFullBlock } from "../render/shadows/shadowCastTextures";
import { LocomotiveBehaviour } from "./locomotion/LocomotiveBehaviour";

/**
 * the sandwiches
 */
export class MovingPlatformBehaviour extends LocomotiveBehaviour {
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
    // moving platforms are like pushable step-stools, they can ride along lifts without
    // being lifted by them:
    return pusher.type !== "lift";
  }
}
