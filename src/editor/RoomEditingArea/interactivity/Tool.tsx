import {
  type JsonItemConfig,
  type JsonItemType,
} from "../../../model/json/JsonItem";
import { type EditorRoomId, type EditorRoomItemId } from "../../editorTypes";

export type EditorToolRoomId = "+" | "nowhere" | EditorRoomId;

/**
 * If using the tool with type: 'item', describes the item to be placed
 */
export type ItemTool<
  T extends JsonItemType = JsonItemType,
  Config extends JsonItemConfig<
    T,
    EditorToolRoomId,
    EditorRoomItemId
  > = JsonItemConfig<T, EditorToolRoomId, EditorRoomItemId>,
> = {
  type: T;
  config: Config;
};

export type Tool =
  | { type: "eyeDropper" }
  | { type: "item"; item: ItemTool }
  | { type: "pointer" };
