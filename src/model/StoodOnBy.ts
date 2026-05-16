/**
 * we don't use Set<RoomItemId> because this is not serialisable for
 * saving the game state to the redux store
 */

import { objectEmpty } from "../utils/objectEmpty";

export type StoodOnBy<RoomItemId extends string = string> = {
  [r in RoomItemId]: true;
};

/**
 * convenience to get how many items are standing on an item
 */
export const isStoodOn = (stoodOnBy: StoodOnBy) => {
  return !objectEmpty(stoodOnBy);
};
