import type { JsonItemConfig, JsonItemType } from "../model/json/JsonItem";
import type { EditorRoomId, EditorRoomItemId } from "./editorTypes";

export type ItemTool<
  T extends JsonItemType = JsonItemType,
  Config extends JsonItemConfig<
    T,
    EditorRoomId,
    EditorRoomItemId
  > = JsonItemConfig<T, EditorRoomId, EditorRoomItemId>,
> = {
  type: T;
  config: Config;
};

export type Tool =
  | { type: "eyeDropper" }
  | { type: "item"; item: ItemTool }
  | { type: "pointer" };
