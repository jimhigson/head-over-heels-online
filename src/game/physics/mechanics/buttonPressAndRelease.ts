import { isEmpty, objectKeys } from "iter-tools";

import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";

import { applyModifiesList } from "../handleTouch/handleItemTouchingSwitch";
import { type MechanicResult, unitMechanicalResult } from "../MechanicResult";
import { buttonStayPressedAfterReleasePeriod } from "../mechanicsConstants";

const pressedMechanicResult: MechanicResult<"button", string, string> = {
  movementType: "steady",
  stateDelta: {
    pressed: true,
  },
};
const releasedMechanicResult: MechanicResult<"button", string, string> = {
  movementType: "steady",
  stateDelta: {
    pressed: false,
  },
};

export const buttonPressAndRelease = <
  RoomId extends string,
  RoomItemId extends string,
>(
  buttonItem: ItemInPlay<"button", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
): MechanicResult<"button", RoomId, RoomItemId> => {
  const {
    state: { stoodOnUntilRoomTime, stoodOnBy, pressed },
  } = buttonItem;

  const deactivateTime =
    stoodOnUntilRoomTime + buttonStayPressedAfterReleasePeriod;
  const { roomTime } = room;
  const isStoodOn = !isEmpty(objectKeys(stoodOnBy));

  // check is we just stepped over deactivate time:
  const release = !isStoodOn && roomTime > deactivateTime && pressed;
  if (release) {
    applyModifiesList(buttonItem.config.modifies, "right", buttonItem, room);
    return releasedMechanicResult;
  }

  if (!pressed && isStoodOn) {
    applyModifiesList(buttonItem.config.modifies, "left", buttonItem, room);
    return pressedMechanicResult;
  }

  return unitMechanicalResult;
};
