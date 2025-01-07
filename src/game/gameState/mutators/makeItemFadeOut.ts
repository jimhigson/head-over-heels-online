import type { AnyItemInPlay } from "@/model/ItemInPlay";
import type { SceneryName } from "@/sprites/planets";
import { deleteItemFromRoom } from "./deleteItemFromRoom";
import type { RoomState } from "@/model/modelTypes";
import type { GameState } from "../GameState";
import { fadeInOrOutDuration } from "@/game/render/animationTimings";
import { addItemFromJsonToRoom } from "./addItemToRoom";
import { addXyz, originXyz, scaleXyz, subXyz } from "@/utils/vectors/vectors";

/**
 * remove an item (with bubbles)
 */
export const makeItemFadeOut = <RoomId extends string>({
  touchedItem,
  room,
  gameState,
}: {
  touchedItem: AnyItemInPlay<RoomId>;
  room: RoomState<SceneryName, RoomId>;
  gameState: GameState<RoomId>;
}) => {
  deleteItemFromRoom({ room, item: touchedItem });

  const bubblesItem = addItemFromJsonToRoom({
    itemType: "bubbles",
    config: { style: "white" },
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
