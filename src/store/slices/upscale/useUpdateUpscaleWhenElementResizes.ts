import { useLayoutEffect } from "preact/hooks";

import { type ResolutionName } from "../../../originalGame";
import { useAppDispatch } from "../../hooks";
import { updateUpscaleThunk } from "./updateUpscaleThunk";

export const useUpdateUpscaleWhenElementResizes = (
  /**
   * if given, this emulated resolution will always be used - for the level editor
   *
   * Otherwise (the norm, for in-game) the resolution from the user settings or the default
   * will be used
   */
  fixedEmulatedResolution?: ResolutionName,
  /**
   * the element to track the size of - if not given, the window size will be used
   */
  targetElement?: HTMLElement,
): void => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const update = () =>
      dispatch(updateUpscaleThunk(fixedEmulatedResolution, targetElement));

    // measure once on mount / when the inputs change:
    update();

    // then re-measure when the tracked size changes:
    if (targetElement) {
      const resizeObserver = new ResizeObserver(update);
      resizeObserver.observe(targetElement);
      return () => resizeObserver.disconnect();
    }
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [dispatch, fixedEmulatedResolution, targetElement]);
};
