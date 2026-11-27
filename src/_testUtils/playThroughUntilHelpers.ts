import { selectCurrentRoomState } from "../game/gameState/gameStateSelectors/selectCurrentRoomState";
import type { ItemInPlayType } from "../model/itemInPlay/ItemInPlay";
import { isFreeItem } from "../model/itemInPlay/ItemInPlayNarrowedUnions";
import type { CharacterName } from "../model/modelTypes";
import { keys } from "../utils/entries";
import type { UntilFunction } from "./playGameThrough";

/**
 * for playGameThrough's `until`: whether the given free item, in the current
 * room, has recorded a collision with the other item
 * call like until(hasCollided("heels", "someBlock"))
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
 * room, has recorded a collision with any item of the given type - for items
 * whose ids aren't known, eg generated perimeter walls
 * call like until(hasCollidedWithItemOfType("someBlock", "wall"))
 */
export const hasCollidedWithItemOfType =
  (
    /**
     * the free item that collides
     */
    colliderId: string,
    /**
     * the type of item collided with
     */
    collidedWithType: ItemInPlayType,
  ): UntilFunction =>
  (gameState) => {
    const room = selectCurrentRoomState(gameState);
    const collider = room?.items[colliderId];
    if (room === undefined || collider === undefined || !isFreeItem(collider)) {
      throw new Error(
        `"${colliderId}" is not a free item in the current room, so can't collide`,
      );
    }
    return keys(collider.state.collidedWith.by).some(
      (collidedWithId) => room.items[collidedWithId]?.type === collidedWithType,
    );
  };

/**
 * for playGameThrough's `until`: whether every one of the given conditions has
 * held at some point - each is checked every time, and remembered once it has
 * held, so they need not all hold at once. Make a new one per play-through
 * call like until(allHaveHeld(hasCollided("a", "b"), hasCollided("c", "d")))
 */
export const allHaveHeld = (
  ...untilFunctions: Array<UntilFunction>
): UntilFunction => {
  const yetToHold = new Set(untilFunctions);
  return (gameState) => {
    for (const untilFunction of yetToHold) {
      if (untilFunction(gameState)) {
        yetToHold.delete(untilFunction);
      }
    }
    return yetToHold.size === 0;
  };
};

/**
 * for playGameThrough's `until`: whether the given free item, in the current
 * room, is being acted on by the other item this tick (eg a charles controlled
 * by a joystick, a block being pushed)
 * call like until(isActedOnBy("someBlock", "heels"))
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
 * call like until(isStandingOn("heels", "someBlock"))
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

/**
 * for playGameThrough's `until`: whether the current character is in the given room
 * call like until(currentRoomIs("someRoomId"))
 */
export const currentRoomIs =
  (roomId: string): UntilFunction =>
  (gameState) =>
    selectCurrentRoomState(gameState)?.id === roomId;

/**
 * for playGameThrough's `until`: whether the given condition does not hold
 * call like until(not(currentRoomIs("someRoomId")))
 */
export const not =
  (untilFunction: UntilFunction): UntilFunction =>
  (gameState) =>
    !untilFunction(gameState);

/**
 * for playGameThrough's `until`: whether the given character is in the given
 * room
 * call like until(isInRoom("head", "someRoomId"))
 */
export const isInRoom =
  (
    /** the character */
    characterName: CharacterName,
    /** the room's id */
    roomId: string,
  ): UntilFunction =>
  (gameState) =>
    gameState.characterRooms[characterName]?.id === roomId;
