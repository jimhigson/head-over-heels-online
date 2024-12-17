import { otherIndividualCharacterName } from "@/model/modelTypes";
import type { GameState } from "../GameState";
import { loadRoom } from "../loadRoom/loadRoom";

export const characterLosesLife = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  const { currentCharacterName } = gameState;
  const { room, entryState } = gameState.characterRooms[currentCharacterName]!;
  const character = room.items[currentCharacterName]!;

  const previousState = character.state;

  if (character.type === "headOverHeels") {
    character.state.head.lives -= 1;
    character.state.heels.lives -= 1;

    if (character.state.head.lives === 0 && character.state.heels.lives === 0) {
      // TODO: switch to char with some lives left:
      /*gameState.characterRooms[currentCharacterName] = undefined;
      gameState.currentCharacterName =
        otherIndividualCharacterName(currentCharacterName);
      return;*/
    }
  } else {
    character.state.lives -= 1;

    if (character.state.lives === 0) {
      gameState.characterRooms[currentCharacterName] = undefined;
      gameState.currentCharacterName =
        otherIndividualCharacterName(currentCharacterName);
      return;
    }
  }

  character.state = {
    ...previousState,
    ...entryState,
    expires: null,
    standingOn: null,
  };

  if (character.type === "heels") {
    character.state.carrying = null;
  }

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
