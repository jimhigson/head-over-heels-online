import type { Tagged } from "type-fest";
import type { RoomRenderer } from "../game/render/roomRenderer";
import type { JsonItemUnion } from "../model/json/JsonItem";
import type { RoomJsonItems, RoomJson } from "../model/RoomJson";
import type { RoomState } from "../model/RoomState";
import type {
  ItemInPlay,
  UnionOfAllItemInPlayTypes,
} from "../model/ItemInPlay";

export type EditorRoomId = Tagged<string, "EditorRoomId">;
export type EditorRoomItemId<ItemId extends string = string> = Tagged<
  ItemId,
  "EditorRoomItemId"
>;
export type EditorCursorRoomItemId = EditorRoomItemId<"cursor">;
/** cursorId is a well-known id inside the editor */
export const cursorId = "cursor" as EditorCursorRoomItemId;
export type EditorRoomState = RoomState<EditorRoomId, EditorRoomItemId>;
export type EditorRoomJson = RoomJson<EditorRoomId, EditorRoomItemId>;
export type EditorRoomJsonItems = RoomJsonItems<EditorRoomItemId, EditorRoomId>;
export type EditorRoomJsonItem = JsonItemUnion<EditorRoomId, EditorRoomItemId>;
export type EditorRoomRenderer = RoomRenderer<EditorRoomId, EditorRoomItemId>;
export type EditorUnionOfAllItemInPlayTypes = UnionOfAllItemInPlayTypes<
  EditorRoomId,
  EditorRoomItemId
>;
export type LevelEditorCursorItem = ItemInPlay<
  "cursor",
  EditorRoomId,
  EditorRoomItemId
>;
