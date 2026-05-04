import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";
import type { GameState } from "../../gameState/GameState";

import { applyModifiesList } from "../handleTouch/handleItemTouchingSwitch/handleItemTouchingSwitch";
import { periodicItemShouldAct } from "./periodicItemShouldAct";

export const timerToggle = <RoomId extends string, RoomItemId extends string>(
  timer: ItemInPlay<"timer", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  _gameState: GameState<RoomId>,
  _deltaMS: number,
): undefined => {
  const { state } = timer;

  if (!state.activated) {
    return;
  }

  if (
    !periodicItemShouldAct(
      {
        delay: state.delay,
        period: state.period,
        lastActedAtRoomTime: state.lastFiredAtRoomTime,
      },
      room.roomTime,
    )
  ) {
    return;
  }

  const newSetting = state.setting === "left" ? "right" : "left";
  state.setting = newSetting;

  applyModifiesList(state.modifies, newSetting, timer, room);

  state.lastFiredAtRoomTime = room.roomTime;
};
