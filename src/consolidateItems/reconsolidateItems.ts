import type { JsonItemUnion } from "../model/json/JsonItem";
import type { RoomJsonItems } from "../model/RoomJson";

import { roomJsonItemsEntriesIterable } from "../model/RoomJson";
import { getJsonItemTimes } from "../model/times";
import { omit } from "../utils/pick";
import { consolidateItemsMap } from "./consolidateItems";

type AnyJsonItemUnion = JsonItemUnion<string, string>;

const hasTimesGreaterThanOne = (item: AnyJsonItemUnion): boolean => {
  const times = getJsonItemTimes(item);
  return times.x > 1 || times.y > 1 || times.z > 1;
};

const explodeItem = <RoomItemId extends string, RoomId extends string>(
  id: string,
  item: JsonItemUnion<RoomId, RoomItemId>,
): Record<string, JsonItemUnion<RoomId, RoomItemId>> => {
  const times = getJsonItemTimes(item);
  const fragments: Record<string, JsonItemUnion<RoomId, RoomItemId>> = {};
  let suffix = 0;

  for (let dz = 0; dz < times.z; dz++) {
    for (let dy = 0; dy < times.y; dy++) {
      for (let dx = 0; dx < times.x; dx++) {
        const fragmentId = suffix === 0 ? id : `${id}_${suffix}`;
        fragments[fragmentId] = {
          ...item,
          config: omit(item.config as Record<string, unknown>, "times"),
          position: {
            x: item.position.x + dx,
            y: item.position.y + dy,
            z: item.position.z + dz,
          },
        } as JsonItemUnion<RoomId, RoomItemId>;
        suffix++;
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

  for (const [id, item] of itemsToExplode) {
    delete result[id];

    const fragments = explodeItem(id, item);
    const reconsolidated = consolidateItemsMap(fragments, shouldConsolidate);

    Object.assign(result, reconsolidated);
  }

  return result;
};
