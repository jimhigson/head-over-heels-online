/**
 * Finds the next unused id of the form `<baseName>`, `<baseName>1`,
 * `<baseName>2`, … — matches the scheme used by `keyItems` for auto-converted
 * rooms so ids look consistent across both sources.
 */
export const nextItemId = <RoomItemId extends string = string>(
  existingIds: Iterable<RoomItemId>,
  baseName: string,
): RoomItemId => {
  return nextItemIdSet(new Set(existingIds), baseName);
};

export const nextItemIdSet = <RoomItemId extends string = string>(
  existing: Set<RoomItemId>,
  baseName: string,
): RoomItemId => {
  // eslint-disable-next-line no-constant-condition -- while(true) is ok; this will terminate
  for (let i = 0; true; i++) {
    const itemId = (i === 0 ? baseName : `${baseName}${i}`) as RoomItemId;
    if (!existing.has(itemId)) {
      return itemId;
    }
  }
};
