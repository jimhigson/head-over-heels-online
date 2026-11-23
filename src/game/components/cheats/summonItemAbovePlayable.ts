import type {
  JsonItemConfig,
  JsonItemType,
} from "../../../model/json/JsonItem";
import { addXyz, originXyz, type Xyz } from "../../../utils/vectors/vectors";
import type { GameApi } from "../../GameApi";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";
import { selectCurrentPlayableItem } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { addItemFromJsonToRoom } from "../../gameState/mutators/addItemFromJsonToRoom";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { blockXyzToFineXyz } from "../../render/projections";

let summonedItemNumber = 0;

/** adds a new item to the current room, just above the current playable */
export const summonItemAbovePlayable = <
  T extends JsonItemType,
  RoomId extends string,
>(
  gameApi: GameApi<RoomId>,
  itemType: T,
  config: JsonItemConfig<T, RoomId>,
  /**
   * where the item goes, in blocks, from the spot above the playable
   */
  offsetInBlocks: Xyz = originXyz,
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
    room,
    itemType,
    config,
    // locate the item above the player
    position: addXyz(
      playable.state.box,
      { z: blockSizePx.z * 2 },
      blockXyzToFineXyz(offsetInBlocks),
    ),
    additionalIdPart: `${summonedItemNumber++}`,
  });
};
