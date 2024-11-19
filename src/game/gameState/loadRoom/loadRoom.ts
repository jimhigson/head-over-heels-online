import type {
  FallingItemTypes,
  ItemInPlay,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { itemFalls } from "@/model/ItemInPlay";
import type { RoomState, RoomJson, RoomStateItems } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { entries } from "@/utils/entries";
import { loadWalls } from "./loadWalls";
import { loadItem } from "./loadItem";
import { collision1toMany } from "../../collision/aabbCollision";
import { addXyz } from "@/utils/vectors";
import { iterate } from "@/utils/iterate";
import { objectValues } from "iter-tools";
import type { PickupsCollected } from "../GameState";
import { loadFloorAndCeiling } from "./loadFloorAndCeiling";

function* loadItems<RoomId extends string>(
  roomJson: RoomJson<PlanetName, RoomId>,
  pickupsCollected: PickupsCollected<RoomId>,
): Generator<UnknownItemInPlay<RoomId>> {
  const ent = entries(roomJson.items);
  for (const [id, item] of ent) {
    yield* loadItem(id, item, roomJson, pickupsCollected);
  }
}

export const findStandingOn = (
  { state: { position }, aabb, id }: ItemInPlay<FallingItemTypes>,
  items: Iterable<UnknownItemInPlay>,
): UnknownItemInPlay | null => {
  const positionJustBelowItem = addXyz(position, { z: -1 });
  const collisions = collision1toMany(
    {
      state: { position: positionJustBelowItem },
      aabb,
      id,
    },
    items,
  );

  for (const collisionItem of collisions) {
    const collisionItemTop =
      collisionItem.state.position.z + collisionItem.aabb.z;

    if (collisionItemTop === position.z) {
      // the top of the collision item is the same z as the bottom of the item being tested
      //console.log(id, "is standing on", collisionItem);
      return collisionItem;
    }
  }
  return null; // not standing on anything in the items list
};

export const initStandingOnForItem = (
  item: ItemInPlay<FallingItemTypes, PlanetName, string>,
  items: RoomStateItems<PlanetName, string>,
) => {
  item.state.standingOn = findStandingOn(item, objectValues(items));
};

const initStandingOnForItems = (items: RoomStateItems<PlanetName, string>) => {
  for (const item of objectValues(items)) {
    if (itemFalls(item)) {
      initStandingOnForItem(item, items);
    }
  }
};

/**
 * convert items from a flat list to an object map, key'd by their ids
 */
const itemsInItemObjectMap = <
  P extends PlanetName,
  RoomId extends string,
  ItemId extends string,
>(
  items: Iterable<UnknownItemInPlay<RoomId>>,
) => {
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
export const loadRoom = <P extends PlanetName, RoomId extends string>(
  roomJson: RoomJson<P, RoomId>,
  pickupsCollected: PickupsCollected<RoomId>,
): RoomState<P, RoomId> => {
  const loadedItems: RoomStateItems<P, RoomId> = {
    ...itemsInItemObjectMap(loadFloorAndCeiling(roomJson)),
    ...itemsInItemObjectMap(loadWalls(roomJson)),
    ...itemsInItemObjectMap(loadItems(roomJson, pickupsCollected)),
  };

  // the physics will go nuts if things are overlapping, so check and reject
  // if they are:
  for (const loadedItem of objectValues(loadedItems)) {
    const collisions = collision1toMany(loadedItem, objectValues(loadedItems));
    if (collisions.length > 0) {
      throw new Error(
        `item ${loadedItem.id} is colliding with ${collisions.map((c) => c.id)}`,
      );
    }
  }

  initStandingOnForItems(loadedItems);

  return {
    ...roomJson,
    items: loadedItems,
  };
};
