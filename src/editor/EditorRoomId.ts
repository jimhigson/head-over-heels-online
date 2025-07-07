import type { Tagged } from "type-fest";
import type { RoomRenderer } from "../game/render/roomRenderer";
import type {
  JsonItem,
  JsonItemType,
  JsonItemUnion,
} from "../model/json/JsonItem";
import type { RoomJsonItems, RoomJson } from "../model/RoomJson";
import type { RoomState } from "../model/RoomState";
import type {
  ItemInPlayType,
  UnionOfAllItemInPlayTypes,
} from "../model/ItemInPlay";
import type { ItemTypeUnion } from "../_generated/types/ItemInPlayUnion";
import type { Campaign } from "../model/modelTypes";

export type EditorCampaign = Campaign<EditorRoomId>;

export type EditorRoomId = Tagged<string, "EditorRoomId">;
export type EditorRoomItemId<ItemId extends string = string> = Tagged<
  ItemId,
  "EditorRoomItemId"
>;

export type EditorRoomState = RoomState<EditorRoomId, EditorRoomItemId>;
export type EditorRoomJson = RoomJson<EditorRoomId, EditorRoomItemId>;
export type EditorRoomJsonItems = RoomJsonItems<EditorRoomItemId, EditorRoomId>;
export type EditorJsonItemUnion = JsonItemUnion<EditorRoomId, EditorRoomItemId>;
export type EditorJsonItem<T extends JsonItemType> = JsonItem<
  T,
  EditorRoomId,
  EditorRoomItemId
>;
export type EditorRoomRenderer = RoomRenderer<EditorRoomId, EditorRoomItemId>;
export type EditorItemInPlayUnion<T extends ItemInPlayType> = ItemTypeUnion<
  T,
  EditorRoomId,
  EditorRoomItemId
>;
export type EditorUnionOfAllItemInPlayTypes = UnionOfAllItemInPlayTypes<
  EditorRoomId,
  EditorRoomItemId
>;
