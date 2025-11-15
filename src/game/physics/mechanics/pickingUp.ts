import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { HeelsAbilities } from "../../../model/ItemStateMap";
import type { GameState } from "../../gameState/GameState";

import { iterateRoomItems, type RoomState } from "../../../model/RoomState";
import { getEffectivelyStandingOnItemIdForPlayable } from "../../../model/stoodOnItemsLookup";
import { findStandingOnWithHighestPriorityAndMostOverlap } from "../../collision/checkStandingOn";
import { playableHasShield } from "../../gameState/gameStateSelectors/selectPickupAbilities";
import { deleteItemFromRoom } from "../../gameState/mutators/deleteItemFromRoom";
import {
  isDeadly,
  isPortable,
  type PlayableItem,
  type PortableItem,
} from "../itemPredicates";
import { carryingInputLatchDuration } from "./puttingDown";

/**
 * walking, but also gliding and changing direction mid-air
 */
export const pickingUp = <RoomId extends string, RoomItemId extends string>(
  carrier: PlayableItem<"headOverHeels" | "heels", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
): undefined => {
  const { inputStateTracker } = gameState;

  const heelsAbilities =
    carrier.type === "heels" ? carrier.state : carrier.state.heels;

  const { carrying, hasBag } = heelsAbilities;

  if (!hasBag) {
    return;
  }

  const portableRoomItemsIter = iterateRoomItems(room.items).filter(isPortable);
  const itemToPickup =
    carrying === null ? findItemToPickup(carrier, room) : undefined;

  // update marking items as the next to pick up, for the sake of the green outline:
  for (const portableItem of portableRoomItemsIter) {
    portableItem.state.wouldPickUpNext = false;
  }
  if (itemToPickup !== undefined) itemToPickup.state.wouldPickUpNext = true;

  const currentCarryPress = inputStateTracker.currentActionPress("carry");
  const hasCarryInput = currentCarryPress !== "released";

  if (!hasCarryInput) {
    return;
  }

  // trying to pick up
  if (itemToPickup === undefined) {
    // nothing to pick up
    return;
  }

  pickUpItem(room, heelsAbilities, itemToPickup);

  // won't carry again until key is released and re-pressed - prevents
  // multiple pickup/putdown in one tick with multiple sub-ticks
  inputStateTracker.inputWasHandled("carry", carryingInputLatchDuration);
};
const pickUpItem = <RoomId extends string, RoomItemId extends string>(
  room: RoomState<RoomId, RoomItemId>,
  heelsAbilities: HeelsAbilities<RoomId>,
  itemToCarry: PortableItem<RoomId, RoomItemId>,
) => {
  heelsAbilities.carrying = itemToCarry;

  itemToCarry.state.wouldPickUpNext = false;
  deleteItemFromRoom({ room, item: itemToCarry });
};

export const findItemToPickup = <
  RoomId extends string,
  RoomItemId extends string,
>(
  carrier: PlayableItem<"headOverHeels" | "heels", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
) => {
  const hasShield = playableHasShield(carrier);

  const itemIsPortableForCarrier = (
    i: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): i is PortableItem<RoomId, RoomItemId> =>
    isPortable(i) &&
    // can only pick up deadly items if you have a shield:
    (hasShield || !isDeadly(i));

  const portableItemsIter = iterateRoomItems(room.items).filter(
    itemIsPortableForCarrier,
  );

  const straightStoodOn = findStandingOnWithHighestPriorityAndMostOverlap(
    carrier,
    portableItemsIter,
  );

  if (straightStoodOn) {
    return straightStoodOn;
  }

  // nothing straight-up stood on, let's check if we're standing on by coyote time:
  const coyoteStoodOnItemId = getEffectivelyStandingOnItemIdForPlayable(
    room,
    carrier.state,
  );
  const coyoteStoodOn = coyoteStoodOnItemId && room.items[coyoteStoodOnItemId];

  if (coyoteStoodOn && itemIsPortableForCarrier(coyoteStoodOn)) {
    return coyoteStoodOn;
  }

  return undefined;
};
