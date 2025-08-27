import { twMerge } from "tailwind-merge";

import {
  type MarkdownPageName,
  markdownPages,
} from "../../../../../../manual/pages";
import { backToParentMenu } from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { isTouchDevice } from "../../../../../../utils/detectDeviceType";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BackMenuItem } from "../../BackMenuItem";
import { MenuItems } from "../../MenuItems";
import { MobileStyleBackButton } from "../MobileStyleBackButton";
import { useScrollingFromInput } from "../useScrollingFromInput";

export const MarkdownDialog = (
  props:
    | {
        source: "inline";
        markdown: string;
      }
    | {
        source: "manual";
        pageName: MarkdownPageName;
      },
) => {
  const markdown =
    props.source === "manual" ? markdownPages[props.pageName] : props.markdown;
  const contentRef = useScrollingFromInput();

  return (
    <DialogPortal>
      <Border
        className="bg-midGrey zx:bg-zxWhiteDimmed"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog
        tall
        className="bg-highlightBeige zx:bg-zxCyan text-shadow zx:text-zxBlack"
        // although we have a back button, you can actually click/tap anywhere to exit
        onClick={useDispatchActionCallback(backToParentMenu)}
      >
        <div
          className={twMerge(
            "overflow-y-scroll h-full " +
              "scrollbar scrollbar-w-1 pl-1 " +
              "scrollbar-thumb-midRed scrollbar-track-highlightBeige " +
              "zx:scrollbar-thumb-zxCyanDimmed zx:scrollbar-track-zxCyan",
          )}
          ref={contentRef}
        >
          {isTouchDevice() && <MobileStyleBackButton className="pb-1" />}
          <BlockyMarkdown markdown={markdown} />
        </div>
        <MenuItems className="hidden">
          <BackMenuItem />
        </MenuItems>
      </Dialog>
    </DialogPortal>
  );
};
