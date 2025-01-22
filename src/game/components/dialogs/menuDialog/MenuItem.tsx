import type { FunctionComponent } from "react";
import type { MenuId } from "./menus";
import type {
  GameMenusSliceAction,
  GameMenusState,
} from "../../../../store/gameMenusSlice";
import type { KeyAssignmentPreset } from "../../../input/keyAssignmentPresets";
import type { Action } from "../../../input/InputState";

export type MenuItem = {
  label: string | FunctionComponent<{ selected: boolean; menuItem: MenuItem }>;
  disableDoubling?: boolean;
  /* test for if this menu item should be shown */
  showIf?: (state: GameMenusState) => boolean;
  hint?: string;
  className?: string;
} & (
  | {
      type: "submenu";
      submenu: MenuId;
    }
  | { type: "toGame" }
  | { type: "dispatch"; dispatch: GameMenusSliceAction }
  | {
      type: "switch";
      selector?: (store: GameMenusState) => boolean;
      dispatch?: GameMenusSliceAction;
    }
  | { type: "key"; action: Action }
  | { type: "keyPreset"; preset: KeyAssignmentPreset }
  | { type: "back" }
  | { type: "todo" }
);
