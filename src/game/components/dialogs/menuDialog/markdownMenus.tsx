import { markdownPages, type MarkdownPageName } from "../../../../manual/pages";
import { transformObject } from "../../../../utils/entries";
import { PressToContinueBanner } from "../PressToContinueBanner";
import { MenuMarkdown } from "./MenuMarkdown";
import type { Menu } from "./menus";
import { multilineTextClass } from "./multilineTextClass";

export const markdownMenus = transformObject(
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
                className="text-shadow overflow-y-hidden pb-3"
              />
              <PressToContinueBanner
                action="menu"
                className={`absolute bg-lightBeige inset-x-0 bottom-0 h-min p-1 z-dialogChrome ${multilineTextClass}`}
                keyClassName="text-midRed"
              />
            </>
          );
        },
      },
    ];
  },
);
