import type { ReactElement } from "react";
import { inputPresetMenu } from "./menus/inputPresetMenu";
import { mainMenu } from "./menus/mainMenu";
import { modernisationOptionsMenu } from "./menus/modernisationOptionsMenu";
import { selectKeysMenu } from "./menus/selectKeysMenu";
import { readTheManualMenu } from "./menus/readTheManualMenu";
import { markdownPages, type MarkdownPageName } from "../../../../manual/pages";
import type { MenuItem } from "./MenuItem";
import { transformObject } from "../../../../utils/entries";
import { withProps } from "./withClassName";
import type { EmptyObject } from "type-fest";
import { MenuMarkdown } from "./MenuMarkdown";
import { PressToContinueBanner } from "../PressToContinueBanner";

export type MenuId =
  | "mainMenu"
  | "selectKeys"
  | "inputPreset"
  | "modernisationOptions"
  | "readTheManual"
  | `markdown/${MarkdownPageName}`;

export type Menu = {
  sections: Array<ReactElement | ((props: EmptyObject) => ReactElement | null)>;

  items: MenuItem[];
  /*heading: ReactNode;
  footer?: ReactElement | ((props: EmptyObject) => ReactElement | null);*/

  backgroundClassName: string;
  /*
  itemsClassName: string;
  selectedClassName: string;
  hintClassName?: string;
  */
  borderClassName: string;
};
export const menus: Record<MenuId, Menu> = {
  ...{
    mainMenu,
    selectKeys: selectKeysMenu,
    modernisationOptions: modernisationOptionsMenu,
    inputPreset: inputPresetMenu,
    readTheManual: readTheManualMenu,
  },
  ...transformObject(
    markdownPages,
    ([pageName, markdown]): [`markdown/${MarkdownPageName}`, Menu] => {
      return [
        `markdown/${pageName}`,
        {
          backgroundClassName: "bg-highlightBeige",
          borderClassName: "bg-midGrey",
          items: [],
          sections: [
            withProps(MenuMarkdown, {
              markdown,
              className: "text-shadow overflow-y-hidden pb-2",
            }),
            withProps(PressToContinueBanner, {
              action: "menu",
              className: "absolute bg-lightBeige inset-x-0 bottom-0 h-min p-1",
              keyClassName: "text-midRed",
            }),
          ],
        },
      ];
    },
  ),
};
