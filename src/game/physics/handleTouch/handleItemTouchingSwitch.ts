import type { ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import type {
  ItemInPlay,
  ItemInPlayType,
  SwitchSetting,
} from "../../../model/ItemInPlay";
import type {
  SwitchConfig,
  SwitchInRoomConfig,
  SwitchItemModificationUnion,
} from "../../../model/json/SwitchConfig";
import type { RoomState } from "../../../model/RoomState";
import { iterateRoomItems } from "../../../model/RoomState";
import { toggleBoolean } from "../../../store/slices/gameMenusSlice";
import { store } from "../../../store/store";
import { emptyArray } from "../../../utils/empty";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";

const oppositeSetting = (setting: string) => {
  return setting === "left" ? "right" : "left";
};

const getNewState = <RoomId extends string, RoomItemId extends string>(
  modifiesItem: SwitchItemModificationUnion<RoomId, RoomItemId>,
  setting: SwitchSetting,
) => {
  // controlling other switches has a shorthand syntax:
  if (modifiesItem.expectType === "switch" && "flip" in modifiesItem) {
    // don't flip it - it will flip itself when we descend to it in the recursion
    return {};
  }

  if (modifiesItem.expectType === "block" && "makesStable" in modifiesItem) {
    const { makesStable } = modifiesItem;
    return setting === (makesStable ? "left" : "right") ?
        {
          // do not disappear =
          // makesStable = true and switch left,
          // or makesStable = false and switch right
          disappearing: null,
        }
      : {
          disappearing: {
            on: "stand",
          },
        };
  }

  return modifiesItem[`${setting}State`];
};

// exported for buttons
export const applyModifiesList = <
  RoomId extends string,
  RoomItemId extends string,
>(
  modifiesList: SwitchItemModificationUnion<RoomId, RoomItemId>[],
  newSetting: SwitchSetting,
  instigator: ItemTypeUnion<"switch" | "button", RoomId, RoomItemId>,
  room: Pick<RoomState<RoomId, RoomItemId>, "items" | "roomTime">,
  chain: Array<
    ItemTypeUnion<"switch" | "button", RoomId, RoomItemId>
  > = emptyArray,
) => {
  for (const modifiesItem of modifiesList) {
    // loop here because there could be multiple items with the same jsonItemId
    for (const roomItem of iterateRoomItems(room.items)) {
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
          `item "${roomItem.id}" is of type "${roomItem.type}" - does not match expected type "${modifiesItem.expectType}"
          from switch config ${JSON.stringify(instigator.config, null, 2)}`,
        );
      }

      const targetItemCast = roomItem as {
        state: Record<string, unknown>;
      };

      // loop the states to modify:
      targetItemCast.state = {
        ...roomItem.state,
        ...getNewState(modifiesItem, newSetting),
        switchedAtRoomTime: room.roomTime,
        switchedSetting: newSetting,
      };

      if (
        roomItem.type === "switch" &&
        // avoid infinite loops:
        !chain.includes(roomItem)
      ) {
        // special cases for switches activating other switches, which can then do their activations too:
        handleSwitchActivation(roomItem, room, [...chain, instigator]);
      }
    }
  }
};

const toggleSwitchInRoom = <RoomId extends string, RoomItemId extends string>(
  switchItem: ItemInPlay<"switch", RoomId, RoomItemId> & {
    config: SwitchInRoomConfig<RoomId, RoomItemId>;
  },
  room: Pick<RoomState<RoomId, RoomItemId>, "items" | "roomTime">,
  chain: Array<ItemTypeUnion<"switch" | "button", RoomId, RoomItemId>>,
) => {
  const newSetting = oppositeSetting(switchItem.state.setting);

  switchItem.state.setting = newSetting;

  const modifiesList = switchItem.config.modifies;

  // loop over the top-level of the switch's modification list:
  applyModifiesList(modifiesList, newSetting, switchItem, room, chain);
};

const isInRoomSwitch = <RoomId extends string, RoomItemId extends string>(
  switchItem: ItemInPlay<"switch", RoomId, RoomItemId>,
): switchItem is ItemInPlay<"switch", RoomId, RoomItemId> & {
  config: SwitchInRoomConfig<RoomId, RoomItemId>;
} => {
  return switchItem.config.type === "in-room";
};

const handleSwitchActivation = <
  RoomId extends string,
  RoomItemId extends string,
>(
  switchItem: ItemInPlay<"switch", RoomId, RoomItemId>,
  room: Pick<RoomState<RoomId, RoomItemId>, "items" | "roomTime">,
  /**
   * chain of causation - a list of the switches that flipped to flip this one.
   * needed to avoid infinite loops
   */
  chain: Array<ItemTypeUnion<"switch" | "button", RoomId, RoomItemId>>,
) => {
  if (isInRoomSwitch(switchItem)) {
    toggleSwitchInRoom<RoomId, RoomItemId>(switchItem, room, chain);
  } else {
    const config = switchItem.config as Exclude<
      SwitchConfig<RoomId, RoomItemId>,
      SwitchInRoomConfig<RoomId, RoomItemId>
    >;
    store.dispatch(toggleBoolean(config.path));
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
    // TODO: progression here could easily be roomTime, and progression could
    // be removed as concept from the codebase
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

  handleSwitchActivation(switchItem, room, emptyArray);
};
