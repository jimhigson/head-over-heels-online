import { deleteItemFromRoom } from "./deleteItemFromRoom";
import type { GameState } from "../GameState";
import { addItemFromJsonToRoom } from "./addItemToRoom";
import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import {
  originXyz,
  addXyz,
  scaleXyz,
  subXyz,
} from "../../../utils/vectors/vectors";
import { fadeInOrOutDuration } from "../../render/animationTimings";
import type { RoomState } from "../../../model/RoomState";

/**
 * remove an item (with bubbles)
 */
export const makeItemFadeOut = <
  RoomId extends string,
  RoomItemId extends string,
>({
  touchedItem,
  room,
  gameState,
}: {
  touchedItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
  room: RoomState<RoomId, RoomItemId>;
  gameState: GameState<RoomId>;
}) => {
  deleteItemFromRoom({ room, item: touchedItem });

  const bubblesItem = addItemFromJsonToRoom({
    itemType: "bubbles",
    config: {
      style: "white",
      was:
        touchedItem.type === "pickup" ?
          { type: "pickup", gives: touchedItem.config.gives }
        : { type: "disappearing" },
    },
    // give any placeholder position:
    position: originXyz,
    room,
    gameState,
  });

  // reposition the bubbles to be centered on the deleted item:
  const deletedItemCentre = addXyz(
    touchedItem.state.position,
    scaleXyz(touchedItem.aabb, 0.5),
  );
  bubblesItem.state.position = subXyz(
    deletedItemCentre,
    scaleXyz(bubblesItem.aabb, 0.5),
  );

  // remove bubbles after a time:
  bubblesItem.state.expires = room.roomTime + fadeInOrOutDuration;
};
