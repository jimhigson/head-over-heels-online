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
        dialogClassName:
          "bg-highlightBeige zx:bg-zxCyan text-shadow zx:text-zxBlack",
        borderClassName: "bg-midGrey",
        items: [backMenuItem],
        Content() {
          return (
            <>
              <MenuMarkdown
                markdown={markdown}
                className={
                  "overflow-y-scroll " +
                  "scrollbar  scrollbar-w-1 " +
                  "scrollbar-thumb-midGrey scrollbar-track-highlightBeige " +
                  "zx:scrollbar-thumb-zxCyanDimmed zx:scrollbar-track-zxCyan"
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
