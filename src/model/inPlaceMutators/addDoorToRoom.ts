import { type DirectionXy4, type Xyz } from "../../utils/vectors/vectors";
import { type JsonItemConfig } from "../json/JsonItem";
import { typePrefix } from "../json/typePrefix";
import { type RoomJson, type RoomJsonItems } from "../RoomJson";
import { generateHoleInWallsForDoor } from "./generateHoleInWallsForDoor";
import { nextItemId } from "./nextItemId";

export const addDoorToRoom = <RoomId extends string, RoomItemId extends string>(
  roomJson: RoomJson<RoomId, RoomItemId>,
  blockPosition: Xyz,
  doorDirection: DirectionXy4,
  doorConfig: Omit<JsonItemConfig<"door", RoomId, RoomItemId>, "direction">,
): RoomItemId => {
  const { items } = roomJson;

  // cut hole in walls where the door goes:
  for (const [itemId, modifiedWall] of generateHoleInWallsForDoor(
    items,
    doorDirection,
    blockPosition,
  )) {
    if (modifiedWall === null) {
      delete items[itemId];
    } else {
      items[itemId] = modifiedWall;
    }
  }

  // add the door item:
  const doorId = nextItemId(
    Object.keys(items) as RoomItemId[],
    typePrefix.door,
  ) as RoomItemId;

  (items as RoomJsonItems<RoomItemId, RoomId>)[doorId] = {
    type: "door",
    config: {
      ...doorConfig,
      direction: doorDirection,
    },
    position: blockPosition,
  };

  return doorId;
};
