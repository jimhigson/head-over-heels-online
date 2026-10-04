import { itemBehaviourKey } from "../../../model/ItemInPlay";
import {
  type PlayableItem,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlayNarrowedUnions";
import { type HeelsAbilities } from "../../../model/ItemStateMap";
import { type CharacterName } from "../../../model/modelTypes";
import { roomItemsIterable, type RoomState } from "../../../model/RoomState";
import { getEffectivelyStandingOnItemIdForPlayable } from "../../../model/stoodOnItemsLookup";
import { findStandingOnWithHighestPriorityAndMostOverlap } from "../../collision/checkStandingOn";
import { type GameState } from "../../gameState/GameState";
import { playableHasShield } from "../../gameState/gameStateSelectors/selectPickupAbilities";
import { selectHeelsAbilities } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { deleteItemFromRoom } from "../../gameState/mutators/deleteItemFromRoom";
import { carryingInputLatchDuration } from "./puttingDown";

/**
 * walking, but also gliding and changing direction mid-air
 */
export const pickingUp = <RoomId extends string, RoomItemId extends string>(
  carrier: PlayableItem<CharacterName, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
): undefined => {
  const heelsAbilities = selectHeelsAbilities(carrier);
  if (heelsAbilities === undefined || carrier.type === "head") {
    // not a carrier. Don't set abilityFailedToUseAtGameTime, putting down will set this
    return;
  }

  const { inputStateTracker } = gameState;

  const { carrying, hasBag } = heelsAbilities;

  const carryActionPress = inputStateTracker.currentActionPress("carry");
  const hasCarryInput = carryActionPress !== "released";

  if (!hasBag) {
    if (carryActionPress === "tap") {
      carrier.state.abilityFailedToUseAtGameTime = gameState.gameTime;
    }
    return;
  }

  // work out the item to pick up before handling input, since we need to
  // record it (for highlighting the item) even if the user isn't currently
  // trying to pick up anything:
  const itemToPickup =
    carrying === null ? findItemToPickup(carrier, room) : undefined;
  heelsAbilities.wouldPickUpNextItemId = itemToPickup?.id ?? null;

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
  heelsAbilities: HeelsAbilities<RoomId, RoomItemId>,
  itemToCarry: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
) => {
  heelsAbilities.carrying = itemToCarry;
  heelsAbilities.wouldPickUpNextItemId = null;

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
  ): boolean =>
    i[itemBehaviourKey].isPortable(i) &&
    // can only pick up deadly items if you have a shield:
    (hasShield || !i[itemBehaviourKey].isDeadly(i));

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
