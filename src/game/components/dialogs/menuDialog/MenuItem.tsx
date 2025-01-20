import type { FunctionComponent } from "react";
import type { MenuId } from "./menus";
import type { GameMenusSliceAction } from "../../../../store/gameMenusSlice";
import type { RootState } from "../../../../store/store";
import type { KeyAssignmentPreset } from "../../../input/keyAssignmentPresets";
import type { Action } from "../../../input/InputState";

export type MenuItem = {
  label: string | FunctionComponent<{ selected: boolean }>;
  disableDoubling?: boolean;
  hint?: string;
} & (
  | {
      type: "submenu";
      submenu: MenuId;
    }
  | { type: "toGame" }
  | {
      type: "switch";
      selector?: (store: RootState) => boolean;
      dispatch?: GameMenusSliceAction;
    }
  | { type: "key"; action: Action }
  | { type: "keyPreset"; preset: KeyAssignmentPreset }
  | { type: "back" }
  | { type: "todo" }
);
