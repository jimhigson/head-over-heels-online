import { isItemType, ItemInPlay, UnknownItemInPlay } from "@/model/ItemInPlay";
import { GameState } from "./GameState";
import { findStandingOn, loadRoom } from "./loadRoom/loadRoom";
import { CharacterName } from "@/model/modelTypes";
import { PlanetName } from "@/sprites/planets";
import { addXyz, originXyz } from "@/utils/vectors";

export const changeCharacterRoom = <RoomId extends string>(
  gameState: GameState<RoomId>,
  roomId: NoInfer<RoomId>,
  portalRelative: Xyz = originXyz,
) => {
  const { currentCharacterName } = gameState;
  const leavingRoom = gameState.characterRooms[currentCharacterName];

  if (roomId === leavingRoom.id) {
    throw new Error(`Can't move to the same room ${roomId}`);
  }

  const otherCharacter = currentCharacterName === "head" ? "heels" : "head";

  const otherCharacterLoadedRoom = gameState.characterRooms[otherCharacter];
  const destinationRoom =
    otherCharacterLoadedRoom.id === roomId ?
      otherCharacterLoadedRoom
    : loadRoom(gameState.campaign.rooms[roomId]);

  const character = leavingRoom.items.find(
    isItemType(currentCharacterName),
  ) as ItemInPlay<CharacterName, PlanetName, RoomId>;

  if (character === undefined) {
    throw new Error(
      `Couldn't find character ${currentCharacterName} in room ${leavingRoom.id} - can't move them to new room ${roomId}`,
    );
  }

  // take the character out of the previous room:
  leavingRoom.items = leavingRoom.items.filter((i) => i !== character);

  // find the door (etc) in the new room to enter in:
  const destinationPortal = destinationRoom.items.find(
    (i): i is ItemInPlay<"portal", PlanetName, RoomId> =>
      isItemType("portal")(i) && i.config.toRoom === leavingRoom.id,
  );

  if (destinationPortal !== undefined) {
    character.position = addXyz(
      destinationPortal.config.relativePoint,
      portalRelative,
    );
  }

  // remove the character from the new room if they're already there - this only really happens
  // if the room is their starting room (so they're in it twice since they appear in the starting room
  // by default):
  destinationRoom.items = destinationRoom.items.filter(
    ({ type }) => type !== character.type,
  );

  // but the character into the (probably newly loaded) room:
  destinationRoom.items.push(character as UnknownItemInPlay<RoomId>);

  // when we put the character in their new room, they won't be standing on anything yet (or will
  // still have their standing on set to an item in the previous room) - for example, they might
  // be already on the floor or a teleporter in the new room. Init this properly so the teleporter
  // is flashing as soon as they enter:
  character.state.standingOn = findStandingOn(character, destinationRoom.items);

  // update game state to know which room this character is now in:
  gameState.characterRooms[currentCharacterName] = destinationRoom;

  gameState.events.emit("roomChange", roomId);
};
