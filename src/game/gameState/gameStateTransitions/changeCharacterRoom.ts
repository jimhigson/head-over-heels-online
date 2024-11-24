import type { ItemInPlay } from "@/model/ItemInPlay";
import { isItemType } from "@/model/ItemInPlay";
import type { GameState } from "../GameState";
import { loadRoom } from "../loadRoom/loadRoom";
import { findStandingOn } from "../../collision/findStandingOn";
import type { PlanetName } from "@/sprites/planets";
import type { DirectionXy, DirectionXyz, Xyz } from "@/utils/vectors/vectors";
import {
  addXyz,
  directionsXy,
  oppositeDirection,
  originXyz,
} from "@/utils/vectors/vectors";
import { objectValues } from "iter-tools";
import { iterate } from "@/utils/iterate";
import { entryState } from "../EntryState";
import { otherCharacterName } from "@/model/modelTypes";
import { blockSizePx } from "@/sprites/spritePivots";
import { collision1toMany } from "@/game/collision/aabbCollision";

export type ChangeType = "teleport" | "portal" | "level-select";

export const changeCharacterRoom = <RoomId extends string>({
  gameState,
  toRoom,
  positionRelativeToSourcePortal = originXyz,
  changeType,
  sourcePortal,
}:
  | {
      gameState: GameState<RoomId>;
      toRoom: NoInfer<RoomId>;
      /* position relative to the portal in the source room */
      sourcePortal: ItemInPlay<"portal", PlanetName, RoomId>;
      positionRelativeToSourcePortal: Xyz;
      /* if true, the position in the source and destimation room will be exactly maintained */
      changeType: "portal";
    }
  | {
      gameState: GameState<RoomId>;
      toRoom: NoInfer<RoomId>;
      sourcePortal?: undefined;
      /* position relative to the portal in the source room */
      positionRelativeToSourcePortal?: undefined;
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
      // - this is only valid if level select was used. Preferentially choose doors:
      (changeType === "level-select" ?
        iterate(objectValues(destinationRoom.items)).find(
          (i): i is ItemInPlay<"portal", PlanetName, RoomId> =>
            isPortal(i) &&
            (directionsXy as Readonly<DirectionXyz[]>).includes(
              i.config.direction,
            ),
        ) ||
        // if no doors, any portal (but could be a ceiling):
        iterate(objectValues(destinationRoom.items)).find(isPortal)
      : undefined);

    console.log(
      "putting",
      currentCharacterName,
      "into",
      toRoom,
      "at portal",
      destinationPortal,
    );

    if (destinationPortal === undefined) {
      throw new Error(`trying to enter room id=${toRoom} with no portals`);
    }

    character.state.position = addXyz(
      destinationPortal.state.position,
      destinationPortal.config.relativePoint,
      positionRelativeToSourcePortal,
      // an extra boost of one block when travelling up - this is because the room above won't have a floor
      // so the player needs to stand on a block, which is one block high, and they need to get up on top of it
      changeType === "portal" && sourcePortal.config.direction === "up" ?
        { z: blockSizePx.h }
      : {},
    );

    console.log(
      "character put down at",
      character.state.position,
      "which is relative to",
      "destination portal position",
      destinationPortal.state.position,
      destinationPortal.config.relativePoint,
      positionRelativeToSourcePortal,
    );

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
      if (character.state.action === "idle") character.state.action = "moving";

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

  const collisionsInDestinationRoom = collision1toMany(
    character,
    objectValues(destinationRoom.items),
  );
  if (collisionsInDestinationRoom.length > 0) {
    console.warn(
      "on entering room",
      toRoom,
      "character",
      currentCharacterName,
      "collides with",
      collisionsInDestinationRoom,
    );
  }

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
  gameState.characterRooms[currentCharacterName] = {
    room: destinationRoom,
    entryState: entryState(character),
  };

  gameState.events.emit("roomChange", toRoom);
};
