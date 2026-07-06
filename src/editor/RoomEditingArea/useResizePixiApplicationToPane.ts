import { debounce } from "@github/mini-throttle";
import { useEffect, useRef } from "preact/hooks";

import { useProvidedPixiApplication } from "./PixiApplicationProvider";

/**
 * resizing the renderer is relatively expensive, so while the pane is being
 * resized the (css-stretched) canvas is left alone and the renderer resize
 * lands on the trailing edge
 */
const resizeDebounceMs = 200;

/**
 * keeps the renderer's logical size matched to the pane element's css size.
 * The canvas element itself is styled to fill the pane, so between debounced
 * resizes it stretches, then sharpens.
 */
export const useResizePixiApplicationToPane = (
  /** the pane element the canvas fills */
  paneElement: HTMLElement | null,
  /** called once the renderer has taken the pane's size, each time the pane
   * element (re)mounts (not on later resizes of the same element) */
  onPaneFirstSized?: () => void,
): void => {
  const application = useProvidedPixiApplication();

  const onPaneFirstSizedRef = useRef(onPaneFirstSized);
  onPaneFirstSizedRef.current = onPaneFirstSized;

  useEffect(() => {
    if (paneElement === null) {
      return;
    }

    const resizeToPane = () => {
      application.renderer.resize(
        paneElement.clientWidth,
        paneElement.clientHeight,
      );
    };

    // size immediately on mount (the observer also fires on observe, but
    // resize synchronously so the first fit sees real dimensions):
    resizeToPane();
    onPaneFirstSizedRef.current?.();

    const debouncedResize = debounce(resizeToPane, resizeDebounceMs);
    const resizeObserver = new ResizeObserver(debouncedResize);
    resizeObserver.observe(paneElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [application, paneElement]);
};
