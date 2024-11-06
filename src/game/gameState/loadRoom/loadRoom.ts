import { UnknownJsonItem } from "@/model/Item";
import {
  FallingItemTypes,
  itemFalls,
  ItemInPlay,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import { RoomState, RoomJson, AnyRoomJson } from "@/model/modelTypes";
import { PlanetName } from "@/sprites/planets";
import { entries } from "@/utils/entries";
import { loadWalls } from "./loadWalls";
import { loadItem } from "./loadItem";
import { blockXyzToFineXyz } from "../../render/projectToScreen";
import { collision1toMany } from "../../collision/aabbCollision";
import { addXy, addXyz } from "@/utils/vectors";

function* loadItems<RoomId extends string>(
  items: Record<string, UnknownJsonItem<RoomId>>,
): Generator<UnknownItemInPlay<RoomId>> {
  const ent = entries(items);
  for (const [id, item] of ent) {
    yield* loadItem(id, item);
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
      position: blockXyzToFineXyz({ x: -1, y: -1, z: 0 }),
      aabb: { ...blockXyzToFineXyz(addXy(room.size, { x: 2, y: 2 })), z: 0 },
      state: {},
      renders: false,
    },
  };
};

export const findStandingOn = (
  item: ItemInPlay<FallingItemTypes>,
  items: UnknownItemInPlay[],
): UnknownItemInPlay | null => {
  const positionJustBelowItem = addXyz(item.position, { z: -1 });
  const collisions = collision1toMany(
    {
      position: positionJustBelowItem,
      aabb: item.aabb,
      id: item.id,
    },
    items,
  );

  for (const collisionItem of collisions) {
    const collisionItemTop = collisionItem.position.z + collisionItem.aabb.z;
    const maybeStandingItemBottom = item.position.z;

    if (collisionItemTop === maybeStandingItemBottom) {
      console.log(item, "is standing on", collisionItem);
      return collisionItem;
    }
  }
  return null; // not standing on anything in the items list
};

const initStandingOn = (items: UnknownItemInPlay[]) => {
  for (const item of items) {
    if (itemFalls(item)) {
      item.state.standingOn = findStandingOn(item, items);
    }
  }
};

/**
 * convert a room from it's storage (json) format to its in-play (loaded) format
 */
export const loadRoom = <P extends PlanetName, R extends string>(
  roomJson: RoomJson<P, R>,
): RoomState<P, R> => {
  const loadedItems = [
    loadFloor(roomJson),
    ...loadWalls(roomJson),
    ...loadItems(roomJson.items),
  ];

  initStandingOn(loadedItems);

  return {
    ...roomJson,
    items: loadedItems,
  };
};
