import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { useCallback, useRef } from "react";
import { useActionTap } from "../../../useActionTap";
import { hudCharTextureSize } from "../../../../../../sprites/textureSizes";
import { useTotalUpscale } from "../../../../../../store/selectors";
import { twMerge } from "tailwind-merge";
import {
  markdownPages,
  type MarkdownPageName,
} from "../../../../../../manual/pages";
import { Dialog } from "../../../../../../ui/dialog";
import { Border } from "../../../../../../ui/Border";
import { MenuItems } from "../../MenuItems";
import { BackMenuItem } from "../../BackMenuItem";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { backToParentMenu } from "../../../../../../store/gameMenusSlice";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { MobileStyleBackButton } from "../MobileStyleBackButton";
import { isTouchDevice } from "../../../../../../utils/detectDeviceType";

const scrollLinesAtOnce = 4;
const charHeight = hudCharTextureSize.h;

export const MarkdownDialog = ({
  pageName,
}: {
  pageName: MarkdownPageName;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scaleFactor = useTotalUpscale();
  const markdown = markdownPages[pageName];

  const scrollScroll = useCallback(
    (direction: "down" | "up") => {
      // this component is slow to render, so don't cause any state changes or it would render again!
      if (contentRef.current === null) return;

      const { scrollTop } = contentRef.current;

      const newScrollTop =
        scrollTop +
        scaleFactor *
          scrollLinesAtOnce *
          (direction === "down" ? charHeight : -charHeight);

      contentRef.current.scrollTo({
        top: newScrollTop,
        behavior: "instant",
      });
    },
    [scaleFactor],
  );

  useActionTap({
    handler: useCallback(() => {
      scrollScroll("down");
    }, [scrollScroll]),
    action: "towards",
  });
  useActionTap({
    handler: useCallback(() => {
      scrollScroll("up");
    }, [scrollScroll]),
    action: "away",
  });

  return (
    <DialogPortal>
      <Border
        className="bg-midGrey zx:bg-zxWhiteDimmed"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog
        className="bg-highlightBeige zx:bg-zxCyan text-shadow zx:text-zxBlack mobile:h-full"
        // although we have a back button, you can actually click/tap anywhere to exit
        onClick={useDispatchActionCallback(backToParentMenu)}
      >
        <div
          className={twMerge(
            "overflow-y-scroll h-full " +
              "scrollbar  scrollbar-w-1 " +
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
