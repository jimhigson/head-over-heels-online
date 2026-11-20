import { type SetNonNullable } from "type-fest";

import { type EditorRoomItemId } from "../editorTypes";
import { type WhichEditorGhostOfAnyItemType } from "../WhichEditorGhostOf";

/**
 * one thing selected in an open room: a json item, or one of its editor ghosts
 */
export type SelectionEntry = {
  jsonItemId: EditorRoomItemId;
  /**
   * undefined when the real item is selected (most of the time) but if defined,
   * one of the item's editor ghosts is selected
   */
  whichEditorGhost: undefined | WhichEditorGhostOfAnyItemType;
};

/**
 * a selection entry for one of a json item's editor ghosts
 */
export type EditorGhostSelectionEntry = SetNonNullable<
  SelectionEntry,
  "whichEditorGhost"
>;
