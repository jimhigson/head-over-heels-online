import type { Action } from "@/game/input/InputState";
import type { FunctionComponent, ReactNode } from "react";
import type { spritesheetPalette } from "gfx/spritesheetPalette";
import type { KeyAssignmentPreset } from "@/game/input/keyAssignmentPresets";
import { inputPreset } from "./menus/inputPreset";
import { mainMenu } from "./menus/mainMenu";
import { modernisationOptions } from "./menus/modernisationOptions";
import { selectKeys } from "./menus/selectKeys";

export type MenuId =
  | "mainMenu"
  | "selectKeys"
  | "inputPreset"
  | "modernisationOptions";

export type Menu = {
  heading: ReactNode;
  footer?: ReactNode;
  items: MenuItem[];
  background: keyof typeof spritesheetPalette;
  itemColour: keyof typeof spritesheetPalette;
  selectedColour: keyof typeof spritesheetPalette;
};
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
  | { type: "switch" }
  | { type: "key"; action: Action }
  | { type: "keyPreset"; preset: KeyAssignmentPreset }
  | { type: "todo" }
);

export const menus: Record<MenuId, Menu> = {
  mainMenu,
  selectKeys,
  modernisationOptions,
  inputPreset,
};
