import { selectCurrentRoomState } from "../game/gameState/gameStateSelectors/selectCurrentRoomState";
import { isFreeItem } from "../model/ItemInPlayNarrowedUnions";
import { type UntilFunction } from "./playGameThrough";

/**
 * for playGameThrough's `until`: whether the given free item, in the current
 * room, has recorded a collision with the other item
 */
export const hasCollided =
  (
    /** the free item that collides */
    colliderId: string,
    /** the item collided with */
    collidedWithId: string,
  ): UntilFunction =>
  (gameState) => {
    const collider = selectCurrentRoomState(gameState)?.items[colliderId];
    if (collider === undefined || !isFreeItem(collider)) {
      throw new Error(
        `"${colliderId}" is not a free item in the current room, so can't collide`,
      );
    }
    return collider.state.collidedWith.by[collidedWithId] === true;
  };

/**
 * for playGameThrough's `until`: whether the given free item, in the current
 * room, is being acted on by the other item this tick (eg a charles controlled
 * by a joystick, a block being pushed)
 */
export const isActedOnBy =
  (
    /** the free item acted on */
    actedOnId: string,
    /** the item acting on it */
    actorId: string,
  ): UntilFunction =>
  (gameState) => {
    const room = selectCurrentRoomState(gameState);
    const actedOn = room?.items[actedOnId];
    if (room === undefined || actedOn === undefined || !isFreeItem(actedOn)) {
      throw new Error(
        `"${actedOnId}" is not a free item in the current room, so can't be acted on`,
      );
    }
    const { actedOnAt } = actedOn.state;
    return (
      actedOnAt.roomTime === room.roomTime && actedOnAt.by[actorId] === true
    );
  };

/**
 * for playGameThrough's `until`: whether the given free item, in the current
 * room, is standing on the other item
 */
export const isStandingOn =
  (
    /** the free item standing */
    standerId: string,
    /** the item stood on */
    standingOnId: string,
  ): UntilFunction =>
  (gameState) => {
    const stander = selectCurrentRoomState(gameState)?.items[standerId];
    if (stander === undefined || !isFreeItem(stander)) {
      throw new Error(
        `"${standerId}" is not a free item in the current room, so can't stand`,
      );
    }
    return stander.state.standingOnItemId === standingOnId;
  };

/** for playGameThrough's `until`: whether the given condition does not hold */
export const not =
  (untilFunction: UntilFunction): UntilFunction =>
  (gameState) =>
    !untilFunction(gameState);
