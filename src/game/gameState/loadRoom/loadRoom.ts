import { loadItemFromJson } from "./loadItemFromJson";
import { collision1toMany } from "../../collision/aabbCollision";
import type { RoomPickupsCollected } from "../GameState";
import { loadPortalsAboveAndBelow } from "./loadPortalsAboveAndBelow";
import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { RoomJson } from "../../../model/RoomJson";
import { entries } from "../../../utils/entries";
import { iterate } from "../../../utils/iterate";
import { isFreeItem, isSolid } from "../../physics/itemPredicates";
import {
  type RoomStateItems,
  type RoomState,
  iterateRoomItems,
  roomItemsIterable,
} from "../../../model/RoomState";
import { findStandingOnWithHighestPriorityAndMostOverlap } from "../../collision/checkStandingOn";
import { setStandingOn } from "../mutators/setStandingOn";
import type { ScrollsRead } from "../../../store/slices/gameMenusSlice";

function* loadItems<RoomId extends string, RoomItemId extends string>(
  roomJson: RoomJson<RoomId, RoomItemId>,
  roomPickupsCollected: RoomPickupsCollected,
  scrollsRead: ScrollsRead,
  isNewGame: boolean,
): Generator<UnionOfAllItemInPlayTypes<RoomId>> {
  const ent = entries(roomJson.items);
  for (const [id, item] of ent) {
    if (item.type === "player" && !isNewGame) {
      continue;
    }
    yield* loadItemFromJson(
      id,
      item,
      roomJson,
      roomPickupsCollected,
      scrollsRead,
    );
  }
}

/**
 * convert items from a flat list to an object map, key'd by their ids
 */
const itemsInItemObjectMap = <RoomId extends string, RoomItemId extends string>(
  items: Iterable<UnionOfAllItemInPlayTypes<RoomId>>,
): RoomStateItems<RoomId, RoomItemId> => {
  return iterate(items).reduce(
    (ac, cur) => {
      return {
        ...ac,
        [cur.id]: cur,
      };
    },
    {} as RoomStateItems<RoomId, RoomItemId>,
  );
};

/**
 * convert a room from it's storage (json) format to its in-play (loaded) format
 */
export const loadRoom = <RoomId extends string, RoomItemId extends string>({
  roomJson,
  roomPickupsCollected,
  scrollsRead,
  isNewGame = false,
}: {
  roomJson: RoomJson<RoomId, RoomItemId>;
  roomPickupsCollected: RoomPickupsCollected;
  scrollsRead: ScrollsRead;
  /** if true, this is a new game - ie, load head and heels if they are in the room */
  isNewGame?: boolean;
}): RoomState<RoomId, RoomItemId> => {
  const roomItems = itemsInItemObjectMap(
    loadItems(roomJson, roomPickupsCollected, scrollsRead, isNewGame),
  );
  const items: RoomStateItems<RoomId, RoomItemId> = {
    ...itemsInItemObjectMap(loadPortalsAboveAndBelow(roomJson, roomItems)),
    ...roomItems,
  };

  // the physics will go nuts if things are overlapping, so check and reject
  // if they are:
  for (const i of iterateRoomItems(items)) {
    const collisions = collision1toMany(i, roomItemsIterable(items));
    const solidCol = collisions.find(
      (col) =>
        isSolid(i) &&
        isSolid(col) &&
        // walls are allowed to collide with other walls, since they have thickness
        // - this is only really possible in large rooms with extra walls
        !(i.type === "wall" && col.type === "wall"),
    );

    if (solidCol !== undefined) {
      console.error(
        `in room ${roomJson.id} item ${i.id} @${JSON.stringify(i.state.position)} #${JSON.stringify(i.aabb)} is colliding with (solid item) ${solidCol.id} @${JSON.stringify(solidCol.state.position)} #${JSON.stringify(solidCol.aabb)} on loading room ${roomJson.id}`,
      );
    }
  }

  // check for items that are standing on other items:
  for (const i of iterateRoomItems(items).filter(isFreeItem)) {
    const newStandingOn = findStandingOnWithHighestPriorityAndMostOverlap(
      i,
      iterateRoomItems(items).filter((j) => j.id !== i.id),
    );
    if (newStandingOn !== undefined) {
      setStandingOn({ above: i, below: newStandingOn });
    }
  }

  const roomState: RoomState<RoomId, RoomItemId> = {
    ...roomJson,
    roomJson,
    items,
    roomTime: 0,
  };

  return roomState;
};
