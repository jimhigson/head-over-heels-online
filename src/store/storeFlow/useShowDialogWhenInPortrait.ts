import { useEffect } from "react";
import { backToParentMenu, goToSubmenu } from "../gameMenusSlice";
import { store } from "../store";
import { detectDeviceType } from "../../utils/detectDeviceType";

const orientationNow = () =>
  // desktops are always assumed to have a capable display - so call it landscape no matter what the actual window dimensions
  detectDeviceType() === "desktop" ? "landscape"
    // allow orientation check to be skipped for testing
  : (
    new URLSearchParams(window.location.search).get("skipOrientation") !== null
  ) ?
    "landscape"
    // the reported orientation is too unreliable - ignore it:
    //: screen.orientation.type.startsWith("portrait") ? "portrait"
  : window.innerHeight > window.innerWidth ? "portrait"
  : (
    window.matchMedia("(display-mode: fullscreen)").matches &&
    // screen.width reports the width of the screen in portrait, regardless of orientation.
    // if the inner height is less than the screen width while in fullscreen, we're in portrait or
    // a broken half-and-half mode iOS sometimes loads PWAs into.
    window.innerHeight < screen.width
  ) ?
    "portrait"
  : "landscape";

export const useShowDialogWhenInPortrait = (): void => {
  useEffect(() => {
    let addedDialog = false;
    let retryTimeout: number | undefined;
    /**
     * @param andRepeat if not given as false, will check a 2nd time after a short delay
     * @returns
     */
    const handleOrientation = (_e?: Event, andRepeat = true) => {
      const currentlyShownDialog = store.getState().openMenus.at(0)?.menuId;

      const o = orientationNow();

      if (retryTimeout !== undefined) {
        window.clearTimeout(retryTimeout);
        retryTimeout = undefined;
      }
      if (andRepeat) {
        retryTimeout = window.setTimeout(() => {
          // under iOS, the orientation change event sometimes comes before the device is ready
          // to be queried for its size.
          handleOrientation(undefined, false);
        }, 500);
      }

      if (o === "portrait" && currentlyShownDialog !== "wrongOrientation") {
        store.dispatch(goToSubmenu("wrongOrientation"));
        addedDialog = true;
        return;
      }

      if (o === "landscape" && currentlyShownDialog === "wrongOrientation") {
        store.dispatch(backToParentMenu());
        addedDialog = false;
      }
    };

    screen.orientation.addEventListener("change", handleOrientation);
    console.log("listening for orientation");
    handleOrientation(); // may have started in wrong orientation

    return () => {
      screen.orientation.removeEventListener("change", handleOrientation);
      if (addedDialog) {
        // cleaning up means removing everything we added to state:
        store.dispatch(backToParentMenu());
      }
      if (retryTimeout !== undefined) {
        window.clearTimeout(retryTimeout);
      }
    };
  }, []);
};
