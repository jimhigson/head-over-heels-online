import { BlockyMarkdown } from "../BlockyMarkdown";
import { PressToContinueBanner } from "./PressToContinueBanner";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { useCallback, useContext, useRef } from "react";
import { ScaleFactorContext } from "../ScaleFactorContext";
import type { GameApi } from "@/game/GameApi";
import { useActionInput } from "./useActionInput";
import { Dialog } from "@/components/ui/dialog";
import { hudCharTextureSize } from "@/sprites/textureSizes";

export type ScrollContentProps<RoomId extends string> = {
  markdown: string;
  gameApi: GameApi<RoomId>;
  /** callback for when this dialog wants to close itself */
  onClose: () => void;
};

const scrollLinesAtOnce = 4;
const charHeight = hudCharTextureSize.h;

export const ScrollDialog = <RoomId extends string>({
  markdown,
  gameApi,
  onClose,
}: ScrollContentProps<RoomId>) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scaleFactor = useContext(ScaleFactorContext);
  // technically this is wrong - if the key assignment changes, this component won't re-render
  // but this is probably not possible during the lifetime of this component
  const { keyAssignment } = gameApi.gameState;

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

  useActionInput({
    onAction: onClose,
    gameApi,
    action: "jump",
  });
  useActionInput({
    onAction() {
      scrollScroll("down");
    },
    gameApi,
    action: "towards",
  });
  useActionInput({
    onAction() {
      scrollScroll("up");
    },
    gameApi,
    action: "away",
  });

  return (
    <Dialog className="bg-highlightBeige" ref={contentRef}>
      <BlockyMarkdown
        className={`p-${scaleFactor} pb-0`}
        markdown={markdown}
      ></BlockyMarkdown>
      <PressToContinueBanner
        className={`px-${scaleFactor} sticky bottom-0 bg-lightBeige`}
        action="jump"
        keyAssignment={keyAssignment}
        keyColor={spritesheetPalette.midRed}
      />
    </Dialog>
  );
};
