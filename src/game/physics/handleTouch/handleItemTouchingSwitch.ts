import type { ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import type {
  ItemInPlay,
  ItemInPlayType,
  SwitchSetting,
  UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlay";
import type { ItemState } from "../../../model/ItemState";
import type {
  SwitchConfig,
  SwitchInRoomConfig,
  SwitchItemModificationUnion,
} from "../../../model/json/SwitchConfig";
import type { RoomState } from "../../../model/RoomState";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";

import { iterateRoomItems } from "../../../model/RoomState";
import { toggleBoolean } from "../../../store/slices/gameMenusSlice";
import { store } from "../../../store/store";

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
    return (
      setting === (makesStable ? "left" : "right") ?
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
        }) satisfies Partial<ItemState<"block", RoomId, RoomItemId>>;
  }

  if (modifiesItem.expectType === "monster" && "activates" in modifiesItem) {
    const { activates } = modifiesItem;
    return (
      setting === (activates ? "left" : "right") ?
        {
          activated: true,
          everActivated: true,
        }
      : {
          activated: false,
        }) satisfies Partial<ItemState<"monster", RoomId, RoomItemId>>;
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
  instigator: ItemTypeUnion<"button" | "switch", RoomId, RoomItemId>,
  room: Pick<RoomState<RoomId, RoomItemId>, "items" | "roomTime">,
  visited: Set<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>> = new Set(),
) => {
  // mark that we shouldn't visit this switch again:
  visited.add(instigator);

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

      if (visited.has(roomItem)) {
        continue;
      }

      if (roomItem.type !== modifiesItem.expectType) {
        throw new Error(
          `item "${roomItem.id}" is of type "${roomItem.type}" - does not match expected type "${modifiesItem.expectType}"
          from switch config ${JSON.stringify(instigator.config, null, 2)}`,
        );
      }

      const targetItemCast = roomItem as Omit<typeof roomItem, "state"> & {
        state: Record<string, unknown>;
      };

      console.log(
        "applying modifies item",
        modifiesItem,
        getNewState(modifiesItem, newSetting),
        "to",
        targetItemCast.id,
      );

      // loop the states to modify:
      targetItemCast.state = {
        ...roomItem.state,
        ...getNewState(modifiesItem, newSetting),
        switchedAtRoomTime: room.roomTime,
        switchedSetting: newSetting,
      };

      //mark that we shouldn't visit this room item again:
      visited.add(roomItem);

      if (roomItem.type === "switch") {
        // special cases for switches activating other switches, which can then do their activations too:
        handleSwitchActivation(roomItem, room, visited);
      }
    }
  }
};

const toggleSwitchInRoom = <RoomId extends string, RoomItemId extends string>(
  switchItem: ItemInPlay<"switch", RoomId, RoomItemId> & {
    config: SwitchInRoomConfig<RoomId, RoomItemId>;
  },
  room: Pick<RoomState<RoomId, RoomItemId>, "items" | "roomTime">,
  visited?: Set<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>,
) => {
  const newSetting = oppositeSetting(switchItem.state.setting);

  switchItem.state.setting = newSetting;

  const modifiesList = switchItem.config.modifies;

  // loop over the top-level of the switch's modification list:
  applyModifiesList(modifiesList, newSetting, switchItem, room, visited);
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
  visited?: Set<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>,
) => {
  if (isInRoomSwitch(switchItem)) {
    toggleSwitchInRoom<RoomId, RoomItemId>(switchItem, room, visited);
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

  handleSwitchActivation(switchItem, room);
};
