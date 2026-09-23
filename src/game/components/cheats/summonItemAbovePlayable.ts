import {
  type JsonItemConfig,
  type JsonItemType,
} from "../../../model/json/JsonItem";
import { type GameApi } from "../../GameApi";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";
import { selectCurrentPlayableItem } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { addItemFromJsonToRoom } from "../../gameState/mutators/addItemToRoom";
import { blockSizePx } from "../../physics/mechanicsConstants";

let summonedItemNumber = 0;

/** adds a new item to the current room, just above the current playable */
export const summonItemAbovePlayable = <
  T extends JsonItemType,
  RoomId extends string,
>(
  gameApi: GameApi<RoomId>,
  itemType: T,
  config: JsonItemConfig<T, RoomId>,
) => {
  const { gameState } = gameApi;
  const playable = selectCurrentPlayableItem(gameState);
  if (playable === undefined) {
    // probably can't click this button when there is no playable (game over)
    // but protect anyway
    return;
  }
  const room = selectCurrentRoomState(gameState);
  if (room === undefined) {
    return;
  }
  addItemFromJsonToRoom({
    gameState,
    room,
    itemType,
    config,
    // locate the item above the player
    position: {
      ...playable.state.box,
      z: playable.state.box.z + blockSizePx.z * 2,
    },
    additionalIdPart: `${summonedItemNumber++}`,
  });
};
