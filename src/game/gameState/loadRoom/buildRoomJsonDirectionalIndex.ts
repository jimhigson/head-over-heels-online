import type { JsonItem, JsonItemUnion } from "../../../model/json/JsonItem";
import type { DirectionXy4 } from "../../../utils/vectors/vectors";

type DirectionalLocationMap<
  T extends "door" | "wall",
  RoomId extends string,
  RoomItemId extends string,
> = Record<
  string,
  Partial<Record<DirectionXy4, JsonItem<T, RoomId, RoomItemId>>>
>;

const addDirectionalItemToLocationMap = <
  T extends "door" | "wall",
  RoomId extends string,
  RoomItemId extends string,
>(
  jsonItem: JsonItem<T, RoomId, RoomItemId>,
  locationMap: DirectionalLocationMap<T, RoomId, RoomItemId>,
) => {
  const coordStr = `${jsonItem.position.x},${jsonItem.position.y}`;
  let directions = locationMap[coordStr];
  if (directions === undefined) {
    directions = {};
    locationMap[coordStr] = directions;
  }
  directions[jsonItem.config.direction] = jsonItem;
};

export type RoomDirectionalIndex<
  RoomId extends string,
  RoomItemId extends string,
> = {
  walls: DirectionalLocationMap<"wall", RoomId, RoomItemId>;
  doors: DirectionalLocationMap<"door", RoomId, RoomItemId>;
  floors: JsonItem<"floor", RoomId, RoomItemId>[];
};

export const emptyRoomJsonDirectionalIndex: RoomDirectionalIndex<
  string,
  string
> = {
  walls: {},
  doors: {},
  floors: [],
};

export const buildRoomJsonDirectionalIndex = <
  RoomId extends string,
  RoomItemId extends string,
>(
  items: Iterable<JsonItemUnion<RoomId, RoomItemId>>,
): RoomDirectionalIndex<RoomId, RoomItemId> => {
  const walls: DirectionalLocationMap<"wall", RoomId, RoomItemId> = {};
  const doors: DirectionalLocationMap<"door", RoomId, RoomItemId> = {};
  const floors: JsonItem<"floor", RoomId, RoomItemId>[] = [];

  for (const jsonItem of items) {
    switch (jsonItem.type) {
      case "wall":
        addDirectionalItemToLocationMap(jsonItem, walls);
        break;

      case "door":
        addDirectionalItemToLocationMap(jsonItem, doors);
        break;

      case "floor":
        floors.push(jsonItem);
        break;
    }
  }

  return { walls, doors, floors };
};
