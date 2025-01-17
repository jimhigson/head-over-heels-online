import type { ReactNode } from "react";
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
  backgroundClassName: string;
  itemClassName: string;
  selectedClassName: string;
  hintClassName?: string;
};
export const menus: Record<MenuId, Menu> = {
  mainMenu,
  selectKeys: selectKeysMenu,
  modernisationOptions: modernisationOptionsMenu,
  inputPreset: inputPresetMenu,
};
