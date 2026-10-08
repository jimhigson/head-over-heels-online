import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { handleFiredDoughnutTouchingMonster } from "../../physics/handleTouch/handleFiredDoughnutTouchingMonster";
import { type ItemTouchEvent } from "../../physics/handleTouch/ItemTouchEvent";
import { shadowSmallRound } from "../../render/shadows/shadowCastTextures";
import { type ItemBehaviourOptions } from "../ItemBehaviour";
import { LocomotiveBehaviour } from "../locomotion/LocomotiveBehaviour";

/**
 * the behaviour common to all monsters. Subclasses give the behaviour of
 * individual monsters (by the config's `which`) where it differs
 */
export class MonsterBehaviour extends LocomotiveBehaviour {
  constructor(options: ItemBehaviourOptions = {}) {
    super({
      shadowCastTexture: shadowSmallRound,
      ...options,
    });
  }

  override isDeadly<RoomId extends string, RoomItemId extends string>(
    monster: ItemTypeUnion<"monster", RoomId, RoomItemId>,
  ): monster is ItemTypeUnion<"monster", RoomId, RoomItemId> {
    // deactivated monsters are harmless:
    return monster.state.activated;
  }

  override onTouch<RoomId extends string, RoomItemId extends string>(
    monster: ItemTypeUnion<"monster", RoomId, RoomItemId>,
    e: ItemTouchEvent<RoomId, RoomItemId>,
    isMover: boolean,
  ): void {
    if (isMover && e.touchedItem.type === "firedDoughnut") {
      handleFiredDoughnutTouchingMonster(monster);
    }
    super.onTouch(monster, e, isMover);
  }
}
