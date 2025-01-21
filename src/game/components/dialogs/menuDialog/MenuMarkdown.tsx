import { BlockyMarkdown } from "../../BlockyMarkdown";
import { useCallback, useRef } from "react";
import { useActionInput } from "../useActionInput";
import { hudCharTextureSize } from "../../../../sprites/textureSizes";
import { useTotalUpscale } from "../../../../store/selectors";
import { twMerge } from "tailwind-merge";
import { multilineTextClass } from "./multilineTextClass";

const scrollLinesAtOnce = 4;
const charHeight = hudCharTextureSize.h;

export const MenuMarkdown = ({
  markdown,
  className,
}: {
  markdown: string;
  className?: string;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scaleFactor = useTotalUpscale();

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
    onAction: useCallback(() => {
      scrollScroll("down");
    }, [scrollScroll]),
    action: "towards",
  });
  useActionInput({
    onAction: useCallback(() => {
      scrollScroll("up");
    }, [scrollScroll]),
    action: "away",
  });

  return (
    <div className={twMerge(multilineTextClass, className)} ref={contentRef}>
      <BlockyMarkdown markdown={markdown} />
    </div>
  );
};
