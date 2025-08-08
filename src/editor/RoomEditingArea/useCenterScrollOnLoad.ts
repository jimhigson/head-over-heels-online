import { useCallback, useEffect } from "react";
import { startAppListening } from "../../store/listenerMiddleware";
import { changeToRoom } from "../slice/levelEditorSlice";

/**
 * Centers the scroll position when the canvas is added to the DOM
 * or when changing to a different room
 */
export const useCenterScrollOnLoad = (
  /** The scrollable container element */
  renderSizingArea: HTMLDivElement | null,
  /** The element that will contain the canvas */
  renderArea: HTMLDivElement | null,
) => {
  // Center scroll helper function
  const centerScroll = useCallback(() => {
    if (renderSizingArea === null) {
      return;
    }

    const scrollX = Math.max(
      0,
      (renderSizingArea.scrollWidth - renderSizingArea.clientWidth) / 2,
    );
    const scrollY = Math.max(
      0,
      (renderSizingArea.scrollHeight - renderSizingArea.clientHeight) / 2,
    );

    renderSizingArea.scrollTo(scrollX, scrollY);
  }, [renderSizingArea]);

  // Listen for room changes using RTK listener
  useEffect(() => {
    if (renderSizingArea === null) {
      return;
    }

    return startAppListening({
      actionCreator: changeToRoom,
      effect() {
        // Center after room change with a small delay for layout
        setTimeout(centerScroll, 0);
      },
    });
  }, [centerScroll, renderSizingArea]);

  // Initial centering when canvas is added
  useEffect(() => {
    if (renderSizingArea === null || renderArea === null) {
      return;
    }

    // Check if canvas already exists
    const existingCanvas = renderArea.querySelector("canvas");
    if (existingCanvas) {
      // Use setTimeout to ensure layout is complete
      setTimeout(centerScroll, 0);
    } else {
      // Wait for canvas to be added to the DOM
      const observer = new MutationObserver(() => {
        const canvas = renderArea.querySelector("canvas");
        if (canvas) {
          centerScroll();
          observer.disconnect();
        }
      });

      observer.observe(renderArea, { childList: true, subtree: true });
      return () => observer.disconnect();
    }
  }, [renderSizingArea, renderArea, centerScroll]);
};
