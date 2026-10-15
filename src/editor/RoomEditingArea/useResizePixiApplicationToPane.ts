import { debounce } from "@github/mini-throttle";
import { useEffect } from "preact/hooks";

import { editorStore } from "../../store/store";
import { roomPaneResized } from "../slice/levelEditorSlice";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";

/**
 * resizing the renderer is relatively expensive, so while the pane is being
 * resized the (css-stretched) canvas is left alone and the renderer resize
 * lands on the trailing edge
 */
const resizeDebounceMs = 200;

/**
 * keeps the renderer's logical size matched to the pane element's css size,
 * and the store told of it. The canvas element itself is styled to fill the
 * pane, so between debounced resizes it stretches, then sharpens.
 */
export const useResizePixiApplicationToPane = (
  /** the pane element the canvas fills */
  paneElement: HTMLElement | null,
): void => {
  const application = useProvidedPixiApplication();

  useEffect(() => {
    if (paneElement === null) {
      return;
    }

    const resizeToPane = () => {
      const { clientWidth, clientHeight } = paneElement;
      application.renderer.resize(clientWidth, clientHeight);
      editorStore.dispatch(
        roomPaneResized({ x: clientWidth, y: clientHeight }),
      );
    };

    // size immediately on mount (the observer also fires on observe, but
    // resize synchronously so the first fit sees real dimensions):
    resizeToPane();

    const debouncedResize = debounce(resizeToPane, resizeDebounceMs);
    const resizeObserver = new ResizeObserver(debouncedResize);
    resizeObserver.observe(paneElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [application, paneElement]);
};
