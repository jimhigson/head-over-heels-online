import { otherCharacterName } from "@/model/modelTypes";
import type { GameState } from "../GameState";
import { loadRoom } from "../loadRoom/loadRoom";

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

  character.state = {
    ...previousState,
    ...entryState,
    expires: null,
    lives: newLives,
    standingOn: null,
  };

  const reloadedRoom = loadRoom(
    gameState.campaign.rooms[room.id],
    gameState.pickupsCollected[room.id],
    {
      // put the character into the room as the extraItems:
      [currentCharacterName]: character,
    },
  );

  gameState.characterRooms[currentCharacterName]!.room = reloadedRoom;
};
