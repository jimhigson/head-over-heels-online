import type { NowhereRoomId } from "../../../model/json/ItemConfigMap";
import type {
  JsonItemConfig,
  JsonItemType,
} from "../../../model/json/JsonItem";
import type { WritableNonEmptyTuple } from "../../../utils/types/WritableNonEmptyTuple";
import type { Xyz } from "../../../utils/vectors/vectors";
import type { EditorRoomId, EditorRoomItemId } from "../../editorTypes";

export type EditorToolRoomId = "+" | EditorRoomId | NowhereRoomId;

/**
 * describes an item to be placed - the type and config, but not where
 */
export type ItemTool<
  T extends JsonItemType = JsonItemType,
  Config extends JsonItemConfig<T, EditorToolRoomId, EditorRoomItemId> =
    JsonItemConfig<T, EditorToolRoomId, EditorRoomItemId>,
> = {
  type: T;
  config: Config;
};

/**
 * one of the items the item tool puts down together
 */
export type ItemToolItem<
  T extends JsonItemType = JsonItemType,
  Config extends JsonItemConfig<T, EditorToolRoomId, EditorRoomItemId> =
    JsonItemConfig<T, EditorToolRoomId, EditorRoomItemId>,
> = ItemTool<T, Config> & {
  /**
   * where the item goes, in blocks, relative to where the tool puts its items
   * down. The origin if not given, as is usual for a tool with only the one
   * item
   */
  position?: Xyz;
};

/**
 * the items the item tool puts down in one go, where each goes relative to the
 * others
 */
export type ItemToolItems = WritableNonEmptyTuple<ItemToolItem>;

export type Tool =
  | { type: "eyeDropper" }
  | { type: "item"; items: ItemToolItems }
  | { type: "pointer" };
