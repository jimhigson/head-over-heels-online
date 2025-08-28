import { useIsUserPreferenceOnScreenControls } from "../../../../../../store/selectors";
import { toggleBoolean } from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Switch } from "../../../../../../ui/Switch";
import { MenuItem } from "../../MenuItem";

export const OnScreenControlsMenuItem = () => {
  return (
    <MenuItem
      id="controlOptions"
      label="on-screen controls"
      valueElement={<Switch value={useIsUserPreferenceOnScreenControls()} />}
      onSelect={useDispatchActionCallback(
        toggleBoolean,
        "userSettings.onScreenControls",
      )}
    />
  );
};
