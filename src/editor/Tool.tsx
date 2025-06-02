import type { JsonItemType, JsonItemConfig } from "../model/json/JsonItem";
import type { EditorRoomId, EditorRoomItemId } from "./EditorRoomId";

export type ItemTool<T extends JsonItemType = JsonItemType> = {
  type: T;
  config: JsonItemConfig<T, EditorRoomId, EditorRoomItemId>;
};

export type Tool = { type: "item"; item: ItemTool } | { type: "pointer" };
