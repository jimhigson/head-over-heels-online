import type {
  FallingItemTypes,
  ItemInPlay,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { itemFalls } from "@/model/ItemInPlay";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import type {
  RoomState,
  RoomJson,
  AnyRoomJson,
  RoomStateItems,
} from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { entries } from "@/utils/entries";
import { loadWalls } from "./loadWalls";
import { loadItem } from "./loadItem";
import { blockXyzToFineXyz } from "../../render/projectToScreen";
import { collision1toMany } from "../../collision/aabbCollision";
import { addXy, addXyz } from "@/utils/vectors";
import { iterate } from "@/utils/iterate";
import { objectValues } from "iter-tools";
import type { PickupsCollected } from "../GameState";

function* loadItems<RoomId extends string>(
  roomJson: RoomJson<PlanetName, RoomId>,
  pickupsCollected: PickupsCollected<RoomId>,
): Generator<UnknownItemInPlay<RoomId>> {
  const ent = entries(roomJson.items);
  for (const [id, item] of ent) {
    yield* loadItem(id, item, roomJson, pickupsCollected);
  }
}

const loadFloor = (room: AnyRoomJson): ItemInPlay<"floor"> => {
  return {
    ...defaultItemProperties,
    ...{
      type: "floor",
      id: "floor",
      config: {},
      // the floor's bounding box is extended to be 1 block bigger than the room in
      // all directions - this is because doors extend outside of the box by half a block
      // on the towards/left sides. Since the floor doesn't render, it doesn't matter
      // for z-sorting how big it is. Althoughao it probably wouldn't happen anyway, this
      // safeguards against falling 'off the edge of the world'
      aabb: { ...blockXyzToFineXyz(addXy(room.size, { x: 2, y: 2 })), z: 0 },
      state: {
        position: blockXyzToFineXyz({ x: -1, y: -1, z: 0 }),
        expires: null,
      },
      renders: false,
    },
  };
};

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
const itemArrayToItemObjectMap = <
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
    floor: loadFloor(roomJson),
    ...itemArrayToItemObjectMap(loadWalls(roomJson)),
    ...itemArrayToItemObjectMap(loadItems(roomJson, pickupsCollected)),
  };

  initStandingOnForItems(loadedItems);

  return {
    ...roomJson,
    items: loadedItems,
  };
};
