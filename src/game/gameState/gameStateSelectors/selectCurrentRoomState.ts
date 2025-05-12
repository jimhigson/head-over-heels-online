/**
 * @returns currently shown room state, or undefined only if both chars have
 * lost all lives (no current room)
 */

import type { RoomState } from "../../../model/RoomState";
import type { GameState } from "../GameState";

export const selectCurrentRoomState = <
  RoomId extends string,
  RoomItemId extends string,
>(
  gameState: Pick<GameState<RoomId>, "characterRooms" | "currentCharacterName">,
) =>
  gameState.characterRooms[gameState.currentCharacterName] as
    | RoomState<RoomId, RoomItemId>
    | undefined;

export const selectCurrentRoomId = <RoomId extends string>(
  gameState: Pick<GameState<RoomId>, "characterRooms" | "currentCharacterName">,
): RoomId | undefined =>
  gameState.characterRooms[gameState.currentCharacterName]?.roomJson.id;
