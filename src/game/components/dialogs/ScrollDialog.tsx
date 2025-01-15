import { BlockyMarkdown } from "../BlockyMarkdown";
import { PressToContinueBanner } from "./PressToContinueBanner";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { useCallback, useRef } from "react";
import { useActionInput } from "./useActionInput";
import { Dialog } from "@/components/ui/dialog";
import { hudCharTextureSize } from "@/sprites/textureSizes";
import { useGameApi } from "../GameApiContext";
import { useScaleFactor, useScrollContent } from "@/store/selectors";
import type { EmptyObject } from "type-fest";
import { useAppDispatch } from "@/store/hooks";
import { closeScroll } from "@/store/store";

const scrollLinesAtOnce = 4;
const charHeight = hudCharTextureSize.h;

const ScrollDialogInner = ({ markdown }: { markdown: string }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scaleFactor = useScaleFactor();

  const gameApi = useGameApi();

  // technically this is wrong - if the key assignment changes, this component won't re-render
  // but this is probably not possible during the lifetime of this component
  const { keyAssignment } = gameApi.gameState;

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
    <Dialog className="bg-highlightBeige p-0" ref={contentRef}>
      <BlockyMarkdown
        className={`p-1 pb-0`}
        markdown={markdown}
      ></BlockyMarkdown>
      <PressToContinueBanner
        className={`px-1 sticky bottom-0 bg-lightBeige`}
        action="jump"
        keyAssignment={keyAssignment}
        keyColor={spritesheetPalette.midRed}
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
