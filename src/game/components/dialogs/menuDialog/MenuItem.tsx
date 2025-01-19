import type { Action } from "@/game/input/InputState";
import type { KeyAssignmentPreset } from "@/game/input/keyAssignmentPresets";
import type { RootState } from "@/store/store";
import type { FunctionComponent } from "react";
import type { MenuId } from "./menus";
import type { GameMenusSliceAction } from "@/store/gameMenusSlice";

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
