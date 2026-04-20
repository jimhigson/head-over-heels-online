import type { ItemTouchEvent } from "./ItemTouchEvent";

import { deleteItemFromRoom } from "../../gameState/mutators/deleteItemFromRoom";
import { playableResetAfterOutOfBounds } from "../../gameState/mutators/playableLosesLife";
import { isPlayableItem } from "../itemPredicates";

/**
 * Handles an item falling into the out-of-bounds catcher below the room.
 * The moving item is always the one that fell; the touched item is always
 * the stationary outOfBounds item.
 */
export const handleItemTouchingOutOfBounds = <
  RoomId extends string,
  RoomItemId extends string,
>({
  movingItem,
  gameState,
  room,
}: ItemTouchEvent<RoomId, RoomItemId>) => {
  if (isPlayableItem(movingItem)) {
    console.warn(
      `an item of type ${movingItem.type} touched out of bounds and is being reset`,
    );
    playableResetAfterOutOfBounds(gameState, movingItem);
  } else {
    console.log(
      `an item of type ${movingItem.type} touched out of bounds and is being deleted`,
    );

    deleteItemFromRoom({ room, item: movingItem });
  }
};
