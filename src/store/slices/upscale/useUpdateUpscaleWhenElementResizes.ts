import { useLayoutEffect } from "react";

import type { ResolutionName } from "../../../originalGame";

import { useAppDispatch } from "../../hooks";
import { store } from "../../store";
import { updateUpscaleNow } from "./updateUpscaleNow";

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
    // on first load, put the correct size in the store:
    updateUpscaleNow(
      store.dispatch,
      store.getState,
      fixedEmulatedResolution,
      targetElement,
    );
  }, [fixedEmulatedResolution, targetElement]);

  useLayoutEffect(() => {
    const handler = () =>
      updateUpscaleNow(
        store.dispatch,
        store.getState,
        fixedEmulatedResolution,
        targetElement,
      );
    // if an element is given, use its size instead of the window size:
    if (targetElement) {
      const resizeObserver = new ResizeObserver(handler);
      resizeObserver.observe(targetElement);
      return () => resizeObserver.disconnect();
    } else {
      // on every resize, update the store with the correct size:
      window.addEventListener("resize", handler);
      return () => window.removeEventListener("resize", handler);
    }
  }, [dispatch, targetElement, fixedEmulatedResolution]);
};
