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
      hintInline
      className="sprites-double-height"
      id="fullScreen"
      label="Full Screen"
      valueElement={<Switch className="ml-auto" value={isFullscreen} />}
      onSelect={(): void => {
        toggleFullscreen();
      }}
      verticalAlignItemsCentre
    />
  );
};
