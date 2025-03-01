import { useEffect } from "react";
import { backToParentMenu, goToSubmenu } from "../gameMenusSlice";
import { store } from "../store";

const orientationNow = () =>
  screen.orientation.type.startsWith("portrait") ? "portrait" : "landscape";

export const useShowDialogWhenInPortrait = (): void => {
  useEffect(() => {
    let addedDialog = false;
    const handleOrientation = () => {
      const currentlyShownDialog = store.getState().openMenus.at(0)?.menuId;

      const o = orientationNow();

      console.log(o);

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
    handleOrientation(); // may have started in wrong orientation

    return () => {
      screen.orientation.removeEventListener("change", handleOrientation);
      if (addedDialog) {
        // cleaning up means removing everything we added to state:
        store.dispatch(backToParentMenu());
      }
    };
  }, []);
};
