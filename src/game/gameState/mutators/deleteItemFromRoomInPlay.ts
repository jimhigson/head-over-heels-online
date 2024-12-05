import type { AnyItemInPlay } from "@/model/ItemInPlay";
import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { loadItem } from "../loadRoom/loadItem";
import type {
  JsonItem,
  JsonItemConfig,
  JsonItemType,
  UnknownJsonItem,
} from "@/model/json/JsonItem";
import { originXyz } from "@/utils/vectors/vectors";
import type { GameState } from "../GameState";
import { first } from "iter-tools";

export const deleteItemFromRoomInPlay = <RoomId extends string>(
  room: RoomState<PlanetName, RoomId>,
  item: AnyItemInPlay,
) => {
  delete room.items[item.id];
  for (const s of item.state.stoodOnBy) {
    s.state.standingOn = null;
  }
};

let i = 0;

export const addItemsToRoomInPlay = <
  T extends JsonItemType,
  RoomId extends string,
>(
  gameState: GameState<RoomId>,
  room: RoomState<PlanetName, RoomId>,
  itemType: T,
  config: JsonItemConfig<T, PlanetName, RoomId>,
) => {
  const itemJson: JsonItem<T, PlanetName, RoomId> = {
    type: itemType,
    config,
    position: originXyz,
  };
  const itemId = `${itemType}/${i++}`;
  const item = first(
    loadItem(
      itemId,
      itemJson as UnknownJsonItem<RoomId>,
      gameState.pickupsCollected[room.id],
    ),
  );
  if (item === undefined) {
    throw new Error("failed to generate any items");
  }
  room.items[itemId] = item;
  return item;
};
