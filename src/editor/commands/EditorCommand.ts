import { type ComponentChildren, type VNode } from "preact";

import { type TextureTailwindClass } from "../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { type EditorRootState, type EditorThunk } from "../../store/store";
import { type ShortcutKeys } from "../../ui/useKeyboardShortcut";
import { type ItemTool } from "../RoomEditingArea/interactivity/Tool";
import { type EditorSaveSliceAction } from "../slice/editorSaveSlice";
import { type LevelEditorSliceAction } from "../slice/levelEditorSlice";

/** what running a command dispatches */
export type EditorCommandDispatchable =
  EditorSaveSliceAction | EditorThunk<unknown> | LevelEditorSliceAction;

/** how a command shows in the toolbar and menus, and when it can run */
type EditorCommandPresentation = {
  /** names the command in menus, and its toolbar button for assistive tech */
  label: string;
  /** other words cmd-k finds the command by, beyond its label */
  synonyms?: string[];
  /** the toolbar button's content */
  icon?: ComponentChildren;
  /** shown before the label in menus */
  menuIcon?: TextureTailwindClass | VNode;
  shortcutKeys?: ShortcutKeys;
  tooltipContent?: ComponentChildren;
  /** for the toolbar button, eg its colour */
  toolbarClass?: string;
  /** shown as the current tool, or as a ticked menu item */
  selectIsActive?: (state: EditorRootState) => boolean;
  /**
   * false greys the command out (context menus leave it out) and its shortcut
   * does nothing
   */
  selectIsAvailable?: (state: EditorRootState) => boolean;
};

/** picks an item tool, to place that item in the editor (or summon it for in-game cheats) */
export type ItemToolCommand = EditorCommandPresentation & {
  type: "itemTool";
  /**
   * itemTool actions describe the item instead of providing an action method,
   * this allows the in-game cheats to inspect and use these actions in the cheats cmd-k menu
   * to summon items.
   */
  itemTool: ItemTool;
};

export type ActionCommand = EditorCommandPresentation & {
  type: "action";
  action: () => EditorCommandDispatchable;
};

/** chooses between values, shown as a switch */
export type SettingCommand<TValue extends string> = {
  type: "setting";
  label: string;
  /** in the order the switch cycles them */
  values: readonly TValue[];
  valueLabels?: readonly string[];
  value: TValue;
  action: (value: TValue) => EditorCommandDispatchable;
};

/** a command for the toolbar, menus and keyboard */
export type EditorCommand = ActionCommand | ItemToolCommand;

/** a command, or one that depends on the editor's state */
export type EditorCommandDefinition<
  TCommand extends EditorCommand = EditorCommand,
> = ((state: EditorRootState) => TCommand) | TCommand;

export const resolveCommandDefinition = <TCommand extends EditorCommand>(
  commandDefinition: EditorCommandDefinition<TCommand>,
  state: EditorRootState,
): TCommand =>
  typeof commandDefinition === "function" ?
    commandDefinition(state)
  : commandDefinition;
