import type { ReactElement } from "react";
import { inputPresetMenu } from "./menus/inputPresetMenu";
import { mainMenu } from "./menus/mainMenu";
import { modernisationOptionsMenu } from "./menus/modernisationOptionsMenu";
import { selectKeysMenu } from "./menus/selectKeysMenu";
import { readTheManualMenu } from "./menus/readTheManualMenu";
import type { MenuItem } from "./MenuItem";
import { holdMenu } from "./menus/holdMenu";
import { markdownMenus } from "./markdownMenus";
import { crownsMenu } from "./menus/crownsMenu";

export type Menu = {
  Content: () => ReactElement;
  items: MenuItem[];
  dialogClassName?: string;
  borderClassName?: string;
};
export const menus = {
  ...{
    mainMenu,
    selectKeys: selectKeysMenu,
    modernisationOptions: modernisationOptionsMenu,
    inputPreset: inputPresetMenu,
    readTheManual: readTheManualMenu,
    hold: holdMenu,
    crowns: crownsMenu,
  },
  ...markdownMenus,
} as const;

export type MenuId = keyof typeof menus;
