import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectIsSmoothSprites } from "../../store/slices/gameMenus/gameMenusSelectors";
import { toggleUserSetting } from "../../store/slices/userSettings/userSettingsSlice";
import { Switch } from "../../ui/Switch";

/**
 * the cleanEdge upscaling, switchable from this page so a sprite can be
 * compared with and without it without leaving for the display menu
 */
export const SmoothSpritesSwitch = () => {
  const dispatch = useAppDispatch();

  return (
    <Switch
      value={useAppSelector(selectIsSmoothSprites)}
      label="smooth"
      ariaLabel="smooth sprites"
      ariaDescription="upscale the sprites with cleanEdge for a smoother look"
      onChange={() =>
        dispatch(toggleUserSetting({ path: "displaySettings.smoothSprites" }))
      }
    />
  );
};
