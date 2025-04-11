import { otherIndividualCharacterName } from "../../model/modelTypes";
import type { RoomState } from "../../model/RoomState";
import type { GameState } from "../gameState/GameState";
import {
  selectCurrentPlayableItem,
  selectPlayableItem,
} from "../gameState/gameStateSelectors/selectPlayableItem";

export const advanceTime = <RoomId extends string, RoomItemId extends string>(
  gameState: GameState<RoomId>,
  room: RoomState<RoomId, RoomItemId>,
  deltaMS: number,
) => {
  gameState.progression++;
  gameState.gameTime += deltaMS;
  room.roomTime += deltaMS;
  const playable = selectCurrentPlayableItem(gameState);

  if (playable === undefined) {
    return;
  }

  if (playable.type === "headOverHeels") {
    playable.state.head.gameTime += deltaMS;
    playable.state.heels.gameTime += deltaMS;
  } else {
    playable.state.gameTime += deltaMS;

    const charactersInSameRoom =
      gameState.characterRooms.head === gameState.characterRooms.heels;

    if (charactersInSameRoom) {
      // advance the other character's time too since they're both in play:
      const other = selectPlayableItem(
        gameState,
        otherIndividualCharacterName(playable.type),
      );
      if (other !== undefined) {
        other.state.gameTime += deltaMS;
      }
    }
  }
};
