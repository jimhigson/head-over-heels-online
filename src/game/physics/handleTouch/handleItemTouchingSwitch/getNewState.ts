import type {
  SwitchSetting,
  UnionOfAllItemInPlayTypes,
} from "../../../../model/ItemInPlay";
import type { ItemState } from "../../../../model/ItemState";
import type { SwitchItemModificationUnion } from "../../../../model/json/SwitchConfig";

import { emptyObject } from "../../../../utils/empty";
import { unitVectors } from "../../../../utils/vectors/unitVectors";
import { oppositeDirection, scaleXyz } from "../../../../utils/vectors/vectors";

export const getNewState = <RoomId extends string, RoomItemId extends string>(
  modifiesItem: SwitchItemModificationUnion<RoomId, RoomItemId>,
  setting: SwitchSetting,
  targetItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
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

  if (
    (modifiesItem.expectType === "monster" ||
      modifiesItem.expectType === "movingPlatform") &&
    "activates" in modifiesItem
  ) {
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

  if (
    modifiesItem.expectType === "monster" &&
    "switchedDirection" in modifiesItem &&
    modifiesItem.switchedDirection !== undefined
  ) {
    const { switchedDirection } = modifiesItem;
    const directionVector = unitVectors[switchedDirection];
    const facing =
      setting === "left" ? directionVector : scaleXyz(directionVector, -1);
    return { facing } satisfies Partial<
      ItemState<"monster", RoomId, RoomItemId>
    >;
  }

  if (modifiesItem.expectType === "conveyor" && "activates" in modifiesItem) {
    const { activates } = modifiesItem;
    return (
      setting === (activates ? "left" : "right") ?
        { disabled: false }
      : { disabled: true }) satisfies Partial<
      ItemState<"conveyor", RoomId, RoomItemId>
    >;
  }

  if (
    modifiesItem.expectType === "conveyor" &&
    "reverses" in modifiesItem &&
    targetItem.type === "conveyor"
  ) {
    const { reverses } = modifiesItem;
    const configDirection = targetItem.config.direction;
    return (
      setting === (reverses ? "left" : "right") ?
        { direction: oppositeDirection(configDirection) }
      : { direction: configDirection }) satisfies Partial<
      ItemState<"conveyor", RoomId, RoomItemId>
    >;
  }

  if (modifiesItem.expectType === "deadlyBlock" && "disables" in modifiesItem) {
    const { disables } = modifiesItem;
    return (
      setting === (disables ? "left" : "right") ?
        { disabled: true }
      : { disabled: false }) satisfies Partial<
      ItemState<"deadlyBlock", RoomId, RoomItemId>
    >;
  }

  if (modifiesItem.expectType === "charles" && "activates" in modifiesItem) {
    const { activates } = modifiesItem;
    return (
      setting === (activates ? "left" : "right") ?
        {
          activated: true,
        }
      : {
          activated: false,
        }) satisfies Partial<ItemState<"charles", RoomId, RoomItemId>>;
  }

  if (modifiesItem.expectType === "timer" && "activates" in modifiesItem) {
    const { activates } = modifiesItem;
    return (
      setting === (activates ? "left" : "right") ?
        {
          activated: true,
        }
      : {
          activated: false,
        }) satisfies Partial<ItemState<"timer", RoomId, RoomItemId>>;
  }

  return modifiesItem[`${setting}State`] ?? emptyObject;
};
