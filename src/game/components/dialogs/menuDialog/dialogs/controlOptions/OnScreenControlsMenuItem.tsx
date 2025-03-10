import { useIsOnScreenControls } from "../../../../../../store/selectors";
import { toggleBoolean } from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { Switch } from "../../../../../../ui/Switch";
import { MenuItem } from "../../MenuItem";

export const OnScreenControlsMenuItem = () => {
  return (
    <MenuItem
      id="controlOptions"
      label="on-screen controls"
      valueElement={<Switch value={useIsOnScreenControls()} />}
      onSelect={useDispatchActionCallback(
        toggleBoolean,
        "userSettings.onScreenControls",
      )}
    />
  );
};
