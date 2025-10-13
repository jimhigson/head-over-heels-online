import { first } from "iter-tools-es";

import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type {
  JsonItem,
  JsonItemConfig,
  JsonItemType,
  JsonItemUnion,
} from "../../../model/json/JsonItem";
import type { Xyz } from "../../../utils/vectors/vectors";
import type { GameState } from "../GameState";

import { roomSpatialIndexKey } from "../../../model/RoomState";
import { type RoomState } from "../../../model/RoomState";
import { emptyObject } from "../../../utils/empty";
import { originXyz } from "../../../utils/vectors/vectors";
import { loadItemFromJson } from "../loadRoom/loadItemFromJson";

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
  additionalIdPart,
}: {
  gameState: GameState<RoomId>;
  room: RoomState<RoomId, RoomItemId>;
  itemType: T;
  config: JsonItemConfig<T, RoomId, RoomItemId>;
  /**
   * the (fine, in-play) position for the new object to occupy
   */
  position: Xyz;
  additionalIdPart: string;
}) => {
  const itemJson: JsonItem<T, RoomId, RoomItemId> = {
    type: itemType,
    config,
    position: originXyz,
  };

  const itemId = `${itemType}/${additionalIdPart}`;
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

  addItemToRoom({ room, item, atPosition: position });
  return item;
};

export const addItemToRoom = <
  RoomId extends string,
  RoomItemId extends string,
>({
  room,
  item,
  atPosition,
}: {
  room: RoomState<RoomId, RoomItemId>;
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
  /**
   * optional extra argument, since items are often added while stating their position.
   * if not given, the position already in the item will be used. If given, the item's position
   * will be updated immediately before being added
   */
  atPosition?: Xyz;
}) => {
  room.items[item.id] = item;

  if (atPosition !== undefined) {
    item.state.position = atPosition;
  }

  const spatialIndex = room[roomSpatialIndexKey];
  spatialIndex.addItem(item);

  return item;
};
