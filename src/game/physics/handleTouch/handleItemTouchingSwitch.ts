import type {
  ItemInPlay,
  ItemInPlayType,
  SwitchSetting,
} from "../../../model/ItemInPlay";
import type {
  SwitchInRoomConfig,
  SwitchItemModificationUnion,
} from "../../../model/json/SwitchConfig";
import type { RoomState } from "../../../model/RoomState";
import {
  iterateRoomItems,
  type RoomStateItems,
} from "../../../model/RoomState";
import { toggleBoolean } from "../../../store/slices/gameMenusSlice";
import { store } from "../../../store/store";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";

const oppositeSetting = (setting: string) => {
  return setting === "left" ? "right" : "left";
};

const getNewState = <RoomId extends string, RoomItemId extends string>(
  modifiesItem: SwitchItemModificationUnion<RoomId, RoomItemId>,
  setting: SwitchSetting,
) => {
  // controlling other switches has a shorthand syntax:
  if ("flip" in modifiesItem) {
    if (modifiesItem.flip === "opposite") {
      return { setting: oppositeSetting(setting) };
    } else {
      return { setting };
    }
  }

  return modifiesItem[`${setting}State`];
};

// exported for testing
export const toggleSwitchInRoom = <
  RoomId extends string,
  RoomItemId extends string,
>(
  switchConfig: SwitchInRoomConfig<NoInfer<RoomId>, NoInfer<RoomItemId>>,
  newSetting: SwitchSetting,
  roomItems: RoomStateItems<RoomId, RoomItemId>,
  roomTime: number,
) => {
  const modifiedList = switchConfig.modifies;

  // loop over the top-level of the switch's modification list:
  for (const modifiesItem of modifiedList) {
    // loop here because there could be multiple items with the same jsonItemId
    for (const roomItem of iterateRoomItems(roomItems)) {
      if (
        !roomItem.jsonItemId ||
        !modifiesItem.targets.includes(roomItem.jsonItemId)
      ) {
        // skip items that are not targeted by this switch
        continue;
      }

      if (roomItem === undefined) {
        // item could have been deleted from the room (ie, be a disappearing block
        // that's already been stood on)
        continue;
      }

      if (roomItem.type !== modifiesItem.expectType) {
        throw new Error(
          `item "${roomItem.id}" is of type "${roomItem.type}" - does not match expected type "${modifiesItem.expectType}" from switch config ${JSON.stringify(switchConfig, null, 2)}`,
        );
      }

      const targetItemCast = roomItem as {
        state: Record<string, unknown>;
      };

      // loop the states to modify:
      targetItemCast.state = {
        ...roomItem.state,
        ...getNewState(modifiesItem, newSetting),
        switchedAtRoomTime: roomTime,
        switchedSetting: newSetting,
      };
    }
  }
};

const handleSwitchActivation = <
  RoomId extends string,
  RoomItemId extends string,
>(
  touchedItem: ItemInPlay<"switch", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
) => {
  const {
    config: switchConfig,
    state: { setting },
  } = touchedItem;

  switch (switchConfig.type) {
    case "in-room": {
      const newSetting = oppositeSetting(setting);
      touchedItem.state.setting = newSetting;

      toggleSwitchInRoom<RoomId, RoomItemId>(
        switchConfig,
        newSetting,
        room.items,
        room.roomTime,
      );
      // break for switch
      break;
    }
    case "in-store": {
      store.dispatch(toggleBoolean(switchConfig.path));
      break;
    }
    default:
      switchConfig satisfies never;
  }
};

export const handleItemTouchingSwitch = <
  RoomId extends string,
  RoomItemId extends string,
>({
  touchedItem: switchItem,
  gameState: { progression },
  room,
}: ItemTouchEventByItemType<RoomId, RoomItemId, ItemInPlayType, "switch">) => {
  const {
    state: { touchedOnProgression },
  } = switchItem;

  switchItem.state.touchedOnProgression = progression;

  if (
    // touched on the last progression
    progression === touchedOnProgression + 1 ||
    // touched on this progression (handled touch twice in one frame)
    progression === touchedOnProgression
  ) {
    // switch was already being pressed so skip it:
    return;
  }

  handleSwitchActivation(switchItem, room);
};
