import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { type RoomState } from "../../../model/RoomState";
import { type GameState } from "../../gameState/GameState";
import { type MechanicResult } from "../../physics/MechanicResult";
import { periodicItemShouldAct } from "../../physics/mechanics/periodicItemShouldAct";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { NonSolidBehaviour } from "../NonSolidBehaviour";
import { applyModifiesList } from "./applyModifiesList";

export class TimerBehaviour extends NonSolidBehaviour {
  constructor() {
    super({
      fixedZIndex: nonRenderingItemFixedZIndex,
    });
  }

  /**
   * timers only keep time - they have no place in the room's space
   */
  override isPositionless<RoomId extends string, RoomItemId extends string>(
    _timer: ItemTypeUnion<"timer", RoomId, RoomItemId>,
  ): _timer is ItemTypeUnion<"timer", RoomId, RoomItemId> {
    return true;
  }

  override mechanicResults<RoomId extends string, RoomItemId extends string>(
    timer: ItemTypeUnion<"timer", RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    _gameState: GameState<RoomId>,
    _deltaMS: number,
    _into: Array<MechanicResult<ItemInPlayType, RoomId, RoomItemId>>,
  ): void {
    const { state } = timer;

    if (
      state.activated &&
      periodicItemShouldAct(
        {
          delay: state.delay,
          period: state.period,
          lastActedAtRoomTime: state.lastFiredAtRoomTime,
        },
        room.roomTime,
      )
    ) {
      const newSetting = state.setting === "left" ? "right" : "left";
      state.setting = newSetting;

      applyModifiesList(state.modifies, newSetting, timer, room);

      state.lastFiredAtRoomTime = room.roomTime;
    }
  }
}
