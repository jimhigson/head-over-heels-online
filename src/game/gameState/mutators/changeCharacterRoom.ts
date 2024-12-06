import type { ItemInPlay } from "@/model/ItemInPlay";
import { isItemType } from "@/game/physics/itemPredicates";
import type { GameState } from "../GameState";
import { loadRoom } from "../loadRoom/loadRoom";
import type { PlanetName } from "@/sprites/planets";
import type { DirectionXy4, Direction4Xyz, Xyz } from "@/utils/vectors/vectors";
import {
  addXyz,
  directionsXy4,
  oppositeDirection,
  originXyz,
} from "@/utils/vectors/vectors";
import { objectValues } from "iter-tools";
import { iterate } from "@/utils/iterate";
import { entryState } from "../EntryState";
import { otherCharacterName } from "@/model/modelTypes";
import { blockSizePx } from "@/sprites/spritePivots";
import { collision1toMany } from "@/game/collision/aabbCollision";
import { makeItemFadeOut } from "./makeItemFadeOut";

export type ChangeType = "teleport" | "portal" | "level-select";

type ChangeCharacterRoomOptions<RoomId extends string> =
  | {
      gameState: GameState<RoomId>;
      toRoomId: NoInfer<RoomId>;
      /* position relative to the portal in the source room */
      sourcePortal: ItemInPlay<"portal", PlanetName, RoomId>;
      positionRelativeToSourcePortal: Xyz;
      /* if true, the position in the source and destimation room will be exactly maintained */
      changeType: "portal";
    }
  | {
      gameState: GameState<RoomId>;
      toRoomId: NoInfer<RoomId>;
      sourcePortal?: undefined;
      /* position relative to the portal in the source room */
      positionRelativeToSourcePortal?: undefined;
      /* if true, the position in the source and destimation room will be exactly maintained */
      changeType: "teleport" | "level-select";
    };

export const changeCharacterRoom = <RoomId extends string>({
  gameState,
  toRoomId,
  positionRelativeToSourcePortal = originXyz,
  changeType,
  sourcePortal,
}: ChangeCharacterRoomOptions<RoomId>) => {
  const { currentCharacterName } = gameState;
  const leavingRoom = gameState.characterRooms[currentCharacterName]!.room;

  /*if (toRoomId === leavingRoom.id) {
    throw new Error(
      `Can't move to the same room "${toRoomId}" from "${leavingRoom.id}"`,
    );
  }*/

  const otherName = otherCharacterName(currentCharacterName);

  const otherCharacterLoadedRoom = gameState.characterRooms[otherName]?.room;
  const toRoomJson = gameState.campaign.rooms[toRoomId];
  if (toRoomJson === undefined) {
    throw new Error(`room ${toRoomId} does not exist in campaign`);
  }
  const toRoom =
    otherCharacterLoadedRoom?.id === toRoomId ?
      otherCharacterLoadedRoom
    : loadRoom(toRoomJson, gameState.pickupsCollected[toRoomId]);

  const character = leavingRoom.items[currentCharacterName];

  if (character === undefined) {
    throw new Error(
      `Couldn't find character ${currentCharacterName} in room ${leavingRoom.id} - can't move them to new room ${toRoomId}`,
    );
  }

  // take the character out of the previous room:
  delete leavingRoom.items[currentCharacterName];

  if (changeType !== "teleport") {
    const isPortal = isItemType("portal");
    // find the door (etc) in the new room to enter in:
    const destinationPortal =
      iterate(objectValues(toRoom.items)).find(
        (i): i is ItemInPlay<"portal", PlanetName, RoomId> =>
          isPortal(i) && i.config.toRoom === leavingRoom.id,
      ) ||
      // if we can't find a portal to this room, just use the first portal we find
      // - this is only valid if level select was used. Preferentially choose doors:
      (changeType === "level-select" ?
        iterate(objectValues(toRoom.items)).find(
          (i): i is ItemInPlay<"portal", PlanetName, RoomId> =>
            isPortal(i) &&
            (directionsXy4 as Readonly<Direction4Xyz[]>).includes(
              i.config.direction,
            ),
        ) ||
        // if no doors, any portal (but could be a ceiling):
        iterate(objectValues(toRoom.items)).find(isPortal)
      : undefined);

    console.log(
      "putting",
      currentCharacterName,
      "into",
      toRoomId,
      "at portal",
      destinationPortal,
      "because",
      changeType,
      "sourceportal",
      sourcePortal,
    );

    if (destinationPortal === undefined) {
      throw new Error(`trying to enter room id=${toRoomId} with no portals`);
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

    if (character.type === "heels") {
      // can't carry items through rooms
      character.state.carrying = null;
    }
    if (character.type === "head") {
      // can't carry items through rooms
      for (const hushPuppyBye of iterate(objectValues(toRoom.items)).filter(
        isItemType("hushPuppy"),
      )) {
        makeItemFadeOut(hushPuppyBye, gameState);
      }
    }

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
    if (
      // portal is horizontal - not up or down
      (directionsXy4 as Readonly<Direction4Xyz[]>).includes(portalDirection)
    ) {
      const portalDirectionXy = portalDirection as DirectionXy4;
      // automatically walk forward a short way in the new room to put character properly
      // inside the room (this doesn't happen for entering a room via teleporting or falling/climbing
      //  - only doors)
      // TODO: maybe this should be side-effect free
      character.state.autoWalk = true;
      if (character.state.action === "idle") character.state.action = "moving";

      if (changeType === "level-select") {
        character.state.facing = oppositeDirection(portalDirectionXy);
      }
    }
  }
  // when we put the character in their new room, they won't be standing on anything yet (or will
  // still have their standing on set to an item in the previous room) - for example, they might
  // be already on the floor or a teleporter in the new room. By setting this to null, gravity will
  // apply to them and they will collide with the item below them and get standingOn set:
  character.state.standingOn = null;

  // remove the character from the new room if they're already there - this only really happens
  // if the room is their starting room (so they're in it twice since they appear in the starting room
  // by default):
  delete toRoom.items[currentCharacterName];

  // but the character into the (probably newly loaded) room:
  (toRoom.items[currentCharacterName] as typeof character) = character;

  const collisionsInDestinationRoom = collision1toMany(
    character,
    objectValues(toRoom.items),
  );
  if (collisionsInDestinationRoom.length > 0) {
    console.warn(
      "on entering room",
      toRoomId,
      "character",
      currentCharacterName,
      "collides with",
      collisionsInDestinationRoom,
    );
  }

  // update game state to know which room this character is now in:
  gameState.characterRooms[currentCharacterName] = {
    room: toRoom,
    entryState: entryState(character),
  };

  gameState.events.emit("roomChange", toRoomId);
};
