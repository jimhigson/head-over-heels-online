import { UnknownItem } from "../../src/Item";


export const keyItems = <R extends string>(
  items: Array<UnknownItem<R>>
): Record<string, UnknownItem<R>> => {
  return Object.fromEntries(
    items.map(
      (item) => [
        `${item.type}@${item.position.x},${item.position.y},${item.position.z}`,
        item,
      ] as [string, UnknownItem<R>]
    )
  );
};
