import type { UnionOfAllItemInPlayTypes } from "../../../../../../model/ItemInPlay";
import type { JsonItemUnion } from "../../../../../../model/json/JsonItem";
import type { RoomJson } from "../../../../../../model/RoomJson";
import { blockSizePx } from "../../../../../../sprites/spritePivots";
import { keysIter } from "../../../../../../utils/entries";
import { iterate } from "../../../../../../utils/iterate";
import type { Xy } from "../../../../../../utils/vectors/vectors";

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

export const inPlayItemIsInSubRoom = <RoomId extends string>(
  { state: { position } }: UnionOfAllItemInPlayTypes<RoomId>,
  subRoomId: string,
  room: RoomJson<RoomId, string>,
) => {
  const blockPosition: Xy = {
    x: position.x / blockSizePx.w,
    y: position.y / blockSizePx.d,
  };

  return blockXyIsInSubRoom(blockPosition, subRoomId, room);
};

export const findSubRoomForItem = <RoomId extends string>(
  item: UnionOfAllItemInPlayTypes<RoomId>,
  room: RoomJson<RoomId, string>,
): string => {
  const subRooms = room.meta?.subRooms;

  if (subRooms === undefined) {
    return "*";
  }

  const found = iterate(keysIter(subRooms)).find((subRoomId) => {
    return inPlayItemIsInSubRoom(item, subRoomId, room);
  });

  if (found === undefined) {
    throw new Error(
      `${item.id} not found in any subroom of ${room.id} ${JSON.stringify(item.state.position)} ${JSON.stringify(room.meta?.subRooms)}`,
    );
  }

  return found;
};
