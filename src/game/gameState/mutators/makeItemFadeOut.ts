import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";
import type { GameState } from "../GameState";

import { itemInPlayCentre } from "../../../model/itemInPlayCentre";
import { originXyz, scaleXyz, subXyz } from "../../../utils/vectors/vectors";
import { fadeInOrOutDuration } from "../../render/animationTimings";
import { addItemFromJsonToRoom } from "./addItemToRoom";
import { deleteItemFromRoom } from "./deleteItemFromRoom";

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
        : touchedItem.type === "hushPuppy" ? { type: "hushPuppy" }
        : { type: "disappearing" },
    },
    // give any placeholder position:
    position: originXyz,
    room,
    gameState,
  });

  // reposition the bubbles to be centered on the deleted item:
  const deletedItemCentre = itemInPlayCentre(touchedItem);
  bubblesItem.state.position = subXyz(
    deletedItemCentre,
    scaleXyz(bubblesItem.aabb, 0.5),
  );

  // remove bubbles after a time:
  bubblesItem.state.expires = room.roomTime + fadeInOrOutDuration;
};
