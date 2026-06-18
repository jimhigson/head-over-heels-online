/**
 * Finds the next unused id of the form `<baseName>`, `<baseName>1`,
 * `<baseName>2`, … — matches the scheme used by `keyItems` for auto-converted
 * rooms so ids look consistent across both sources.
 */
export const nextItemId = <RoomItemId extends string = string>(
  existingIds: Iterable<RoomItemId>,
  baseName: string,
): RoomItemId => nextItemIdSet(new Set(existingIds), baseName);

export const nextItemIdSet = <RoomItemId extends string = string>(
  existing: Set<RoomItemId>,
  baseName: string,
): RoomItemId => {
  for (let i = 0; ; i++) {
    const itemId = (i === 0 ? baseName : `${baseName}${i}`) as RoomItemId;
    if (!existing.has(itemId)) {
      return itemId;
    }
  }
};

/**
 * like `nextItemIdSet`, but tests existence directly against a room-items object
 * (`items[id]`), avoiding building a Set when the items are already keyed by id
 */
export const nextItemIdInItems = <RoomItemId extends string = string>(
  items: Partial<Record<RoomItemId, unknown>>,
  baseName: string,
): RoomItemId => {
  for (let i = 0; ; i++) {
    const itemId = (i === 0 ? baseName : `${baseName}${i}`) as RoomItemId;
    if (items[itemId] === undefined) {
      return itemId;
    }
  }
};
