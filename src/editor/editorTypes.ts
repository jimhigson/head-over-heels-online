import type { Tagged } from "type-fest";

import type { ItemTypeUnion } from "../_generated/types/ItemInPlayUnion";
import type { RoomRenderer } from "../game/render/room/RoomRenderer";
import type {
  ItemInPlay,
  ItemInPlayType,
  UnionOfAllItemInPlayTypes,
} from "../model/ItemInPlay";
import type {
  JsonItem,
  JsonItemType,
  JsonItemUnion,
} from "../model/json/JsonItem";
import type { Campaign, OptionallyNamedCampaign } from "../model/modelTypes";
import type { RoomJson, RoomJsonItems } from "../model/RoomJson";
import type { RoomState } from "../model/RoomState";

export type NamedEditorCampaign = Campaign<EditorRoomId>;

export type EditorCampaign = OptionallyNamedCampaign<EditorRoomId>;

export const campaignIsNamed = (
  campaign: EditorCampaign,
): campaign is NamedEditorCampaign =>
  campaign.locator.campaignName !== undefined;

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
export type EditorItemInPlay<T extends ItemInPlayType> = ItemInPlay<
  T,
  EditorRoomId,
  EditorRoomItemId
>;
export type EditorItemInPlayUnion<T extends ItemInPlayType> = ItemTypeUnion<
  T,
  EditorRoomId,
  EditorRoomItemId
>;
export type EditorUnionOfAllItemInPlayTypes = UnionOfAllItemInPlayTypes<
  EditorRoomId,
  EditorRoomItemId
>;
export type EditorJsonItemWithTimes = Extract<
  EditorJsonItemUnion,
  { config: { times?: unknown } }
>;
