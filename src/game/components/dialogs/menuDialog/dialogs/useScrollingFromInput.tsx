import { useCallback, useRef } from "react";

import type { DirectionXy4 } from "../../../../../utils/vectors/vectors";

import { hudCharTextureSize } from "../../../../../sprites/spritesheet/spritesheetData/textureSizes";
import { useTotalUpscale } from "../../../../../store/slices/upscale/upscaleSelectors";
import { unitVectors } from "../../../../../utils/vectors/unitVectors";
import { useActionTap } from "../../useActionTap";

export const scrollLinesAtOnce = 4;
export const charHeight = hudCharTextureSize.h;

/**
 * for long text pages such as scrolls and the manual
 * - allow the controller/keyboard eto be used to
 * scroll up or down
 */
export const useScrollingFromInput = () => {
  const scaleFactor = useTotalUpscale();
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContent = useCallback(
    (
      direction: DirectionXy4,
      distance: "all" | "lines" | "pages" = "lines",
    ) => {
      // this component is slow to render, so don't cause any state changes or it would render again!
      if (contentRef.current === null) return;

      const { scrollTop, scrollLeft } = contentRef.current;

      const scrollUnitVector = unitVectors[direction];

      const newScrollTop =
        distance === "all" ?
          scrollUnitVector.y < 0 ?
            9999
          : 0
        : distance === "lines" ?
          scrollTop +
          scaleFactor * scrollLinesAtOnce * -scrollUnitVector.y * charHeight
          // page:
        : scrollTop +
          -scrollUnitVector.y *
            (contentRef.current?.getBoundingClientRect().height -
              // leave a bit of overlap:
              scaleFactor * charHeight * scrollLinesAtOnce);

      const newScrollLeft =
        scrollLeft +
        scaleFactor * scrollLinesAtOnce * scrollUnitVector.x * charHeight;

      contentRef.current.scrollTo({
        left: newScrollLeft,
        top: newScrollTop,
        behavior: "smooth",
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
      scrollContent("towards", "pages");
    }, [scrollContent]),
    action: "pageDown",
  });
  useActionTap({
    handler: useCallback(() => {
      scrollContent("away", "pages");
    }, [scrollContent]),
    action: "pageUp",
  });
  useActionTap({
    handler: useCallback(() => {
      scrollContent("towards", "all");
    }, [scrollContent]),
    action: "end",
  });
  useActionTap({
    handler: useCallback(() => {
      scrollContent("away", "all");
    }, [scrollContent]),
    action: "home",
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
