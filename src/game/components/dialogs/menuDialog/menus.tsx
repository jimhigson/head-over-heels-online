import type { ReactElement, ReactNode } from "react";
import { inputPresetMenu } from "./menus/inputPresetMenu";
import { mainMenu } from "./menus/mainMenu";
import { modernisationOptionsMenu } from "./menus/modernisationOptionsMenu";
import { selectKeysMenu } from "./menus/selectKeysMenu";
import type { MenuItem } from "./MenuItem";
import type { EmptyObject } from "type-fest";

export type MenuId =
  | "mainMenu"
  | "selectKeys"
  | "inputPreset"
  | "modernisationOptions";

export type Menu = {
  heading: ReactNode;
  footer?: ReactElement | ((props: EmptyObject) => ReactElement | null);
  items: MenuItem[];
  backgroundClassName: string;
  itemsClassName: string;
  selectedClassName: string;
  hintClassName?: string;
  borderClassName: string;
};
export const menus: Record<MenuId, Menu> = {
  mainMenu,
  selectKeys: selectKeysMenu,
  modernisationOptions: modernisationOptionsMenu,
  inputPreset: inputPresetMenu,
};
