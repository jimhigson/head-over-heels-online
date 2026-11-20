/**
 * the editor ghosts each type of item has, by which of the item's editor ghosts each
 * is - each can be selected by itself, apart from its item
 */
type EditorGhostsOfItemType = {
  lift: "liftBottom" | "liftTop";
  emitter: "emittedItem";
};

export type ItemTypeWithEditorGhosts = keyof EditorGhostsOfItemType;

/**
 * which of the editor ghosts of an item of type `T` an editor ghost is
 */
export type WhichEditorGhostOf<T extends ItemTypeWithEditorGhosts> =
  EditorGhostsOfItemType[T];

/**
 * which of an item's editor ghosts an editor ghost is, for an item of any type - only
 * for keeping and comparing: acting on it needs the item, to scope it to the
 * item's type
 */
export type WhichEditorGhostOfAnyItemType =
  WhichEditorGhostOf<ItemTypeWithEditorGhosts>;
