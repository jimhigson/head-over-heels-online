import { itemBehaviourKey, type ItemInPlayType } from "../../model/ItemInPlay";
import {
  isFreeItem,
  type UnionOfAllItemInPlayTypes,
} from "../../model/ItemInPlayNarrowedUnions";
import { type RoomState } from "../../model/RoomState";
import {
  itemIsStandingOnSomething,
  stoodOnItem,
} from "../../model/stoodOnItemsLookup";
import { valuesIter } from "../../utils/entries";
import {
  addXyzInPlace,
  originXyz,
  scaleXyzWriteInto,
  type Xyz,
} from "../../utils/vectors/vectors";
import { type GameState } from "../gameState/GameState";
import { makeItemFadeOut } from "../gameState/mutators/makeItemFadeOut";
import { type MechanicResult } from "../physics/MechanicResult";
import { latentMovement } from "../physics/mechanics/latentMovement";
import { moveItem } from "../physics/moveItem/moveItem";
import { recordActedOnBy } from "../physics/recordActedOnBy";
import { applyMechanicsResults } from "./applyMechanicsResults";
import { constrainToMaximumSpeedInPlace } from "./constrainToMaximumSpeedInPlace";

const tickItemStandingOn = <RoomId extends string, RoomItemId extends string>(
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
) => {
  if (!itemIsStandingOnSomething(item)) {
    return;
  }

  // the item this item is standing on
  const standingOn = stoodOnItem(item.state.standingOnItemId, room);

  // eg, walking onto a pickup from another platform, not colliding with it:
  item[itemBehaviourKey].tickStandingOn(
    item,
    standingOn,
    room,
    gameState,
    deltaMS,
  );

  // handle standing on an item with dissppear='onStand' - eg, if got onto this item
  // by walking onto it from another item, there would have been no collision with it
  // to set the standing on property
  const {
    state: { disappearing: standingOnDisappear },
  } = standingOn;

  if (
    standingOnDisappear !== null &&
    (standingOnDisappear.byType === undefined ||
      standingOnDisappear.byType.includes(item.type))
  ) {
    makeItemFadeOut({
      touchedItem: standingOn,
      room,
    });
  }

  // opposite case - disappear if item is standing on player (we already know item is free)
  const {
    state: { disappearing: disappearItem },
  } = item;

  if (
    disappearItem !== null &&
    disappearItem.on === "touch" &&
    (disappearItem.byType === undefined ||
      disappearItem.byType.includes(standingOn.type))
  ) {
    makeItemFadeOut({
      touchedItem: item,
      room,
    });
  }
};

// since only one item can tick at once, a buffer to write their position change into,
// to avoid malloc:
const tickItemPosDeltaAccumulationBuffer: Xyz = { x: 0, y: 0, z: 0 };
// likewise, the mechanics results for the item ticking:
const mechanicsResultsBuffer: Array<
  MechanicResult<ItemInPlayType, string, string>
> = [];
// a buffer to write into while scaling vels down to pos tick pos deltas
const scaleVelBuffer: Xyz = { x: 0, y: 0, z: 0 };

/**
 * ticks all items THAT CAN DO THINGS in the world
 * - this may also cause movements in other items (eg pushing)
 *
 * What each item does is decided by its behaviour (its "Type Object")
 */
export const tickItem = <RoomId extends string, RoomItemId extends string>(
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
) => {
  const behaviour = item[itemBehaviourKey];

  // this is done before mechanicsResults are generated because otherwise the mechanic
  // result would not see the death state that this sets. The mechanics being calculated
  // can check for the deadly state and decline to return a delta for the item while it is
  // playing its death animation.
  if (itemIsStandingOnSomething(item)) {
    behaviour.tickStandingOnBeforeMechanics(
      item,
      stoodOnItem(item.state.standingOnItemId, room),
      room,
      gameState,
      deltaMS,
    );
  }

  // by gathering every mechanic's results before applying any, we run the mechanics
  // at the 'same' time, before the previous ones have changed the game state. This is
  // good for jumping and carrying at the same time, for example. Otherwise, these
  // would one stop the other from working.
  const mechanicsResults = mechanicsResultsBuffer as Array<
    MechanicResult<ItemInPlayType, RoomId, RoomItemId>
  >;
  mechanicsResults.length = 0;
  behaviour.mechanicResults(item, room, gameState, deltaMS, mechanicsResults);

  // this is done after the mechanicsResults are generated, but before they are
  // applied, so that the player can do one more jump on a disappearing block
  // before the touch on that block is handled (and removes it)
  tickItemStandingOn(item, room, gameState, deltaMS);

  // continue even if there are no mechanicsResults, since item still may be moving (ie, a fired doughnut)

  applyMechanicsResults(
    // writeInto:
    tickItemPosDeltaAccumulationBuffer,
    item,
    mechanicsResults,
  );

  // velocities for this item have now been updated - get the aggregate movement, including vels
  // that stood from previous frames (did not change)
  if ("vels" in item.state) {
    for (const vel of valuesIter(item.state.vels)) {
      addXyzInPlace(
        tickItemPosDeltaAccumulationBuffer,
        scaleXyzWriteInto(scaleVelBuffer, { ...originXyz, ...vel }, deltaMS),
      );
    }
  }

  behaviour.afterMechanicsApplied(item, room, deltaMS);

  // position deltas are instant - not subject to maximum speed constraints
  // currently. Otherwise, the minimum 1px walking movement on short input
  // bursts gets cancelled
  const mrIncludesInstantMovement =
    mechanicsResults.find((mr) => mr.movementType === "position") !== undefined;

  if (!mrIncludesInstantMovement) {
    constrainToMaximumSpeedInPlace(
      item,
      tickItemPosDeltaAccumulationBuffer,
      deltaMS,
    );
  }

  moveItem({
    subjectItem: item,
    posDelta: tickItemPosDeltaAccumulationBuffer,
    gameState,
    room,
    deltaMS,
    handleTouches: true,
  });

  if (isFreeItem(item)) {
    // now, apply latent movement. this isn't a normal mechanic because
    // it also has a movedBy property, which is used to record who the actor
    // on the moved item is
    for (const { movedBy, posDelta } of latentMovement(
      item,
      room,
      gameState,
      deltaMS,
    )) {
      recordActedOnBy(
        movedBy,
        item,
        room,
        posDelta.x !== 0 || posDelta.y !== 0,
        posDelta.z !== 0,
      );
      moveItem({
        subjectItem: item,
        posDelta,
        gameState,
        room,
        deltaMS,
        handleTouches: true,
      });
    }
  }
};
