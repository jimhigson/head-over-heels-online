import type { ReactElement } from "react";
import { inputPresetMenu } from "./menus/inputPresetMenu";
import { mainMenu } from "./menus/mainMenu";
import { modernisationOptionsMenu } from "./menus/modernisationOptionsMenu";
import { selectKeysMenu } from "./menus/selectKeysMenu";
import { readTheManualMenu } from "./menus/readTheManualMenu";
import { markdownPages, type MarkdownPageName } from "../../../../manual/pages";
import type { MenuItem } from "./MenuItem";
import { transformObject } from "../../../../utils/entries";
import { MenuMarkdown } from "./MenuMarkdown";
import { PressToContinueBanner } from "../PressToContinueBanner";
import { holdMenu } from "./menus/holdMenu";

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
  ...transformObject(
    markdownPages,
    ([pageName, markdown]): [`markdown/${MarkdownPageName}`, Menu] => {
      return [
        `markdown/${pageName}`,
        {
          dialogClassName: "bg-highlightBeige",
          borderClassName: "bg-midGrey",
          items: [],
          Content() {
            return (
              <>
                <MenuMarkdown
                  markdown={markdown}
                  className="text-shadow overflow-y-hidden pb-2"
                />
                <PressToContinueBanner
                  action="menu"
                  className="absolute bg-lightBeige inset-x-0 bottom-0 h-min p-1"
                  keyClassName="text-midRed"
                />
              </>
            );
          },
        },
      ];
    },
  ),
};
