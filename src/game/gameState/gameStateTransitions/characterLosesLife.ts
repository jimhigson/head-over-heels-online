import { otherCharacterName } from "@/model/modelTypes";
import type { GameState } from "../GameState";
import { initStandingOnForItem, loadRoom } from "../loadRoom/loadRoom";
import type { PlayableItem } from "@/model/ItemInPlay";

export const characterLosesLife = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  const { currentCharacterName } = gameState;
  const { room, entryState } = gameState.characterRooms[currentCharacterName]!;
  const character = room.items[currentCharacterName]!;
  const otherName = otherCharacterName(currentCharacterName);

  const previousState = character.state;

  const newLives = character.state.lives - 1;

  if (newLives === 0) {
    character.state.lives = newLives;
    gameState.characterRooms[currentCharacterName] = undefined;
    gameState.currentCharacterName = otherName;
    return;
  }

  const reloadedRoom = loadRoom(
    gameState.campaign.rooms[room.id],
    gameState.pickupsCollected,
  );

  gameState.characterRooms[currentCharacterName]!.room = reloadedRoom;

  character.state = {
    ...previousState,
    ...entryState,
    expires: null,
    lives: newLives,
  };

  initStandingOnForItem(character, reloadedRoom.items);

  (reloadedRoom.items[currentCharacterName] as PlayableItem) = character;
};
