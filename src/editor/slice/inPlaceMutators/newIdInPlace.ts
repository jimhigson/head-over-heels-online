import { type LevelEditorState } from "../levelEditorSlice";

/**
 * the part of an id before its "-", naming what it identifies
 */
type IdPrefix<Id extends string> =
  Id extends `${infer Prefix}-${string}` ? Prefix : never;

/**
 * a new id for something in the editor's state (a tab, a pane, an open
 * room...), never used before: the prefix names what it is, and the number
 * comes from a counter shared by all of them
 */
export const newIdInPlace = <Id extends string>(
  state: LevelEditorState,
  prefix: IdPrefix<Id>,
): Id =>
  // an id of its kind, by its prefix:
  `${prefix}-${state.nextIdNumber++}` as Id;
