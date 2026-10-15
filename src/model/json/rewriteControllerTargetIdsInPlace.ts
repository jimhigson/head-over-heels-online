import { type JsonItemUnion } from "./JsonItem";

/**
 * rewrite each item id a switch / button / timer / joystick explicitly targets
 * (as {@link getControlTargetItemsInRoom} gives with no room). lists are kept even
 * when emptied, since an empty list means "none" while an absent one means "all"
 */
export const rewriteControllerTargetIdsInPlace = <
  RoomId extends string,
  RoomItemId extends string,
>(
  jsonItem: JsonItemUnion<RoomId, RoomItemId>,
  /** callback to get the new id; return undefined to drop the target */
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
