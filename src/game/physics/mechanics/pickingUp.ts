import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { type HeelsAbilities } from "../../../model/ItemStateMap";
import { type CharacterName } from "../../../model/modelTypes";
import { roomItemsIterable, type RoomState } from "../../../model/RoomState";
import { getEffectivelyStandingOnItemIdForPlayable } from "../../../model/stoodOnItemsLookup";
import { findStandingOnWithHighestPriorityAndMostOverlap } from "../../collision/checkStandingOn";
import { type GameState } from "../../gameState/GameState";
import { playableHasShield } from "../../gameState/gameStateSelectors/selectPickupAbilities";
import { deleteItemFromRoom } from "../../gameState/mutators/deleteItemFromRoom";
import {
  isCarrier,
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
  carrier: PlayableItem<CharacterName, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
): undefined => {
  if (!isCarrier(carrier)) {
    // don't set abilityFailedToUseAtGameTime, putting down will set this
    return;
  }

  const { inputStateTracker } = gameState;

  const heelsAbilities =
    carrier.type === "heels" ? carrier.state : carrier.state.heels;

  const { carrying, hasBag } = heelsAbilities;

  const carryActionPress = inputStateTracker.currentActionPress("carry");
  const hasCarryInput = carryActionPress !== "released";

  if (!hasBag) {
    if (carryActionPress === "tap") {
      carrier.state.abilityFailedToUseAtGameTime = gameState.gameTime;
    }
    return;
  }

  // work out the item to pick up before handling input, since we need to set the
  // wouldPickUpNext flag (for highlighting the item) even if the user isn't currently
  // trying to pick up anything:
  const itemToPickup =
    carrying === null ? findItemToPickup(carrier, room) : undefined;

  // update marking items as the next to pick up
  // SMELL: this is creating a new iterator every frame just to clear the old
  // wouldPickUpNext flags
  const portableRoomItemsIter = roomItemsIterable(room.items).filter(
    isPortable,
  );
  for (const portableItem of portableRoomItemsIter) {
    portableItem.state.wouldPickUpNext = false;
  }
  if (itemToPickup !== undefined) {
    itemToPickup.state.wouldPickUpNext = true;
  }

  if (!hasCarryInput) {
    return;
  }

  // trying to pick up
  if (itemToPickup === undefined) {
    // nothing to pick up (or already carrying)
    if (carrying === null && carryActionPress === "tap") {
      // not carrying so an actual failure to pick up, not a failure to put down
      carrier.state.abilityFailedToUseAtGameTime = gameState.gameTime;
    }
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

  const portableItemsIter = roomItemsIterable(room.items).filter(
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
