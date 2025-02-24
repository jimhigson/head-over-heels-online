import { loadItemFromJson } from "./loadItem";
import { collision1toMany } from "../../collision/aabbCollision";
import { objectValues } from "iter-tools";
import type { RoomPickupsCollected } from "../GameState";
import { loadFloorAndCeiling } from "./loadFloorAndCeiling";
import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { RoomStateItems, RoomState } from "../../../model/modelTypes";
import type { RoomJson } from "../../../model/RoomJson";
import type { SceneryName } from "../../../sprites/planets";
import { entries } from "../../../utils/entries";
import { iterate } from "../../../utils/iterate";
import { isSolid } from "../../physics/itemPredicates";
import { store } from "../../../store/store";

function* loadItems<RoomId extends string>(
  roomJson: RoomJson<SceneryName, RoomId>,
  roomPickupsCollected: RoomPickupsCollected,
  isFirstLoad: boolean,
): Generator<UnionOfAllItemInPlayTypes<RoomId>> {
  const { scrollsRead } = store.getState();

  const ent = entries(roomJson.items);
  for (const [id, item] of ent) {
    if (item.type === "player" && !isFirstLoad) {
      continue;
    }
    yield* loadItemFromJson(id, item, roomPickupsCollected, scrollsRead);
  }
}

/**
 * convert items from a flat list to an object map, key'd by their ids
 */
const itemsInItemObjectMap = <
  P extends SceneryName,
  RoomId extends string,
  ItemId extends string,
>(
  items: Iterable<UnionOfAllItemInPlayTypes<RoomId>>,
): RoomStateItems<P, RoomId, ItemId> => {
  return iterate(items).reduce(
    (ac, cur) => {
      return {
        ...ac,
        [cur.id]: cur,
      };
    },
    {} as RoomStateItems<P, RoomId, ItemId>,
  );
};

/**
 * convert a room from it's storage (json) format to its in-play (loaded) format
 */
export const loadRoom = <P extends SceneryName, RoomId extends string>(
  roomJson: RoomJson<P, RoomId>,
  roomPickupsCollected: RoomPickupsCollected,
  isFirstLoad = false,
): RoomState<P, RoomId> => {
  const loadedItems: RoomStateItems<P, RoomId> = {
    ...itemsInItemObjectMap(loadFloorAndCeiling(roomJson)),
    ...itemsInItemObjectMap(
      loadItems(roomJson, roomPickupsCollected, isFirstLoad),
    ),
  };

  // the physics will go nuts if things are overlapping, so check and reject
  // if they are:
  for (const i of objectValues(loadedItems)) {
    const collisions = collision1toMany(i, objectValues(loadedItems));
    const solidCol = collisions.find(
      (col) =>
        isSolid(i) &&
        isSolid(col) &&
        // walls are allowed to collide with other walls, since they have thickness
        // - this is only really possible in large rooms with extra walls
        !(i.type === "wall" && col.type === "wall"),
    );

    if (solidCol !== undefined) {
      throw new Error(
        `in room ${roomJson.id} item ${i.id} @${JSON.stringify(i.state.position)} #${JSON.stringify(i.aabb)} is colliding with (solid item) ${solidCol.id} @${JSON.stringify(solidCol.state.position)} #${JSON.stringify(solidCol.aabb)} on loading room ${roomJson.id}`,
      );
    }
  }

  const roomState: RoomState<P, RoomId> = {
    ...roomJson,
    roomJson,
    items: {
      ...loadedItems,
      //...extraItems,
    },
    roomTime: 0,
  };

  return roomState;
};
