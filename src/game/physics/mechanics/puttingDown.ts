import { itemBehaviourKey } from "../../../model/ItemInPlay";
import {
  isFreeItem,
  isSlidingItem,
  type PlayableItem,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlayNarrowedUnions";
import { type CharacterName } from "../../../model/modelTypes";
import { roomSpatialIndexKey, type RoomState } from "../../../model/RoomState";
import { epsilon } from "../../../utils/epsilon";
import {
  addXyz,
  addXyzInPlace,
  boxAt,
  originXyz,
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
import { moveItem } from "../moveItem/moveItem";
import { moveItemInSteps } from "../moveItem/moveItemInSteps";
import { mtv } from "../mtv";

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
    deltaMS,
  );

  if (
    // no place for the item under heels:
    droppedItemPosition === undefined ||
    // no space above heels (and any items standing on heels):
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

  const carrierWasInAir = carrier.state.standingOnItemId === null;

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

  // the item can be bigger than heels, so may overlap free items around them. Push
  // these out of the way, the whole overlap:
  moveItem({
    subjectItem: carrying,
    // note a zero delta, which is why processZeroMovement is set to true so we
    // move skip this "move-free move"
    posDelta: originXyz,
    processZeroMovement: true,
    forceful: true,
    gameState,
    room,
    deltaMS,
    handleTouches: true,
  });

  if (carrierWasInAir && isFreeItem(carrying)) {
    const carrierVelZ = carrier.state.vels.gravity.z;
    carrying.state.vels.gravity = {
      x: 0,
      y: 0,
      // the carrier rising onto the item takes half of its upward vel:
      z:
        carrierRise > epsilon && carrierVelZ > 0 ?
          carrierVelZ / 2
        : carrierVelZ,
    };
    if (isSlidingItem(carrying)) {
      carrying.state.vels.sliding = originXyz;
    }
  } else if (isSlidingItem(carrying)) {
    carrying.state.vels.sliding = addXyz(
      carrier.state.vels.walking,
      carrier.state.vels.movingFloor,
    );
  }

  inputStateTracker.inputWasHandled("carry", carryingInputLatchDuration);
};

/**
 * how many times the dropped item's box may be moved out of a collision before
 * giving up on finding it a place - squeezed between obstacles, it is moved back
 * and forth between them until this runs out
 */
const maxFitIterations = 8;

/**
 * Where a carried item would be put down, or undefined if it can't be.
 *
 * The item first goes under heels: exactly where they stand, or just below them
 * if they are in mid-air. Since the item can be bigger than heels, this box can
 * overlap something solid that heels themselves don't - eg, put down while walking
 * into a wall, the item reaches past heels into the wall.
 *
 * To fix this, the box is moved out of each collision with a non-free item by
 * their mtv, re-querying collisions after each move (a move can push it into
 * something it was clear of before), until it collides with nothing non-free. If
 * that doesn't happen within maxFitIterations, there is no place for it - eg,
 * squeezed into a gap only heels' width between two barriers, it is moved back
 * and forth between them.
 *
 * Free items are not considered here; they are left to be pushed by the
 * physics, like any other overlapping items. There is a failure mode where the
 * engine would allow to put down an item overlapping a free item that has nowhere
 * to go, but this is left as a rare but known issue for now.
 *
 * Wherever the box ends up, heels must still be able to stand on top of it: it
 * may not have moved so far sideways that it doesn't cover heels' footprint,
 * and may not have moved above heels' feet.
 *
 * This is a heuristic, and doesn't resolve collisions the way moving items does.
 * An alternative considered was to try the put-down for real with the physics
 * engine (moveItem), then rewind it if it ended up overlapping something. That
 * would always agree with the physics, but there is no rewind mechanism, and
 * one would have to restore everything that moving items can change (boxes,
 * standing-on, pushed items, collision records...) while suppressing touches
 * during the try. Trying the put-down in a copy of the room has the same touch
 * problem, since touches can change the store. Whether either is worth building
 * is an open question.
 */
const putDownItemLocation = <RoomId extends string, RoomItemId extends string>(
  carrier: PlayableItem<CharacterName, RoomId, RoomItemId>,
  carrying: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  roomSpatialIndex: SpatialIndex,
  deltaMS: number,
): undefined | Xyz => {
  const {
    state: { box: carrierBox },
  } = carrier;

  const droppedItemBox: XyzBox = boxAt(
    carrier.state.standingOnItemId !== null ?
      // new item will go exactly where the player dropping it was standing:
      carrierBox
      // carrier is in mid-air - the item will try to go directly below them:
    : subXyz(carrierBox, {
        z:
          carrying.state.box.zd +
          // an extra 1px gap means that while mid-air the player and the thing
          // being dropped don't start perfectly adjacent, meaning that they
          // can fall more naturally without 'standing' on each other in a weird way
          1 +
          // the dropped item only starts falling next tick, but the carrier
          // still falls this tick - so it starts as far below as the carrier
          // falls, keeping the gap:
          Math.max(-carrier.state.vels.gravity.z, 0) * deltaMS,
      }),
    carrying.state.box,
  );

  for (let i = 0; i < maxFitIterations; i++) {
    // re-queried every time, since the box has moved since the last query:
    const [collidedWithItem] = collisionBoxWithIndex(
      droppedItemBox,
      roomSpatialIndex,
      (otherItem) =>
        !isFreeItem(otherItem) &&
        !otherItem[itemBehaviourKey].isNonSolid(otherItem, carrying),
      carrier,
    );

    if (collidedWithItem === undefined) {
      if (!carrierCanStandOn(carrierBox, droppedItemBox)) {
        if (log) {
          console.log(
            "carrying: cannot put down: moved out of collisions to",
            droppedItemBox,
            "where it is not under the carrier",
            carrierBox,
          );
        }
        return undefined;
      }
      return droppedItemBox;
    }

    addXyzInPlace(
      droppedItemBox,
      mtv(droppedItemBox, collidedWithItem.state.box),
    );
  }

  if (log) {
    console.log(
      "carrying: cannot put down: no place found for",
      carrying,
      "within",
      maxFitIterations,
      "moves",
    );
  }
  return undefined;
};

/**
 * along one axis, does either footprint span the whole of the other?
 */
const spansEitherOnAxis = (
  aMin: number,
  aSize: number,
  bMin: number,
  bSize: number,
): boolean =>
  (aMin <= bMin + epsilon && aMin + aSize >= bMin + bSize - epsilon) ||
  (bMin <= aMin + epsilon && bMin + bSize >= aMin + aSize - epsilon);

/**
 * can the carrier stand on top of the dropped item's box? Its footprint must span the
 * carrier's (or, for items smaller than the carrier, the other way around), and it
 * can't be higher than the carrier's feet
 */
const carrierCanStandOn = (
  carrierBox: XyzBox,
  droppedItemBox: XyzBox,
): boolean =>
  spansEitherOnAxis(
    carrierBox.x,
    carrierBox.xd,
    droppedItemBox.x,
    droppedItemBox.xd,
  ) &&
  spansEitherOnAxis(
    carrierBox.y,
    carrierBox.yd,
    droppedItemBox.y,
    droppedItemBox.yd,
  ) &&
  droppedItemBox.z <= carrierBox.z + epsilon;

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
