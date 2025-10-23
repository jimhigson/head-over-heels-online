import { throttle } from "@github/mini-throttle";
import { listen } from "@tauri-apps/api/event";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";

/**
 * Listen for fullscreen state changes and call the provided callback
 * Returns a cleanup function to stop listening
 */
export const onFullscreenChange = (
  /** Called when fullscreen state changes */
  callback: (isFullscreen: boolean) => void,
): (() => void) => {
  const updateFullscreenStatus = async () => {
    const window = getCurrentWindow();
    const isFullscreenNow = await window.isFullscreen();
    callback(isFullscreenNow);
  };

  // Throttle the update function to avoid excessive calls during resize
  const throttledUpdate = throttle(updateFullscreenStatus, 100);

  // There's no event to listen to for fullscreen changes, so listen to
  // resize which should happen when going in/out of fullscreen:
  let unsubscribe: (() => void) | undefined;
  let cancelled = false;
  const listenPromise = listen("tauri://resize", throttledUpdate);

  listenPromise.then((unsubFn) => {
    if (cancelled) {
      unsubFn();
      return;
    }
    unsubscribe = unsubFn;
  });

  return () => {
    unsubscribe?.();
    cancelled = true;
    throttledUpdate.cancel();
  };
};

export const useIsFullscreen = () => {
  const [isFullScreen, setIsFullscreen] = useState(false);

  // Get initial state
  useEffect(() => {
    getCurrentWindow().isFullscreen().then(setIsFullscreen);
  }, []);

  // Listen for changes
  useEffect(() => {
    const unsubscribe = onFullscreenChange(setIsFullscreen);
    return unsubscribe;
  }, []);

  return isFullScreen;
};

export const toggleFullscreen = async (): Promise<void> => {
  const window = getCurrentWindow();
  const isFullscreen = await window.isFullscreen();
  console.log(
    performance.now(),
    "Toggling fullscreen, currently:",
    isFullscreen,
    "-> ",
    !isFullscreen,
  );
  await window.setFullscreen(!isFullscreen);
};
