import type { Tagged } from "type-fest";
import type { RoomRenderer } from "../game/render/roomRenderer";
import type { JsonItemUnion } from "../model/json/JsonItem";
import type { RoomJson } from "../model/RoomJson";

export type EditorRoomId = Tagged<string, "EditorRoomId">;
export type EditorRoomItemId = Tagged<string, "EditorRoomItemId">;
export type EditorRoomJson = RoomJson<EditorRoomId, EditorRoomItemId>;
export type EditorRoomItem = JsonItemUnion<EditorRoomId, EditorRoomItemId>;
export type EditorRoomRenderer = RoomRenderer<EditorRoomId, EditorRoomItemId>;
