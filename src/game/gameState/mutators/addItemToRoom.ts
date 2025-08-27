import { first } from "iter-tools";

import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type {
  JsonItem,
  JsonItemConfig,
  JsonItemType,
  JsonItemUnion,
} from "../../../model/json/JsonItem";
import type { RoomState } from "../../../model/RoomState";
import type { Xyz } from "../../../utils/vectors/vectors";
import type { GameState } from "../GameState";

import { emptyObject } from "../../../utils/empty";
import { originXyz } from "../../../utils/vectors/vectors";
import { loadItemFromJson } from "../loadRoom/loadItemFromJson";

let i = 0;

export const addItemFromJsonToRoom = <
  T extends JsonItemType,
  RoomId extends string,
  RoomItemId extends string,
>({
  gameState,
  room,
  itemType,
  config,
  position,
}: {
  gameState: GameState<RoomId>;
  room: RoomState<RoomId, RoomItemId>;
  itemType: T;
  config: JsonItemConfig<T, RoomId, RoomItemId>;
  /* the position for the new object to occupy */
  position: Xyz;
}) => {
  const itemJson: JsonItem<T, RoomId, RoomItemId> = {
    type: itemType,
    config,
    position: originXyz,
  };

  // this simple incrementing int isn't going to work for adding pickups, since they can be stored
  // as having been collected in the room and decline to generate from the json.
  // TODO: move next itemId onto gamestate/store and serialise with the saves
  const itemId = `${itemType}/${i++}`;
  const item = first(
    loadItemFromJson(
      itemId,
      itemJson as JsonItemUnion<RoomId>,
      room.roomJson,
      gameState.pickupsCollected[room.id] ?? emptyObject,
    ),
  );
  if (item === undefined) {
    console.error("failed to generate any items for json", itemId, itemJson);
    throw new Error("failed to generate any items");
  }
  item.state.position = position;

  addItemToRoom({ room, item });
  return item;
};

export const addItemToRoom = <
  RoomId extends string,
  RoomItemId extends string,
>({
  room,
  item,
}: {
  room: Pick<RoomState<RoomId, RoomItemId>, "items">;
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
}) => {
  room.items[item.id] = item;
  return item;
};
