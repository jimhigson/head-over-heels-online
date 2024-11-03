import { UnknownJsonItem } from "@/model/Item";
import {
  defaultItemProperties,
  ItemInPlay,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { RoomState, RoomJson, AnyRoomJson } from "@/model/modelTypes";
import { PlanetName } from "@/sprites/planets";
import { entries } from "@/utils/entries";
import { loadWalls } from "./loadWalls";
import { loadItem } from "./loadItem";
import { blockXyzToFineXyz } from "../../render/projectToScreen";
import { collision1toMany } from "../../collision/aabbCollision";
import { addXyz } from "@/utils/vectors";

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
      position: blockXyzToFineXyz({ x: 0, y: 0, z: 0 }),
      state: {},
      aabb: { ...blockXyzToFineXyz(room.size), z: 0 },
      renders: false,
    },
  };
};

const standItems = (items: UnknownItemInPlay[]) => {
  for (const item of items) {
    if (item.falls) {
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
        const collisionItemTop = Math.max(
          collisionItem.position.z,
          collisionItem.position.z + collisionItem.aabb.z,
        );
        const maybeStandingItemBottom = Math.min(
          item.position.z,
          item.position.z + item.aabb.z,
        );

        if (collisionItemTop === maybeStandingItemBottom) {
          // TODO: use the type system better here - all items with
          // .falls should also have .state.standingOn and ts
          // should be able to recognise this
          item.state.standingOn = collisionItem;
          console.log(item, "is standing on", collisionItem);
          break;
        }
      }
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

  standItems(loadedItems);

  return {
    ...roomJson,
    items: loadedItems,
  };
};
