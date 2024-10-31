import { UnknownJsonItem } from "@/model/Item";
import { UnknownItemInPlay } from "@/model/ItemInPlay";
import { RoomState, RoomJson } from "@/model/modelTypes";
import { PlanetName } from "@/sprites/planets";
import { entries } from "@/utils/entries";
import { loadWalls } from "./loadWalls";
import { loadItem } from "./loadItem";

function* loadItems<RoomId extends string>(
  items: Record<string, UnknownJsonItem<RoomId>>,
): Generator<UnknownItemInPlay<RoomId>> {
  const ent = entries(items);
  for (const [id, item] of ent) {
    yield* loadItem(id, item);
  }
}

/**
 * convert a room from it's storage (json) format to its in-play (loaded) format
 */
export const loadRoom = <P extends PlanetName, R extends string>(
  roomJson: RoomJson<P, R>,
): RoomState<P, R> => {
  return {
    ...roomJson,
    items: [...loadItems(roomJson.items), ...loadWalls(roomJson)],
  };
};
