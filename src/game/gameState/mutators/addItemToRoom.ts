import { first } from "iter-tools";
import type { UnknownItemInPlay } from "../../../model/ItemInPlay";
import type {
  JsonItemType,
  JsonItemConfig,
  JsonItem,
  UnknownJsonItem,
} from "../../../model/json/JsonItem";
import type { RoomState } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import type { Xyz } from "../../../utils/vectors/vectors";
import { originXyz } from "../../../utils/vectors/vectors";
import type { GameState } from "../GameState";
import { loadItemFromJson } from "../loadRoom/loadItem";

let i = 0;

export const addItemFromJsonToRoom = <
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
  room: RoomState<SceneryName, RoomId>;
  itemType: T;
  config: JsonItemConfig<T, SceneryName, RoomId>;
  /* the position for the new object to occupy */
  position: Xyz;
}) => {
  const itemJson: JsonItem<T, SceneryName, RoomId> = {
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

  addItemToRoom({ room, item });
  return item;
};

export const addItemToRoom = <RoomId extends string>({
  room,
  item,
}: {
  room: RoomState<SceneryName, RoomId>;
  item: UnknownItemInPlay<RoomId>;
}) => {
  room.items[item.id] = item;
  return item;
};
