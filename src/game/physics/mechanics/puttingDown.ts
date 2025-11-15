import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { Collideable } from "../../collision/aabbCollision";
import type { GameState } from "../../gameState/GameState";
import type { GridSpatialIndex } from "../gridSpace/GridSpatialIndex";
import type { PlayableItem } from "../itemPredicates";

import { roomSpatialIndexKey, type RoomState } from "../../../model/RoomState";
import { blockSizePx } from "../../../sprites/spritePivots";
import { addXyz } from "../../../utils/vectors/vectors";
import { collisionItemWithIndex } from "../../collision/aabbCollision";
import { addItemToRoom } from "../../gameState/mutators/addItemToRoom";
import { removeStandingOn } from "../../gameState/mutators/standingOn/removeStandingOn";
import { setStandingOnWithoutRemovingOldFirst } from "../../gameState/mutators/standingOn/setStandingOn";
import { handleItemsTouchingItems } from "../handleTouch/handleItemsTouchingItems";
import { isSolid } from "../itemPredicates";
import { isFreeItem } from "../itemPredicates";
import { moveItem } from "../moveItem/moveItem";

/**
 * After pressing handling carry being pressed, how long until the action repeats?
 * This allows actions such as jump+carry to pick an item up, holding that button,
 * and immediately jump+carrying again on landing
 */
export const carryingInputLatchDuration = 350;

/**
 * for Heels/Hoh putting items down from the bag back into the room
 */
export const puttingDown = <RoomId extends string, RoomItemId extends string>(
  carrier: PlayableItem<"headOverHeels" | "heels", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): undefined => {
  const heelsAbilities =
    carrier.type === "heels" ? carrier.state : carrier.state.heels;

  const { carrying } = heelsAbilities;

  if (carrying === null) {
    // not having the bag should always come here too
    return;
  }

  const { inputStateTracker } = gameState;

  const currentCarryPress = inputStateTracker.currentActionPress("carry");
  const hasCarryInput = currentCarryPress !== "released";

  if (!hasCarryInput) {
    return;
  }

  // trying to put down
  if (carrier.state.standingOnItemId === null) {
    // can't put down mid-air
    return;
  }

  // check if there is space above heels (and any items standing on heels):
  if (!checkSpaceAvailableToPutDown(carrier, room[roomSpatialIndexKey])) {
    return;
  }

  const {
    state: { position: carrierPosition },
  } = carrier;

  addItemToRoom({
    room,
    item: carrying,
    atPosition: carrierPosition,
  });

  // ⬇ player isn't standing on whatever they were standing on before
  removeStandingOn(carrier, room);

  // not carrying it any more
  heelsAbilities.carrying = null;

  // moveItem could cause collision with a reincarnation fish, so it must be called only
  // once the room is back into a good state (eg, carrying was set to null) or the
  // item being put down could be duplicated
  moveItem({
    subjectItem: carrier,
    gameState,
    room,
    posDelta: {
      x: 0,
      y: 0,
      z: carrying.aabb.z,
    },
    forceful: true,
    deltaMS,
    onTouch: handleItemsTouchingItems,
    path: new Set([carrier.id]),
  });

  // standing on needs to be set right away for case of jump-putting-down springs
  // -- needs to be registered as standing on the spring so the jumping mechanism gets
  // the extra height
  setStandingOnWithoutRemovingOldFirst({
    above: carrier,
    below: carrying,
  });

  inputStateTracker.inputWasHandled("carry", carryingInputLatchDuration);
};
export const checkSpaceAvailableToPutDown = <
  T extends UnionOfAllItemInPlayTypes,
>(
  item: T,
  roomSpatialIndex: GridSpatialIndex,
) => {
  const proposedNewLocation: Collideable = {
    state: {
      position: addXyz(item.state.position, { z: blockSizePx.h }),
    },
    aabb: item.aabb,
    id: `item.id-proposedPutdownLocation`,
  };

  const collisions = collisionItemWithIndex(
    proposedNewLocation,
    roomSpatialIndex,
    // only check for collisions with solid items
    (otherItem) =>
      isSolid(otherItem, item) &&
      // while in symbiosis, a proposed space one block higher can collide
      // the the character doing the proposing - skip that:
      otherItem !== item,
  );

  for (const collision of collisions) {
    if (!isFreeItem(collision)) {
      console.log(
        "carrying: cannot put down due to collision: item:",
        item,
        "can't move up because it would collide with non-free",
        collision,
      );
      return false;
    }

    // if there is a collision, check if it can be moved up too:
    if (!checkSpaceAvailableToPutDown(collision, roomSpatialIndex)) {
      console.log(
        "carrying: cannot put down due to collision: item:",
        item,
        "can't move up because it would collide with free that has nowhere to go:",
        collision,
      );

      return false;
    }
  }

  return true;
};
