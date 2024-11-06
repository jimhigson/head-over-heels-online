import { isItemType, ItemInPlay, UnknownItemInPlay } from "@/model/ItemInPlay";
import { GameState } from "./GameState";
import { loadRoom } from "./loadRoom/loadRoom";
import { CharacterName } from "@/model/modelTypes";
import { blockSizePx } from "@/sprites/pixiSpriteSheet";
import { PlanetName } from "@/sprites/planets";

export const changeCharacterRoom = <RoomId extends string>(
  gameState: GameState<RoomId>,
  roomId: NoInfer<RoomId>,
) => {
  const { currentCharacterName } = gameState;
  const previousRoom = gameState.characterRooms[currentCharacterName];

  if (roomId === previousRoom.id) {
    throw new Error(`Can't move to the same room ${roomId}`);
  }

  const otherCharacter = currentCharacterName === "head" ? "heels" : "head";

  const otherCharacterLoadedRoom = gameState.characterRooms[otherCharacter];
  const loadedRoom =
    otherCharacterLoadedRoom.id === roomId ?
      otherCharacterLoadedRoom
    : loadRoom(gameState.campaign.rooms[roomId]);

  const character = previousRoom.items.find(
    isItemType(currentCharacterName),
  ) as ItemInPlay<CharacterName, PlanetName, RoomId>;

  if (character === undefined) {
    throw new Error(
      `Couldn't find character ${currentCharacterName} in room ${previousRoom.id} - can't move them to new room ${roomId}`,
    );
  }

  // take the character out of the previous room:
  previousRoom.items = previousRoom.items.filter((i) => i !== character);

  // find the door (etc) in the new room to enter in:
  const entryPoint = loadedRoom.items.find(
    (i) => isItemType("portal")(i) && i.config.toRoom === previousRoom.id,
  );

  if (entryPoint !== undefined) {
    character.position = entryPoint.position;
  }

  // remove the character from the new room if they're already there - this only really happens
  // if the room is their starting room (so they're in it twice since they appear in the starting room
  // by default):
  loadedRoom.items = loadedRoom.items.filter(
    ({ type }) => type !== character.type,
  );

  character.state.autoWalkDistance = blockSizePx.w * 1;

  // but the character into the newly loaded room:
  loadedRoom.items.push(character as UnknownItemInPlay<RoomId>);

  // update game state to know which room this character is now in:
  gameState.characterRooms[currentCharacterName] = loadedRoom;

  gameState.events.emit("roomChange", roomId);
};
