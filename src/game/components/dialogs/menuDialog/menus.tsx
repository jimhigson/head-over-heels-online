import type { ReactElement } from "react";
import { inputPresetMenu } from "./menus/inputPresetMenu";
import { mainMenu } from "./menus/mainMenu";
import { modernisationOptionsMenu } from "./menus/modernisationOptionsMenu";
import { selectKeysMenu } from "./menus/selectKeysMenu";
import { readTheManualMenu } from "./menus/readTheManualMenu";
import { type MarkdownPageName } from "../../../../manual/pages";
import type { MenuItem } from "./MenuItem";
import { holdMenu } from "./menus/holdMenu";
import { markdownMenus } from "./markdownMenus";

export type MenuId =
  | "mainMenu"
  | "selectKeys"
  | "inputPreset"
  | "modernisationOptions"
  | "readTheManual"
  | "hold"
  | `markdown/${MarkdownPageName}`;

export type Menu = {
  Content: () => ReactElement;
  items: MenuItem[];
  dialogClassName: string;
  borderClassName?: string;
};
export const menus: Record<MenuId, Menu> = {
  ...{
    mainMenu,
    selectKeys: selectKeysMenu,
    modernisationOptions: modernisationOptionsMenu,
    inputPreset: inputPresetMenu,
    readTheManual: readTheManualMenu,
    hold: holdMenu,
  },
  ...markdownMenus,
};
