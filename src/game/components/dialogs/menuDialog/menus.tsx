import type { ReactElement } from "react";
import { inputPresetMenu } from "./menus/inputPresetMenu";
import { mainMenu } from "./menus/mainMenu";
import { modernisationOptionsMenu } from "./menus/modernisationOptionsMenu";
import { selectKeysMenu } from "./menus/selectKeysMenu";
import { readTheManualMenu } from "./menus/readTheManualMenu";
import { markdownPages, type MarkdownPageName } from "../../../../manual/pages";
import type { MenuItem } from "./MenuItem";
import { transformObject } from "../../../../utils/entries";
import { backMenuItem } from "./backMenuItem";
import { MenuItems } from "./MenuItems";
import { withProps } from "./withClassName";
import { BlockyMarkdown } from "../../BlockyMarkdown";
import type { EmptyObject } from "type-fest";

export type MenuId =
  | "mainMenu"
  | "selectKeys"
  | "inputPreset"
  | "modernisationOptions"
  | "readTheManual"
  | `manual/${MarkdownPageName}`;

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
    ([pageName, pageContent]): [`manual/${MarkdownPageName}`, Menu] => {
      return [
        `manual/${pageName}`,
        {
          backgroundClassName: "bg-highlightBeige",
          borderClassName: "bg-midRed",
          items: [backMenuItem],
          sections: [
            withProps(BlockyMarkdown, {
              markdown: pageContent,
              className: "text-shadow",
            }),
            withProps(MenuItems, {
              className: "text-lightGrey",
              selectedClassName: "text-shadow",
            }),
          ],
        },
      ];
    },
  ),
};
