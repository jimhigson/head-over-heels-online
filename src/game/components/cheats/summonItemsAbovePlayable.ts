import type { ItemToolItems } from "../../../editor/RoomEditingArea/interactivity/Tool";
import type {
  JsonItemConfig,
  JsonItemType,
} from "../../../model/json/JsonItem";
import { originXyz } from "../../../utils/vectors/vectors";
import type { GameApi } from "../../GameApi";
import { summonItemAbovePlayable } from "./summonItemAbovePlayable";

/**
 * adds the item tool's items to the current room, above the current playable,
 * each at its own position from the others
 */
export const summonItemsAbovePlayable = <RoomId extends string>(
  gameApi: GameApi<RoomId>,
  items: ItemToolItems,
) => {
  for (const { type, config, position = originXyz } of items) {
    summonItemAbovePlayable(
      gameApi,
      type,
      // editor tool room ids are not this campaign's room ids:
      config as JsonItemConfig<JsonItemType, RoomId>,
      position,
    );
  }
};
