import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";

import { nextSpritesOption } from "../../../store/slices/gameMenus/gameMenusSlice";
import { store } from "../../../store/store";
import { objectEmpty } from "../../../utils/objectEmpty";
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
  const isStoodOn = !objectEmpty(stoodOnBy);

  const { config } = buttonItem;

  // check is we just stepped over deactivate time:
  const release = !isStoodOn && roomTime > deactivateTime && pressed;
  if (release) {
    if (config.type !== "in-store") {
      applyModifiesList(config.modifies, "right", buttonItem, room);
    }
    return releasedMechanicResult as MechanicResult<
      "button",
      RoomId,
      RoomItemId
    >;
  }

  if (!pressed && isStoodOn) {
    if (config.type === "in-store") {
      const storeActions = { nextSpritesOption } as const;
      store.dispatch(storeActions[config.action]());
    } else {
      applyModifiesList(config.modifies, "left", buttonItem, room);
    }
    return pressedMechanicResult as MechanicResult<
      "button",
      RoomId,
      RoomItemId
    >;
  }

  return unitMechanicalResult;
};
