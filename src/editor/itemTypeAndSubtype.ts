import { type EditorJsonItemUnion } from "./editorTypes";

/**
 * an item's type, with the config value that sets it apart from others of its
 * type, eg a block's style or a monster's which; undefined for types without
 * one
 */
export const itemTypeAndMaybeSubtype = (item: EditorJsonItemUnion) => {
  switch (item.type) {
    case "block":
      return { itemType: item.type, subtype: item.config.style };
    case "deadlyBlock":
      return { itemType: item.type, subtype: item.config.style };
    case "portableBlock":
      return { itemType: item.type, subtype: item.config.style };
    case "slidingBlock":
      return { itemType: item.type, subtype: item.config.style };
    case "monster":
      return { itemType: item.type, subtype: item.config.which };
    case "player":
      return { itemType: item.type, subtype: item.config.which };
    case "pickup":
      return { itemType: item.type, subtype: item.config.gives };
    case "conveyor":
      return { itemType: item.type, subtype: item.config.direction };
    case "barrier":
      return { itemType: item.type, subtype: item.config.axis };
    default:
      return { itemType: item.type, subtype: undefined };
  }
};

/**
 * an item type that has subtypes, with one of its own subtypes
 */
export type ItemTypeAndSubtype = Exclude<
  ReturnType<typeof itemTypeAndMaybeSubtype>,
  { subtype: undefined }
>;

export type ItemTypeWithSubtypes = ItemTypeAndSubtype["itemType"];

export type SubtypeOfItemType<T extends ItemTypeWithSubtypes> = Extract<
  ItemTypeAndSubtype,
  { itemType: T }
>["subtype"];

export type ItemSubtype = ItemTypeAndSubtype["subtype"];
