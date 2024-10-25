import { UnknownItem } from "../../src/Item";
import shortHash from "shorthash2";
import { canonicalize } from "json-canonicalize";

export const keyItems = <R extends string>(
  items: Array<UnknownItem<R>>,
): Record<string, UnknownItem<R>> => {
  return Object.fromEntries(
    items.map(
      (item) =>
        [
          `${item.type}@${item.position.x},${item.position.y},${item.position.z}:${shortHash(canonicalize(item.config))}`,
          item,
        ] as [string, UnknownItem<R>],
    ),
  );
};
