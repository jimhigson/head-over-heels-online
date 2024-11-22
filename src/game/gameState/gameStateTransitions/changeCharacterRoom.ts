import type { ItemInPlay } from "@/model/ItemInPlay";
import { isItemType } from "@/model/ItemInPlay";
import type { GameState } from "../GameState";
import { loadRoom } from "../loadRoom/loadRoom";
import { findStandingOn } from "../../collision/findStandingOn";
import type { PlanetName } from "@/sprites/planets";
import type { DirectionXy, DirectionXyz, Xyz } from "@/utils/vectors";
import {
  addXyz,
  directionsXy,
  oppositeDirection,
  originXyz,
} from "@/utils/vectors";
import { objectValues } from "iter-tools";
import { iterate } from "@/utils/iterate";
import { entryState } from "../EntryState";
import { otherCharacterName } from "@/model/modelTypes";
import { blockSizePx } from "@/sprites/spritePivots";

export type ChangeType = "teleport" | "portal" | "level-select";

export const changeCharacterRoom = <RoomId extends string>({
  gameState,
  toRoom,
  portalRelative = originXyz,
  changeType,
}:
  | {
      gameState: GameState<RoomId>;
      toRoom: NoInfer<RoomId>;
      /* position relative to the portal in the source room */
      portalRelative: Xyz;
      /* if true, the position in the source and destimation room will be exactly maintained */
      changeType: "portal";
    }
  | {
      gameState: GameState<RoomId>;
      toRoom: NoInfer<RoomId>;
      /* position relative to the portal in the source room */
      portalRelative?: undefined;
      /* if true, the position in the source and destimation room will be exactly maintained */
      changeType: "teleport" | "level-select";
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

  if (changeType !== "teleport") {
    const isPortal = isItemType("portal");
    // find the door (etc) in the new room to enter in:
    const destinationPortal =
      iterate(objectValues(destinationRoom.items)).find(
        (i): i is ItemInPlay<"portal", PlanetName, RoomId> =>
          isPortal(i) && i.config.toRoom === leavingRoom.id,
      ) ||
      // if we can't find a portal to this room, just use the first portal we find
      // - this means either the rooms are misconfigured or level select was used to get here
      iterate(objectValues(destinationRoom.items)).find(isPortal);

    console.log(
      "putting",
      currentCharacterName,
      "into",
      toRoom,
      "at portal",
      destinationPortal,
    );

    if (destinationPortal === undefined) {
      throw new Error("trying to enter a room with no portals");
    }

    character.state.position = addXyz(
      destinationPortal.state.position,
      destinationPortal.config.relativePoint,
      portalRelative,
    );

    console.log("character put down at", character.state.position);

    const {
      config: { direction: portalDirection },
    } = destinationPortal;
    if ((directionsXy as Readonly<DirectionXyz[]>).includes(portalDirection)) {
      const portalDirectionXy = portalDirection as DirectionXy;
      // automatically walk forward a short way in the new room to put character properly
      // inside the room (this doesn't happen for entering a room via teleporting or falling/climbing
      //  - only doors)
      // TODO: maybe this should be side-effect free
      character.state.autoWalkDistance = blockSizePx.w * 0.75;

      if (changeType === "level-select") {
        character.state.facing = oppositeDirection(portalDirectionXy);
      }
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
    gameState.pickupsCollected[toRoom],
  );

  // update game state to know which room this character is now in:
  console.log("destinationRoom", destinationRoom.id);
  gameState.characterRooms[currentCharacterName] = {
    room: destinationRoom,
    entryState: entryState(character),
  };

  gameState.events.emit("roomChange", toRoom);
};
