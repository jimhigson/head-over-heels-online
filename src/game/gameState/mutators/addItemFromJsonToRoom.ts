import type {
  JsonItem,
  JsonItemConfig,
  JsonItemType,
  JsonItemUnion,
} from "../../../model/json/JsonItem";
import { roomJsonItemsIterable } from "../../../model/RoomJsonItemIterators";
import type { RoomState } from "../../../model/RoomState";
import { selectRoomPickupsCollected } from "../../../store/slices/gameMenus/gameMenusSelectors";
import { store } from "../../../store/store";
import { originXyz, type Xyz } from "../../../utils/vectors/vectors";
import { buildRoomJsonDirectionalIndex } from "../loadRoom/buildRoomJsonDirectionalIndex";
import { loadItemFromJson } from "../loadRoom/loadItemFromJson";
import { addItemToRoom } from "./addItemToRoom";

export const addItemFromJsonToRoom = <
  T extends JsonItemType,
  RoomId extends string,
  RoomItemId extends string,
>({
  room,
  itemType,
  config,
  position,
  additionalIdPart,
}: {
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

  const itemId = `${itemType}/${additionalIdPart}` as RoomItemId;
  const [item] = loadItemFromJson(
    itemId,
    itemJson as JsonItemUnion<RoomId, RoomItemId>,
    room.roomJson,
    store.getState().gameInPlay.gameInPlay.planetsLiberated,
    buildRoomJsonDirectionalIndex(roomJsonItemsIterable(room.roomJson)),
    selectRoomPickupsCollected(store.getState(), room.id),
  );
  if (item === undefined) {
    console.error("failed to generate any items for json", itemId, itemJson);
    throw new Error("failed to generate any items");
  }

  addItemToRoom({ room, item, atPosition: position });
  return item;
};
