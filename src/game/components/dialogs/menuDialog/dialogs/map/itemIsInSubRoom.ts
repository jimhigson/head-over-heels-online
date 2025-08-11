import type { JsonItemUnion } from "../../../../../../model/json/JsonItem";
import type { RoomJson } from "../../../../../../model/RoomJson";
import { blockSizePx } from "../../../../../../sprites/spritePivots";
import { keysIter } from "../../../../../../utils/entries";
import type { Xy, Xyz } from "../../../../../../utils/vectors/vectors";

export type InPlayItemLocatableInSubRoom = {
  id: string;
  state: {
    position: Xyz;
  };
};

export type MaybeDividedRoom = {
  id: string;
  meta?: {
    subRooms?: Record<
      string,
      {
        physicalPosition: {
          from: Xy;
          to: Xy;
        };
      }
    >;
  };
};

export const blockXyIsInSubRoom = <RoomId extends string>(
  blockXy: Xy,
  subRoomId: string,
  room: RoomJson<RoomId, string>,
) => {
  if (subRoomId === "*") {
    return true;
  }
  const subRoom = room.meta!.subRooms![subRoomId];

  return (
    blockXy.x >= subRoom.physicalPosition.from.x &&
    blockXy.y >= subRoom.physicalPosition.from.y &&
    // having equals on both sides is bad since it means
    // if something is on the boundary it could be claimed
    // by multiple subrooms, but doors are on the boundaries!
    blockXy.x <= subRoom.physicalPosition.to.x &&
    blockXy.y <= subRoom.physicalPosition.to.y
  );
};

export const jsonItemIsInSubRoom = <RoomId extends string>(
  { position }: JsonItemUnion,
  subRoomId: string,
  room: RoomJson<RoomId, string>,
) => {
  return blockXyIsInSubRoom(position, subRoomId, room);
};

const inPlayItemDistanceToSubRoom = (
  position: Xy,
  subRoomId: string,
  room: MaybeDividedRoom,
): number => {
  if (subRoomId === "*") {
    return 0;
  }

  const subRoom = room.meta!.subRooms![subRoomId];
  const { from, to } = subRoom.physicalPosition;

  // If inside the subroom, return 0
  if (
    position.x >= from.x &&
    position.y >= from.y &&
    position.x <= to.x &&
    position.y <= to.y
  ) {
    return 0;
  }

  // Calculate Manhattan distance to the subroom
  let xDistance = 0;
  let yDistance = 0;

  if (position.x < from.x) {
    xDistance = from.x - position.x;
  } else if (position.x > to.x) {
    xDistance = position.x - to.x;
  }

  if (position.y < from.y) {
    yDistance = from.y - position.y;
  } else if (position.y > to.y) {
    yDistance = position.y - to.y;
  }

  return xDistance + yDistance;
};

export const findSubRoomForItem = (
  position: Xy,
  positionType: "block" | "fine",
  room: MaybeDividedRoom,
): string => {
  const subRooms = room.meta?.subRooms;

  if (subRooms === undefined) {
    return "*";
  }

  let closestSubRoom: string | undefined;
  let minDistance = Infinity;

  const positionMaybeConverted =
    positionType === "fine" ?
      {
        x: position.x / blockSizePx.w,
        y: position.y / blockSizePx.d,
      }
    : position;

  for (const subRoomId of keysIter(subRooms)) {
    const distance = inPlayItemDistanceToSubRoom(
      positionMaybeConverted,
      subRoomId,
      room,
    );

    if (distance === 0) {
      // Item is inside this subroom, return immediately
      return subRoomId;
    }

    if (distance < minDistance) {
      minDistance = distance;
      closestSubRoom = subRoomId;
    }
  }

  if (closestSubRoom === undefined) {
    throw new Error(
      `item not found in any subroom of ${room.id}
      item at 📍 ${JSON.stringify(positionMaybeConverted)}
      subrooms ${JSON.stringify(room.meta?.subRooms, null, 2)}`,
    );
  }

  return closestSubRoom;
};
