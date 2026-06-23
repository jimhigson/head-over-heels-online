import { type JsonItem } from "../../../model/json/JsonItem";
import { isWallHidden } from "../../../model/json/WallJsonConfig";
import {
  rotateDirectionXy4ByCameraAngle,
  type Xy,
} from "../../../utils/vectors/vectors";
import { type RoomDirectionalIndex } from "./buildRoomJsonDirectionalIndex";

/**
 * is the door in a hidden (camera-facing, undrawn) wall? Hidden walls are the
 * ones the camera looks over into the room, so which physical walls count as
 * hidden rotates with the camera. The door must also sit on a floor edge (a
 * world-space fact), since hidden walls only exist along the floor's boundary.
 */
export const isDoorInHiddenWall = <
  RoomId extends string,
  RoomItemId extends string,
>(
  door: JsonItem<"door", RoomId, RoomItemId>,
  { floors }: RoomDirectionalIndex<RoomId, RoomItemId>,
  cameraAngle: Xy,
): boolean => {
  const { direction } = door.config;

  if (!isWallHidden(rotateDirectionXy4ByCameraAngle(direction, cameraAngle))) {
    return false;
  }

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
