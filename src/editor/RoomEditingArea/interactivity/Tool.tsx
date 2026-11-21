import type { NowhereRoomId } from "../../../model/json/ItemConfigMap";
import type {
  JsonItemConfig,
  JsonItemType,
} from "../../../model/json/JsonItem";
import type { EditorRoomId, EditorRoomItemId } from "../../editorTypes";

export type EditorToolRoomId = "+" | EditorRoomId | NowhereRoomId;

/**
 * If using the tool with type: 'item', describes the item to be placed
 */
export type ItemTool<
  T extends JsonItemType = JsonItemType,
  Config extends JsonItemConfig<T, EditorToolRoomId, EditorRoomItemId> =
    JsonItemConfig<T, EditorToolRoomId, EditorRoomItemId>,
> = {
  type: T;
  config: Config;
};

export type Tool =
  | { type: "eyeDropper" }
  | { type: "item"; item: ItemTool }
  | { type: "pointer" };
