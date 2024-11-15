import type { UnknownJsonItem } from "../model/json/JsonItem";
import shortHash from "shorthash2";
import { canonicalize } from "json-canonicalize";

/** for a given item in the game, auto-produce a unique id for it */
export const keyItems = <R extends string>(
  items: Array<UnknownJsonItem<R>>,
): Record<string, UnknownJsonItem<R>> => {
  return Object.fromEntries(
    items.map(
      (item) =>
        [
          `${item.type}@${item.position.x},${item.position.y},${item.position.z}:${shortHash(canonicalize(item.config))}`,
          item,
        ] as [string, UnknownJsonItem<R>],
    ),
  );
};
