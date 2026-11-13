import { debounce } from "@github/mini-throttle";
import { useEffect } from "preact/hooks";

import { editorStore } from "../../store/store";
import { openRoomPaneResized } from "../slice/levelEditorSlice";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";
import { useOpenRoomPane } from "./useOpenRoomPane";

/**
 * resizing the renderer is relatively expensive, so while the pane is being
 * resized the canvas is left as it is and the renderer resize lands on the
 * trailing edge
 */
const resizeDebounceMs = 500;

/**
 * keeps the renderer's logical size matched to the pane element's css size,
 * and the store told of it
 */
export const useResizePixiApplicationToPane = (
  /** the pane element the canvas fills */
  paneElement: HTMLElement | null,
): void => {
  const application = useProvidedPixiApplication();
  const { openRoomId } = useOpenRoomPane();

  useEffect(() => {
    if (paneElement === null) {
      return;
    }

    const resizeToPane = () => {
      const { clientWidth, clientHeight } = paneElement;
      application.renderer.resize(clientWidth, clientHeight);
      editorStore.dispatch(
        openRoomPaneResized({
          openRoomId,
          paneSize: { x: clientWidth, y: clientHeight },
        }),
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
      // the app may be destroyed before a pending resize would land:
      debouncedResize.cancel();
    };
  }, [application, paneElement, openRoomId]);
};
