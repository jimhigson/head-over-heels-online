import type { ReactNode } from "react";
import type { spritesheetPalette } from "gfx/spritesheetPalette";
import { inputPresetMenu } from "./menus/inputPresetMenu";
import { mainMenu } from "./menus/mainMenu";
import { modernisationOptionsMenu } from "./menus/modernisationOptionsMenu";
import { selectKeysMenu } from "./menus/selectKeysMenu";
import type { MenuItem } from "./MenuItem";

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
  hintColour?: keyof typeof spritesheetPalette;
};
export const menus: Record<MenuId, Menu> = {
  mainMenu,
  selectKeys: selectKeysMenu,
  modernisationOptions: modernisationOptionsMenu,
  inputPreset: inputPresetMenu,
};
