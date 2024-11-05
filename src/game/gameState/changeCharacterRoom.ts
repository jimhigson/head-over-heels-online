import { isItemType } from "@/model/ItemInPlay";
import { GameState } from "./GameState";
import { loadRoom } from "./loadRoom/loadRoom";

export const changeCharacterRoom = <RoomId extends string>(
  gameState: GameState<RoomId>,
  roomId: NoInfer<RoomId>,
) => {
  const { currentCharacterName } = gameState;
  const previousRoom = gameState.characterRooms[currentCharacterName];

  if (roomId === previousRoom.id) {
    throw new Error(`Can't move to the same room ${roomId}`);
  }

  const loadedRoom = loadRoom(gameState.campaign.rooms[roomId]);

  const character = previousRoom.items.find(
    (i) => i.type === currentCharacterName,
  );

  if (character === undefined) {
    throw new Error(
      `Couldn't find character ${currentCharacterName} in room ${previousRoom.id} - can't move them to new room ${roomId}`,
    );
  }

  // take the character out of the previous room:
  previousRoom.items = previousRoom.items.filter((i) => i !== character);

  // find the door (etc) in the new room to enter in:
  const entryPoint = loadedRoom.items.find(
    (i) => isItemType("portal", i) && i.config.toRoom === previousRoom.id,
  );

  if (entryPoint !== undefined) {
    character.position = entryPoint.position;
  }

  // but the character into the newly loaded room:
  loadedRoom.items.push(character);

  gameState.characterRooms[gameState.currentCharacterName] = loadedRoom;

  gameState.events.emit("roomChange", roomId);
};
