import type { SetOptional, Simplify, Tagged } from "type-fest";
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
import type { Campaign, CampaignLocator } from "../model/modelTypes";

export type NamedEditorCampaign = Campaign<EditorRoomId>;

export type MaybeUnnamedCampaign<RoomId extends string> = Simplify<
  // make locator.campaignName optional in the editor - the user
  // might not have given a name yet
  Omit<Campaign<RoomId>, "locator"> & {
    locator: SetOptional<CampaignLocator, "campaignName">;
  }
>;

export type EditorCampaign = MaybeUnnamedCampaign<EditorRoomId>;

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
