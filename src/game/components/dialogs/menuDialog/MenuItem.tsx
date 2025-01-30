import type { FunctionComponent } from "react";
import type { MenuId } from "./menus";
import type {
  GameMenusSliceAction,
  GameMenusState,
} from "../../../../store/gameMenusSlice";
import type { KeyAssignmentPresetName } from "../../../input/keyAssignmentPresets";
import type { BooleanAction } from "../../../input/InputState";

export type ValueComponent = FunctionComponent<{
  className?: string;
  selected: boolean;
}>;

export type MenuItem = {
  label: string | FunctionComponent<{ selected: boolean; menuItem: MenuItem }>;
  disableDoubling?: boolean;
  /* test for if this menu item should be shown */
  showIf?: (state: GameMenusState) => boolean;
  hint?: string;
  /** select from the store - a value to display on the menuitem */
  //selectValue?: (store: GameMenusState) => string | boolean | number;
  /** used to render the value selected by selectValue. If not given, is just text */
  ValueComponent?: ValueComponent;
  className?: string;
} & (
  | {
      type: "submenu";
      submenu: MenuId;
    }
  | { type: "toGame" }
  | { type: "dispatch"; dispatch: () => GameMenusSliceAction }
  | {
      type: "switch";
      selectValue?: (store: GameMenusState) => boolean;
      dispatch?: () => GameMenusSliceAction;
    }
  | { type: "key"; action: BooleanAction }
  | { type: "keyPreset"; preset: KeyAssignmentPresetName }
  | { type: "back" }
  | { type: "todo" }
);
