import { useEffect } from "react";

import { resolutions } from "../../originalGame";
import { useAppSelector } from "../../store/hooks";
import { useEmulatedResolutionName } from "../../store/slices/gameMenus/gameMenusSelectors";
import { selectRot90 } from "../../store/slices/upscale/upscaleSlice";
import { detectDeviceType } from "../../utils/detectEnv/detectDeviceType";

const resClassName = (str: string) =>
  `res${str[0].toUpperCase()}${str.slice(1)}`;

/**
 * sets up the current page to be app-like, not page-like.
 *
 * Ie, no zoom, no scroll, no text selection etc
 */
export const usePageAsAnApp = () => {
  const resolutionName = useEmulatedResolutionName();
  const rotate90 = useAppSelector(selectRot90);

  useEffect(() => {
    // unchanging classes:
    document.body.classList.add(
      "overscroll-none",
      "overflow-hidden",
      "select-none",
      detectDeviceType(),
    );
  }, []);
  useEffect(() => {
    document.body.classList.remove(
      ...Object.keys(resolutions).map(resClassName),
    );
    document.body.classList.add(resClassName(resolutionName));
    document.body.classList.toggle("portrait-rot", rotate90);
  }, [resolutionName, rotate90]);
};
