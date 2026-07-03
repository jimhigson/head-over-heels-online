import { Switch } from "../../../../../../ui/Switch";
import {
  toggleFullscreen,
  useIsFullscreen,
} from "../../../../../../utils/tauri/fullscreen";
import { MenuItem } from "../../MenuItem";

export const FullscreenMenuItem = () => {
  const isFullscreen = useIsFullscreen();

  return (
    <MenuItem
      doubleHeight
      id="fullScreen"
      label="Full Screen"
      valueElement={<Switch class="ml-auto" value={isFullscreen} />}
      onSelect={(): void => {
        toggleFullscreen();
      }}
      verticalAlignItemsCentre
    />
  );
};
