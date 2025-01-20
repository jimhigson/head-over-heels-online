import { BlockyMarkdown } from "../BlockyMarkdown";
import { PressToContinueBanner } from "./PressToContinueBanner";
import { useCallback, useRef } from "react";
import { useActionInput } from "./useActionInput";
import type { EmptyObject } from "type-fest";
import { hudCharTextureSize } from "../../../sprites/textureSizes";
import { closeScroll } from "../../../store/gameMenusSlice";
import { useAppDispatch } from "../../../store/hooks";
import { useTotalUpscale, useScrollContent } from "../../../store/selectors";
import { Dialog } from "../../../components/ui/dialog";

const scrollLinesAtOnce = 4;
const charHeight = hudCharTextureSize.h;

const ScrollDialogInner = ({ markdown }: { markdown: string }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scaleFactor = useTotalUpscale();

  const dispatch = useAppDispatch();
  useActionInput({
    onAction() {
      dispatch(closeScroll());
    },
    action: "jump",
  });

  useActionInput({
    onAction() {
      scrollScroll("down");
    },
    action: "towards",
  });
  useActionInput({
    onAction() {
      scrollScroll("up");
    },
    action: "away",
  });

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

  return (
    <Dialog className="bg-highlightBeige text-shadow p-0" ref={contentRef}>
      <BlockyMarkdown
        className={`p-1 pb-0`}
        markdown={markdown}
      ></BlockyMarkdown>
      <PressToContinueBanner
        className="px-1 pt-1 sticky bottom-0 bg-lightBeige "
        action="jump"
        keyClassName="text-midRed"
      />
    </Dialog>
  );
};

export const ScrollDialog = (_emptyProps: EmptyObject) => {
  const scrollContent = useScrollContent();

  if (scrollContent === null) {
    return null;
  }

  return <ScrollDialogInner markdown={scrollContent} />;
};
