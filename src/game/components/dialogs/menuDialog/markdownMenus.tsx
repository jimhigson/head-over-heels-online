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
                className="text-shadow overflow-y-hidden"
              />
              {/* <PressToContinueBanner
                action="menu"
                className={`absolute bg-lightBeige inset-x-0 bottom-0 h-min p-1 z-dialogChrome ${multilineTextClass}`}
                keyClassName="text-midRed"
              /> */}
              <MenuItems className="hidden" />
            </>
          );
        },
      },
    ];
  },
);
