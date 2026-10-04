import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlayNarrowedUnions";
import { type RoomState } from "../../../model/RoomState";
import { MonsterBehaviour } from "./MonsterBehaviour";

export class CybermanBehaviour extends MonsterBehaviour {
  constructor() {
    super({
      castsShadowWhileStoodOn: true,
    });
  }

  override isPushableBy<RoomId extends string, RoomItemId extends string>(
    cyberman: ItemTypeUnion<"monster", RoomId, RoomItemId>,
    pusher: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    forceful: boolean,
  ): cyberman is ItemTypeUnion<"monster", RoomId, RoomItemId> {
    return (
      super.isPushableBy(cyberman, pusher, forceful) &&
      // can't push cybermen while they're charging:
      cyberman.state.everActivated !== false
    );
  }

  /**
   * cybermen waking up switch off a toaster they are stood on
   */
  override onActivated<RoomId extends string, RoomItemId extends string>(
    cyberman: ItemTypeUnion<"monster", RoomId, RoomItemId>,
    room: Pick<RoomState<RoomId, RoomItemId>, "items">,
  ): void {
    const { standingOnItemId } = cyberman.state;
    if (standingOnItemId === null) {
      return;
    }
    const standingOn = room.items[standingOnItemId];
    if (
      standingOn.type === "deadlyBlock" &&
      standingOn.config.style === "toaster"
    ) {
      standingOn.state.disabled = true;
    }
  }
}
