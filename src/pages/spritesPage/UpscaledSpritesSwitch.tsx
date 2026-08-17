import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectIsUpscaledSprites } from "../../store/slices/gameMenus/gameMenusSelectors";
import { toggleUserSetting } from "../../store/slices/userSettings/userSettingsSlice";
import { Switch } from "../../ui/Switch";

/**
 * the upscaling, switchable from this page so a sprite can be
 * compared with and without it without leaving for the display menu
 */
export const UpscaledSpritesSwitch = () => {
  const dispatch = useAppDispatch();

  return (
    <Switch
      value={useAppSelector(selectIsUpscaledSprites)}
      label="smooth"
      ariaLabel="smooth sprites"
      ariaDescription="upscale the sprites for a smoother look"
      onChange={() =>
        dispatch(toggleUserSetting({ path: "displaySettings.upscaledSprites" }))
      }
    />
  );
};
