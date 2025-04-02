/**
 * @returns currently shown room state, or undefined only if both chars have
 * lost all lives (no current room)
 */

import type { RoomState } from "../../../model/RoomState";
import type { GameState } from "../GameState";

export const selectCurrentRoomState = <RoomId extends string>(
  gameState: GameState<RoomId>,
): RoomState<RoomId, string> | undefined =>
  gameState.characterRooms[gameState.currentCharacterName];

export const selectCurrentRoomId = <RoomId extends string>(
  gameState: GameState<RoomId>,
): RoomId | undefined =>
  gameState.characterRooms[gameState.currentCharacterName]?.roomJson.id;
