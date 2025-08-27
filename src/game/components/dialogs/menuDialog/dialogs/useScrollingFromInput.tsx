import { useCallback, useRef } from "react";

import type { DirectionXy4 } from "../../../../../utils/vectors/vectors";

import { hudCharTextureSize } from "../../../../../sprites/textureSizes";
import { useTotalUpscale } from "../../../../../store/selectors";
import { unitVectors } from "../../../../../utils/vectors/unitVectors";
import { useActionTap } from "../../useActionTap";

export const scrollLinesAtOnce = 4;
export const charHeight = hudCharTextureSize.h;

export const useScrollingFromInput = () => {
  const scaleFactor = useTotalUpscale();
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContent = useCallback(
    (direction: DirectionXy4) => {
      // this component is slow to render, so don't cause any state changes or it would render again!
      if (contentRef.current === null) return;

      const { scrollTop, scrollLeft } = contentRef.current;

      const scrollUnitVector = unitVectors[direction];

      const newScrollTop =
        scrollTop +
        scaleFactor * scrollLinesAtOnce * -scrollUnitVector.y * charHeight;

      const newScrollLeft =
        scrollLeft +
        scaleFactor * scrollLinesAtOnce * scrollUnitVector.x * charHeight;

      contentRef.current.scrollTo({
        left: newScrollLeft,
        top: newScrollTop,
        behavior: "instant",
      });
    },
    [scaleFactor],
  );

  useActionTap({
    handler: useCallback(() => {
      scrollContent("towards");
    }, [scrollContent]),
    action: "towards",
  });
  useActionTap({
    handler: useCallback(() => {
      scrollContent("away");
    }, [scrollContent]),
    action: "away",
  });
  useActionTap({
    handler: useCallback(() => {
      scrollContent("left");
    }, [scrollContent]),
    action: "left",
  });
  useActionTap({
    handler: useCallback(() => {
      scrollContent("right");
    }, [scrollContent]),
    action: "right",
  });

  return contentRef;
};
