import { type JsonItem } from "../../../model/json/JsonItem";
import { type RoomDirectionalIndex } from "./buildRoomJsonDirectionalIndex";

/**
 * whether the door sits on a floor edge - a world-space fact, baked into the
 * door parts at load. A door is in a hidden wall when this is true AND its
 * wall faces the camera at the current angle (hidden walls only exist along
 * the floor's boundary); the angle half of that test is applied at render
 * time
 */
export const isDoorOnFloorEdge = <
  RoomId extends string,
  RoomItemId extends string,
>(
  door: JsonItem<"door", RoomId, RoomItemId>,
  { floors }: RoomDirectionalIndex<RoomId, RoomItemId>,
): boolean => {
  const { direction } = door.config;

  switch (direction) {
    case "right":
      return floors.some((floor) => floor.position.x === door.position.x);
    case "towards":
      return floors.some((floor) => floor.position.y === door.position.y);
    case "left":
      return floors.some(
        (floor) => floor.position.x + floor.config.times.x === door.position.x,
      );
    case "away":
      return floors.some(
        (floor) => floor.position.y + floor.config.times.y === door.position.y,
      );
    default:
      return direction satisfies never;
  }
};
