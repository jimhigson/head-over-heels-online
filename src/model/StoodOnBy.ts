/**
 * we don't use Set<RoomItemId> because this is not serialisable for
 * saving the game state to the redux store
 */

import { objectKeys, size } from "iter-tools";

export type StoodOnBy<RoomItemId extends string = string> = {
  [r in RoomItemId]: true;
};

/**
 * convenience to get how many items are standing on an item
 */
export const stoodOnByCount = (stoodOnBy: StoodOnBy) => {
  return size(objectKeys(stoodOnBy));
};
