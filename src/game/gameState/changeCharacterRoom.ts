import type { ItemInPlay } from "@/model/ItemInPlay";
import { isItemType } from "@/model/ItemInPlay";
import type { GameState } from "./GameState";
import { findStandingOn, loadRoom } from "./loadRoom/loadRoom";
import type { PlanetName } from "@/sprites/planets";
import type { Xyz } from "@/utils/vectors";
import { addXyz, originXyz } from "@/utils/vectors";
import { objectValues } from "iter-tools";
import { iterate } from "@/utils/iterate";

export const changeCharacterRoom = <RoomId extends string>(
  gameState: GameState<RoomId>,
  roomId: NoInfer<RoomId>,
  portalRelative: Xyz = originXyz,
) => {
  const { currentCharacterName } = gameState;
  const leavingRoom = gameState.characterRooms[currentCharacterName]!;

  if (roomId === leavingRoom.id) {
    throw new Error(
      `Can't move to the same room "${roomId}" from "${leavingRoom.id}"`,
    );
  }

  const otherCharacter = currentCharacterName === "head" ? "heels" : "head";

  const otherCharacterLoadedRoom = gameState.characterRooms[otherCharacter];
  const destinationRoom =
    otherCharacterLoadedRoom?.id === roomId ?
      otherCharacterLoadedRoom
    : loadRoom(gameState.campaign.rooms[roomId], gameState.pickupsCollected);

  const character = leavingRoom.items[currentCharacterName];

  if (character === undefined) {
    throw new Error(
      `Couldn't find character ${currentCharacterName} in room ${leavingRoom.id} - can't move them to new room ${roomId}`,
    );
  }

  // take the character out of the previous room:
  delete leavingRoom.items[currentCharacterName];

  // find the door (etc) in the new room to enter in:
  const destinationPortal = iterate(objectValues(destinationRoom.items)).find(
    (i): i is ItemInPlay<"portal", PlanetName, RoomId> =>
      isItemType("portal")(i) && i.config.toRoom === leavingRoom.id,
  );

  if (destinationPortal !== undefined) {
    character.state.position = addXyz(
      destinationPortal.config.relativePoint,
      portalRelative,
    );
  }

  // remove the character from the new room if they're already there - this only really happens
  // if the room is their starting room (so they're in it twice since they appear in the starting room
  // by default):
  delete destinationRoom.items[currentCharacterName];

  // but the character into the (probably newly loaded) room:
  (destinationRoom.items[currentCharacterName] as typeof character) = character;

  // when we put the character in their new room, they won't be standing on anything yet (or will
  // still have their standing on set to an item in the previous room) - for example, they might
  // be already on the floor or a teleporter in the new room. Init this properly so the teleporter
  // is flashing as soon as they enter:
  character.state.standingOn = findStandingOn(
    character,
    objectValues(destinationRoom.items),
  );

  // update game state to know which room this character is now in:
  console.log("destinationRoom", destinationRoom.id);
  gameState.characterRooms[currentCharacterName] = destinationRoom;

  gameState.events.emit("roomChange", roomId);
};
