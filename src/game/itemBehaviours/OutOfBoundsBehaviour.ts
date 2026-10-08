import { type ItemInPlay } from "../../model/ItemInPlay";
import { isPlayableItem } from "../../model/ItemInPlayNarrowedUnions";
import { deleteItemFromRoom } from "../gameState/mutators/deleteItemFromRoom";
import { playableResetAfterOutOfBounds } from "../gameState/mutators/playableLosesLife";
import { type ItemTouchEvent } from "../physics/handleTouch/ItemTouchEvent";
import { nonRenderingItemFixedZIndex } from "../render/sortZ/fixedZIndexes";
import { NonSolidBehaviour } from "./NonSolidBehaviour";

/**
 * if touched, the toucher is deleted out of the universe - it is detected as
 * out of bounds, eg falling below a room with no floor
 */
export class OutOfBoundsBehaviour extends NonSolidBehaviour {
  constructor() {
    super({
      fixedZIndex: nonRenderingItemFixedZIndex,
    });
  }

  /**
   * the moving item is always the one that fell out of the room
   */
  override onTouch<RoomId extends string, RoomItemId extends string>(
    outOfBoundsItem: ItemInPlay<"outOfBounds", RoomId, RoomItemId>,
    e: ItemTouchEvent<RoomId, RoomItemId>,
    isMover: boolean,
  ): void {
    if (isMover) {
      super.onTouch(outOfBoundsItem, e, isMover);
      return;
    }
    const { movingItem, gameState, room } = e;
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
  }
}
