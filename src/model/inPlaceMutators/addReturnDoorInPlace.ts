import { keys } from "../../utils/entries";
import { oppositeDirection, type Xyz } from "../../utils/vectors/vectors";
import {
  candidatePartnerDoors,
  doorLinkNeedsToDoor,
} from "../json/candidatePartnerDoors";
import { type JsonItem } from "../json/JsonItem";
import { typePrefix } from "../json/typePrefix";
import { doorWidth } from "../json/verification/helpers/roomPerimeter";
import { findSubRoomForItem } from "../map/itemIsInSubRoom";
import { type Campaign } from "../modelTypes";
import { type RoomJson } from "../RoomJson";
import { roomWallBounds } from "../roomWallBounds";
import { generateHoleInWallsForDoor } from "./generateHoleInWallsForDoor";
import { nextItemId } from "./nextItemId";

export type AddReturnDoorInPlaceOptions<
  RoomId extends string,
  RoomItemId extends string,
> = {
  /** every room of the campaign, holding both rooms */
  rooms: Campaign<RoomId>["rooms"];
  fromRoomJson: RoomJson<RoomId, RoomItemId>;
  toRoomJson: RoomJson<RoomId, RoomItemId>;
  outgoingDoorEntry: [RoomItemId, JsonItem<"door", RoomId, RoomItemId>];
};

/**
 * add a door to `toRoomJson` leading back through `outgoingDoorEntry`: on the
 * opposite wall, at the same offset along it, cutting the wall around it
 */
export const addReturnDoorInPlace = <
  RoomId extends string,
  RoomItemId extends string,
>({
  rooms,
  fromRoomJson,
  toRoomJson,
  outgoingDoorEntry: [outgoingDoorId, outgoingDoor],
}: AddReturnDoorInPlaceOptions<RoomId, RoomItemId>) => {
  const outgoingDirection = outgoingDoor.config.direction;
  const outgoingPosition = outgoingDoor.position;
  const fromDoorSubroom = findSubRoomForItem(
    outgoingDoor.position,
    "block",
    fromRoomJson,
  );

  const returnDoorId = nextItemId(keys(toRoomJson.items), typePrefix.door);

  const fromWalls = roomWallBounds(fromRoomJson, fromDoorSubroom);
  const toWalls = roomWallBounds(
    toRoomJson,
    outgoingDoor.config.meta?.toSubRoom ?? "*",
  );

  // same offset along the wall as the outgoing door has along its own wall,
  // moved in to stay on the wall if this room is narrower:
  const returnDoorPosition: Xyz = {
    x:
      outgoingDirection === "left" ? toWalls.from.x
      : outgoingDirection === "right" ? toWalls.to.x
      : Math.min(
          Math.max(
            outgoingPosition.x - fromWalls.from.x + toWalls.from.x,
            toWalls.from.x,
          ),
          toWalls.to.x - doorWidth,
        ),
    y:
      outgoingDirection === "away" ? toWalls.from.y
      : outgoingDirection === "towards" ? toWalls.to.y
      : Math.min(
          Math.max(
            outgoingPosition.y - fromWalls.from.y + toWalls.from.y,
            toWalls.from.y,
          ),
          toWalls.to.y - doorWidth,
        ),
    z: outgoingPosition.z,
  };

  const returnDoorDirection = oppositeDirection(outgoingDirection);

  const returnDoorItemJson: JsonItem<"door", RoomId, RoomItemId> = {
    type: "door",
    config: {
      toRoom: fromRoomJson.id,
      direction: returnDoorDirection,
      meta:
        fromDoorSubroom === "*" ? undefined : (
          {
            toSubRoom: fromDoorSubroom,
          }
        ),
    },
    position: returnDoorPosition,
  };

  // a pair already linking these walls, unambiguous until the new pair is added:
  const existingReturnDoors = candidatePartnerDoors(
    rooms,
    fromRoomJson.id,
    toRoomJson.id,
    outgoingDirection,
  );
  const existingOutgoingDoors = candidatePartnerDoors(
    rooms,
    toRoomJson.id,
    fromRoomJson.id,
    returnDoorDirection,
  ).filter(({ doorId }) => doorId !== outgoingDoorId);

  toRoomJson.items[returnDoorId] = returnDoorItemJson;

  // only name a partner with `toDoor` where the link would otherwise be
  // ambiguous (more than one door comes back)
  if (
    doorLinkNeedsToDoor(
      rooms,
      toRoomJson.id,
      fromRoomJson.id,
      returnDoorDirection,
    )
  ) {
    returnDoorItemJson.config.toDoor = outgoingDoorId;
    // the existing pair is now ambiguous too:
    if (
      existingReturnDoors.length === 1 &&
      existingOutgoingDoors.length === 1
    ) {
      const [existingReturnDoor] = existingReturnDoors;
      const [existingOutgoingDoor] = existingOutgoingDoors;
      existingReturnDoor.door.config.toDoor ??= existingOutgoingDoor.doorId;
      existingOutgoingDoor.door.config.toDoor ??= existingReturnDoor.doorId;
    }
  } else {
    delete returnDoorItemJson.config.toDoor;
  }
  if (
    doorLinkNeedsToDoor(
      rooms,
      fromRoomJson.id,
      toRoomJson.id,
      outgoingDirection,
    )
  ) {
    outgoingDoor.config.toDoor = returnDoorId;
  } else {
    delete outgoingDoor.config.toDoor;
  }

  for (const [itemId, modifiedWall] of generateHoleInWallsForDoor(
    toRoomJson.items,
    returnDoorDirection,
    returnDoorPosition,
  )) {
    if (modifiedWall === null) {
      delete toRoomJson.items[itemId];
    } else {
      toRoomJson.items[itemId] = modifiedWall;
    }
  }
};
