import { nextItemIdSet } from "../model/inPlaceMutators/nextItemId";
import { type JsonItemUnion } from "../model/json/JsonItem";
import {
  type RoomJsonItems,
  roomJsonItemsEntriesIterable,
} from "../model/RoomJson";
import { getJsonItemTimes } from "../model/times";
import { keys } from "../utils/entries";
import { omit } from "../utils/pick";
import { consolidateItemsMap } from "./consolidateItems";

type AnyJsonItemUnion = JsonItemUnion<string, string>;

const hasTimesGreaterThanOne = (item: AnyJsonItemUnion): boolean => {
  const times = getJsonItemTimes(item);
  return times.x > 1 || times.y > 1 || times.z > 1;
};

export const explodeItem = <RoomItemId extends string, RoomId extends string>(
  id: RoomItemId,
  item: JsonItemUnion<RoomId, RoomItemId>,
  /**
   * ids already taken in the room — every fragment id is minted unique against
   * this set and added to it, so fragments never collide with sibling items or
   * with fragments from other exploded blocks
   */
  reserved: Set<RoomItemId>,
): Record<RoomItemId, JsonItemUnion<RoomId, RoomItemId>> => {
  const times = getJsonItemTimes(item);
  const fragments = {} as Record<RoomItemId, JsonItemUnion<RoomId, RoomItemId>>;

  // tile-based walls (away/left) hold their length in a tiles array rather than a
  // times config, so each exploded part keeps a single tile from that array:
  const wallTiles =
    (
      item.type === "wall" &&
      (item.config.direction === "away" || item.config.direction === "left")
    ) ?
      item.config.tiles
    : undefined;

  for (let dz = 0; dz < times.z; dz++) {
    for (let dy = 0; dy < times.y; dy++) {
      for (let dx = 0; dx < times.x; dx++) {
        const fragmentId = nextItemIdSet(reserved, id);
        reserved.add(fragmentId);
        const config =
          wallTiles === undefined ?
            omit(item.config as Record<string, unknown>, "times")
            // away runs along x and left along y, so only one of dx/dy is ever
            // non-zero - their sum is the tile index along the wall:
          : { ...item.config, tiles: [wallTiles[dx + dy]] };
        fragments[fragmentId] = {
          ...item,
          config,
          position: {
            x: item.position.x + dx,
            y: item.position.y + dy,
            z: item.position.z + dz,
          },
        } as JsonItemUnion<RoomId, RoomItemId>;
      }
    }
  }

  return fragments;
};

export const reconsolidateItems = <
  RoomItemId extends string,
  RoomId extends string,
>(
  items: RoomJsonItems<RoomItemId, RoomId>,
  shouldConsolidate: (item: JsonItemUnion<RoomId, RoomItemId>) => boolean,
): RoomJsonItems<RoomItemId, RoomId> => {
  const itemsToExplode: [RoomItemId, JsonItemUnion<RoomId, RoomItemId>][] = [];

  for (const [id, item] of roomJsonItemsEntriesIterable(items)) {
    if (!shouldConsolidate(item) && hasTimesGreaterThanOne(item)) {
      itemsToExplode.push([id, item]);
    }
  }

  if (itemsToExplode.length === 0) {
    return items;
  }

  const result = { ...items };
  const reserved = new Set<RoomItemId>(keys(result));

  for (const [id, item] of itemsToExplode) {
    delete result[id];
    // drop the original id so the first fragment reclaims it:
    reserved.delete(id);

    const fragments = explodeItem(id, item, reserved);
    const reconsolidated = consolidateItemsMap(fragments, shouldConsolidate);

    Object.assign(result, reconsolidated);
  }

  return result;
};
