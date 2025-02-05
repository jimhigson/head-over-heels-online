import { BlockyMarkdown } from "../../BlockyMarkdown";
import { useCallback, useRef } from "react";
import { useActionTap } from "../useActionInput";
import { hudCharTextureSize } from "../../../../sprites/textureSizes";
import { useTotalUpscale } from "../../../../store/selectors";
import { twMerge } from "tailwind-merge";
import { markdownPages, type MarkdownPageName } from "../../../../manual/pages";
import { Border, Dialog } from "../../../../components/ui/dialog";
import { MenuItems } from "./MenuItems";
import { BackMenuItem } from "./BackMenuItem";

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
    <>
      <Border className="bg-midGrey zx:bg-zxWhiteDimmed" />
      <Dialog className="bg-highlightBeige zx:bg-zxCyan text-shadow zx:text-zxBlack">
        <div
          className={twMerge(
            "overflow-y-scroll " +
              "scrollbar  scrollbar-w-1 " +
              "scrollbar-thumb-midRed scrollbar-track-highlightBeige " +
              "zx:scrollbar-thumb-zxCyanDimmed zx:scrollbar-track-zxCyan",
          )}
          ref={contentRef}
        >
          <BlockyMarkdown markdown={markdown} />
        </div>
        <MenuItems className="hidden">
          <BackMenuItem />
        </MenuItems>
      </Dialog>
    </>
  );
};
