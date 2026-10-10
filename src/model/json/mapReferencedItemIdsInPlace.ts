import { type JsonItemUnion } from "./JsonItem";

/**
 * rewrite each item id a switch / button / timer / joystick references (the
 * ids {@link getReferencedItems} yields). Mapping an id to undefined drops
 * that reference; lists are kept even when emptied, since an empty list means
 * "none" while an absent one means "all"
 */
export const mapReferencedItemIdsInPlace = <
  RoomId extends string,
  RoomItemId extends string,
>(
  jsonItem: JsonItemUnion<RoomId, RoomItemId>,
  mapId: (itemId: RoomItemId) => RoomItemId | undefined,
) => {
  const mapIds = (itemIds: RoomItemId[]) =>
    itemIds.flatMap((itemId) => mapId(itemId) ?? []);

  if (jsonItem.type === "joystick") {
    if (jsonItem.config.controls !== undefined) {
      jsonItem.config.controls = mapIds(jsonItem.config.controls);
    }
    return;
  }
  if (
    jsonItem.type !== "switch" &&
    jsonItem.type !== "button" &&
    jsonItem.type !== "timer"
  ) {
    return;
  }
  if (!("modifies" in jsonItem.config)) {
    return;
  }
  for (const mod of jsonItem.config.modifies) {
    if (mod.targets !== undefined) {
      mod.targets = mapIds(mod.targets);
    }
  }
};
