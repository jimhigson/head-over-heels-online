import { itemBehaviourKey } from "../../../model/ItemInPlay";
import {
  isFreeItem,
  type PlayableItem,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlayNarrowedUnions";
import { type CharacterName } from "../../../model/modelTypes";
import { roomSpatialIndexKey, type RoomState } from "../../../model/RoomState";
import { epsilon } from "../../../utils/epsilon";
import {
  boxAt,
  subXyz,
  type Xyz,
  type XyzBox,
} from "../../../utils/vectors/vectors";
import { collisionBoxWithIndex } from "../../collision/aabbCollision";
import { type GameState } from "../../gameState/GameState";
import { selectHeelsAbilities } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { addItemToRoom } from "../../gameState/mutators/addItemToRoom";
import { removeStandingOn } from "../../gameState/mutators/standingOn/removeStandingOn";
import { type SpatialIndex } from "../gridSpace/SpatialIndex";
import { moveItemInSteps } from "../moveItem/moveItemInSteps";

const log = import.meta.env.VITE_LOG_PUT_DOWN;

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
  carrier: PlayableItem<CharacterName, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): undefined => {
  const { inputStateTracker } = gameState;

  const carryActionPress = inputStateTracker.currentActionPress("carry");
  const heelsAbilities = selectHeelsAbilities(carrier);
  if (heelsAbilities === undefined) {
    // not a carrier:
    if (carryActionPress === "tap") {
      carrier.state.abilityFailedToUseAtGameTime = gameState.gameTime;
    }
    return;
  }

  const { carrying } = heelsAbilities;

  if (carrying === null) {
    // not having the bag should always come here too
    return;
  }

  const hasCarryInput = carryActionPress !== "released";

  if (!hasCarryInput) {
    return;
  }

  const roomSpatialIndex = room[roomSpatialIndexKey];

  const droppedItemPosition = putDownItemLocation(
    carrier,
    carrying,
    roomSpatialIndex,
  );

  // check if there is space above heels (and any items standing on heels):
  if (
    !checkSpaceAvailableToPutDown(
      carrier,
      // carrier goes on top of the dropped item:
      droppedItemPosition.z + carrying.state.box.zd,
      roomSpatialIndex,
    )
  ) {
    if (carryActionPress === "tap") {
      carrier.state.abilityFailedToUseAtGameTime = gameState.gameTime;
    }
    return;
  }

  // ⬇ player isn't standing on whatever they were standing on before
  removeStandingOn(carrier, room);

  // how far the carrier rises to stand on top of the dropped item
  // this can be zero if there was more than the dropped item's height of free
  // air below them when they dropped it
  const carrierRise =
    droppedItemPosition.z + carrying.state.box.zd - carrier.state.box.z;

  // rise before adding the dropped item, so the carrier never starts inside it
  if (carrierRise > epsilon) {
    // item still only in the bag, so reincarnation fish touches can't duplicate it
    // in steps, so anything above is pushed straight up, not sideways:
    moveItemInSteps({
      subjectItem: carrier,
      gameState,
      room,
      posDelta: {
        x: 0,
        y: 0,
        // up onto the top of the dropped item:
        z: carrierRise,
      },
      forceful: true,
      deltaMS,
      handleTouches: true,
      visited: new Set<RoomItemId>().add(carrier.id),
    });

    if (room.items[carrier.id] === undefined) {
      // carrier rose through a portal or was otherwise removed from the room
      // - changing room drops the item so no need to do anything further here:
      inputStateTracker.inputWasHandled("carry", carryingInputLatchDuration);
      return;
    }
  }

  // not carrying it any more
  heelsAbilities.carrying = null;

  // have cleared the space for the dropped item so now add it to the game:
  addItemToRoom({
    room,
    item: carrying,
    atPosition: droppedItemPosition,
  });

  inputStateTracker.inputWasHandled("carry", carryingInputLatchDuration);
};

const putDownItemLocation = <RoomId extends string, RoomItemId extends string>(
  carrier: PlayableItem<CharacterName, RoomId, RoomItemId>,
  carrying: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  roomSpatialIndex: SpatialIndex,
): Xyz => {
  const {
    state: { box: carrierBox },
  } = carrier;

  if (carrier.state.standingOnItemId !== null) {
    // new item will go exactly where the player dropping it was standing:
    return carrierBox;
  }

  // carrier is in mid-air - the item will try to go directly below them (if there is space)
  const droppedItemNewBox: XyzBox = boxAt(
    subXyz(carrier.state.box, {
      z:
        carrying.state.box.zd +
        // an extra 1px gap means that while mid-air the player and the thing
        // being dropped don't start perfectly adjacent, meaning that they
        // can fall more naturally without 'standing' on each other in a weird way
        1,
    }),
    carrying.state.box,
  );

  // check if the dropped item has space to be placed at the intended location:
  const droppedItemNewBoxCollisions = collisionBoxWithIndex(
    droppedItemNewBox,
    roomSpatialIndex,
    // only check for collisions with solid items
    (otherItem) => !otherItem[itemBehaviourKey].isNonSolid(otherItem, carrying),
    carrier,
  );

  for (const {
    state: { box: collisionItemBox },
  } of droppedItemNewBoxCollisions) {
    droppedItemNewBox.z = Math.max(
      // top of the collision item:
      collisionItemBox.z + collisionItemBox.zd,
      droppedItemNewBox.z,
    );
  }

  return droppedItemNewBox;
};

export const checkSpaceAvailableToPutDown = <
  T extends UnionOfAllItemInPlayTypes,
>(
  item: T,
  // the z the new item will be put at:
  toZ: number,
  roomSpatialIndex: SpatialIndex,
) => {
  const collisions = collisionBoxWithIndex(
    boxAt({ ...item.state.box, z: toZ }, item.state.box),
    roomSpatialIndex,
    // only check for collisions with solid items
    (otherItem) => !otherItem[itemBehaviourKey].isNonSolid(otherItem, item),
    // while in symbiosis, a proposed space one block higher can collide
    // the the character doing the proposing - skip that:
    item,
  );

  for (const collisionItem of collisions) {
    if (!isFreeItem(collisionItem)) {
      if (log) {
        console.log(
          "carrying: cannot put down due to collision: item:",
          item,
          "can't move up because it would collide with non-free",
          collisionItem,
        );
      }
      return false;
    }

    // if there is a collision, recursively check if it can be moved up too:
    if (
      !checkSpaceAvailableToPutDown(
        collisionItem,
        // goes on top of this item, once moved up:
        toZ + item.state.box.zd,
        roomSpatialIndex,
      )
    ) {
      if (log) {
        console.log(
          "carrying: cannot put down due to collision: item:",
          item,
          "can't move up because it would collide with free that has nowhere to go:",
          collisionItem,
        );
      }
      return false;
    }
  }

  return true;
};
