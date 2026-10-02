import { type Tagged } from "type-fest";

import { type ItemTypeUnion } from "../_generated/types/ItemInPlayUnion";
import { type RoomRenderer } from "../game/render/room/RoomRenderer";
import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../model/ItemInPlay";
import {
  type JsonItem,
  type JsonItemType,
  type JsonItemUnion,
} from "../model/json/JsonItem";
import {
  type Campaign,
  type OptionallyNamedCampaign,
} from "../model/modelTypes";
import { type RoomJson, type RoomJsonItems } from "../model/RoomJson";
import { type RoomState, type RoomStateItems } from "../model/RoomState";

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

export type EditorRoomState = RoomState<EditorRoomId, EditorRoomItemId> & {
  /**
   * Extra field on room state that is editor-only - records the items that have been replaced
   * by preview items.
   *
   * The normal .items in the editor contains previewed edits, which is what the room renderer
   * will see, this provides the extra data to the editor of which is really 'real'
   */
  itemsOverriddenByPreview: EditorRoomStateItems;
};
export type EditorRoomStateItems = RoomStateItems<
  EditorRoomId,
  EditorRoomItemId
>;
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
