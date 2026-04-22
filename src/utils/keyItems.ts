import type { JsonItemUnion } from "../model/json/JsonItem";

import { typePrefix } from "../model/json/typePrefix";

/**
 * Assign each item a short, unique id within the room. Items with an explicit
 * `id` property keep it; others get `<prefix>`, `<prefix>1`, `<prefix>2` … by
 * order of encounter (eg. three walls → `w`, `w1`, `w2`).
 */
export const keyItems = <RoomId extends string>(
  items: Array<JsonItemUnion<RoomId> & { id?: string }>,
): Record<string, JsonItemUnion<RoomId>> => {
  const counters: Partial<Record<string, number>> = {};
  const result: Record<string, JsonItemUnion<RoomId>> = {};

  for (const item of items) {
    if (item.id !== undefined) {
      if (result[item.id] !== undefined) {
        throw new Error(`duplicate item id '${item.id}' in room`);
      }
      result[item.id] = item;
      continue;
    }
    const prefix = typePrefix[item.type];
    const n = counters[prefix] ?? 0;
    counters[prefix] = n + 1;
    const key = n === 0 ? prefix : `${prefix}${n}`;
    if (result[key] !== undefined) {
      throw new Error(
        `auto-generated key '${key}' collides with an explicit id in the same room`,
      );
    }
    result[key] = item;
  }

  return result;
};
