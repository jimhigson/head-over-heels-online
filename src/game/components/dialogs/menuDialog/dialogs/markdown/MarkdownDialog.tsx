import { twMerge } from "tailwind-merge";

import type { DialogId } from "../../DialogId";

import {
  type MarkdownPageName,
  markdownPages,
} from "../../../../../../manual/pages";
import { useAppSelector } from "../../../../../../store/hooks";
import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { DialogTitleBar } from "../DialogTitleBar";
import { useScrollingFromInput } from "../useScrollingFromInput";

const MarkdownDialog = (
  props: (
    | {
        source: "inline";
        markdown: string;
      }
    | {
        source: "manual";
        pageName: MarkdownPageName;
      }
  ) & {
    dialogId: DialogId;
  },
) => {
  const markdown =
    props.source === "manual" ? markdownPages[props.pageName] : props.markdown;
  const contentRef = useScrollingFromInput();
  const isSubmenuFromManual = useAppSelector((state) => {
    const { openMenus } = state.gameMenus;
    return openMenus.some((menu) => menu.menuId === "readTheManual");
  });
  const isTopLevelMenu = useAppSelector((state) => {
    const { openMenus } = state.gameMenus;
    return openMenus.length === 1;
  });

  const goBackCallback = useDispatchActionCallback(backToParentMenu);

  return (
    <DialogPortal>
      {isTopLevelMenu || (
        // if a top level menu, let the game show through under:
        <Border
          className="bg-midGrey zx:bg-zxWhiteDimmed toppy:bg-toppyGrey2"
          onClick={goBackCallback}
        />
      )}
      <Dialog
        tall={!isTopLevelMenu}
        className={
          "bg-highlightBeige zx:bg-zxCyanDimmed toppy:bg-toppyCool1 " +
          `text-shadow zx:text-zxWhite toppy:text-toppyCool4 !gap-y-0 py-0 ` +
          "selectedMenuItem:text-shadow zx:selectedMenuItem:text-zxBlack toppy:selectedMenuItem:text-toppyBlack"
        }
        dialogId={props.dialogId}
      >
        <DialogTitleBar
          className={`pl-1 pt-1 mobile:px-3 ${isTopLevelMenu ? "hidden" : ""}`}
          path={isSubmenuFromManual ? ["Manual"] : []}
        />
        <div
          className={twMerge(
            "overflow-y-scroll h-full " +
              "scrollbar scrollbar-w-1 pl-1 pt-1 " +
              "scrollbar-thumb-midRed scrollbar-track-highlightBeige " +
              "zx:scrollbar-thumb-zxCyanDimmed zx:scrollbar-track-zxCyan " +
              "toppy:scrollbar-thumb-toppyCool3 toppy:scrollbar-track-toppyCool1 " +
              "mobile:px-3",
          )}
          ref={contentRef}
          // although we have a back button, you can actually click/tap anywhere to exit
          onClick={goBackCallback}
        >
          <BlockyMarkdown markdown={markdown} />
        </div>
      </Dialog>
    </DialogPortal>
  );
};

/** default export for React.lazy */
export default MarkdownDialog;
