import type { AnyItemInPlay } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import { deleteItemFromRoomInPlay } from "./deleteItemFromRoomInPlay";
import type { RoomState } from "@/model/modelTypes";
import type { GameState } from "../GameState";
import { fadeInOrOutDuration } from "@/game/render/animationTimings";
import { addItemToRoomInPlay } from "./addItemToRoomInPlay";

/**
 * remove an item (with bubbles)
 */
export const makeItemFadeOut = <RoomId extends string>({
  touchedItem,
  room,
  gameState,
}: {
  touchedItem: AnyItemInPlay<RoomId>;
  room: RoomState<PlanetName, RoomId>;
  gameState: GameState<RoomId>;
}) => {
  deleteItemFromRoomInPlay({ room, item: touchedItem });

  const bubblesItem = addItemToRoomInPlay({
    itemType: "bubbles",
    config: { style: "white" },
    position: touchedItem.state.position,
    room,
    gameState,
  });

  // remove bubbles after a time:
  bubblesItem.state.expires = gameState.gameTime + fadeInOrOutDuration;
};
