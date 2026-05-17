import { type JsonItem } from "../../../model/json/JsonItem";
import { type RoomDirectionalIndex } from "./buildRoomJsonDirectionalIndex";

export const isDoorInHiddenWall = <
  RoomId extends string,
  RoomItemId extends string,
>(
  door: JsonItem<"door", RoomId, RoomItemId>,
  { floors }: RoomDirectionalIndex<RoomId, RoomItemId>,
): boolean => {
  const { direction } = door.config;

  if (direction === "right") {
    return floors.some((floor) => floor.position.x === door.position.x);
  }
  if (direction === "towards") {
    return floors.some((floor) => floor.position.y === door.position.y);
  }
  return false;
};
