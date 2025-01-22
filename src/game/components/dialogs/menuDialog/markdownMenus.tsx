import { markdownPages, type MarkdownPageName } from "../../../../manual/pages";
import { transformObject } from "../../../../utils/entries";
import { backMenuItem } from "./backMenuItem";
import { MenuItems } from "./MenuItems";
import { MenuMarkdown } from "./MenuMarkdown";
import type { Menu } from "./menus";

export const markdownMenus = transformObject(
  markdownPages,
  ([pageName, markdown]): [`markdown/${MarkdownPageName}`, Menu] => {
    return [
      `markdown/${pageName}`,
      {
        dialogClassName: "bg-highlightBeige",
        borderClassName: "bg-midGrey",
        items: [backMenuItem],
        Content() {
          return (
            <>
              <MenuMarkdown
                markdown={markdown}
                className={
                  `text-shadow overflow-y-scroll ` +
                  "scrollbar scrollbar-thumb-midGrey scrollbar-w-1 scrollbar-track-highlightBeige"
                }
              />
              <MenuItems className="hidden" />
            </>
          );
        },
      },
    ];
  },
);
