import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { loadItemFromJson } from "../loadRoom/loadItem";
import type {
  JsonItem,
  JsonItemConfig,
  JsonItemType,
  UnknownJsonItem,
} from "@/model/json/JsonItem";
import type { Xyz } from "@/utils/vectors/vectors";
import { originXyz } from "@/utils/vectors/vectors";
import type { GameState } from "../GameState";
import { first } from "iter-tools";

let i = 0;

export const addItemToRoomInPlay = <
  T extends JsonItemType,
  RoomId extends string,
>({
  gameState,
  room,
  itemType,
  config,
  position,
}: {
  gameState: GameState<RoomId>;
  room: RoomState<PlanetName, RoomId>;
  itemType: T;
  config: JsonItemConfig<T, PlanetName, RoomId>;
  /* the position for the new object to occupy */
  position: Xyz;
}) => {
  const itemJson: JsonItem<T, PlanetName, RoomId> = {
    type: itemType,
    config,
    position: originXyz,
  };
  const itemId = `${itemType}/${i++}`;
  const item = first(
    loadItemFromJson(
      itemId,
      itemJson as UnknownJsonItem<RoomId>,
      gameState.pickupsCollected[room.id],
    ),
  );
  if (item === undefined) {
    throw new Error("failed to generate any items");
  }
  item.state.position = position;
  room.items[itemId] = item;
  return item;
};
