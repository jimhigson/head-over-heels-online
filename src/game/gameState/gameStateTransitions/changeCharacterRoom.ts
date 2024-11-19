import type { ItemInPlay } from "@/model/ItemInPlay";
import { isItemType } from "@/model/ItemInPlay";
import type { GameState } from "../GameState";
import { findStandingOn, loadRoom } from "../loadRoom/loadRoom";
import type { PlanetName } from "@/sprites/planets";
import type { DirectionXyz, Xyz } from "@/utils/vectors";
import { addXyz, directionsXy, originXyz } from "@/utils/vectors";
import { objectValues } from "iter-tools";
import { iterate } from "@/utils/iterate";
import { entryState } from "../EntryState";
import { otherCharacterName } from "@/model/modelTypes";
import { blockSizePx } from "@/sprites/spritePivots";

export const changeCharacterRoom = <RoomId extends string>({
  gameState,
  toRoom,
  portalRelative = originXyz,
}: {
  gameState: GameState<RoomId>;
  toRoom: NoInfer<RoomId>;
  portalRelative?: Xyz;
  fromPortal?: ItemInPlay<"portal", PlanetName, RoomId>;
}) => {
  const { currentCharacterName } = gameState;
  const leavingRoom = gameState.characterRooms[currentCharacterName]!.room;

  if (toRoom === leavingRoom.id) {
    throw new Error(
      `Can't move to the same room "${toRoom}" from "${leavingRoom.id}"`,
    );
  }

  const otherName = otherCharacterName(currentCharacterName);

  const otherCharacterLoadedRoom = gameState.characterRooms[otherName]?.room;
  const destinationRoom =
    otherCharacterLoadedRoom?.id === toRoom ?
      otherCharacterLoadedRoom
    : loadRoom(gameState.campaign.rooms[toRoom], gameState.pickupsCollected);

  const character = leavingRoom.items[currentCharacterName];

  if (character === undefined) {
    throw new Error(
      `Couldn't find character ${currentCharacterName} in room ${leavingRoom.id} - can't move them to new room ${toRoom}`,
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
    const {
      config: { direction: portalDirection },
    } = destinationPortal;
    if ((directionsXy as Readonly<DirectionXyz[]>).includes(portalDirection)) {
      // automatically walk forward a short way in the new room to put character properly
      // inside the room (this doesn't happen for entering a room via teleporting or falling/climbing
      //  - only doors)
      // TODO: maybe this should be side-effect free
      character.state.autoWalkDistance = blockSizePx.w * 0.75;
    }
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
  gameState.characterRooms[currentCharacterName] = {
    room: destinationRoom,
    entryState: entryState(character),
  };

  gameState.events.emit("roomChange", toRoom);
};
