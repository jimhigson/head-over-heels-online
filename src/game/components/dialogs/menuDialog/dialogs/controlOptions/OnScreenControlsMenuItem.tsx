import { useIsUserPreferenceOnScreenControls } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { toggleUserSetting } from "../../../../../../store/slices/userSettings/userSettingsSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Switch } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { optionsHintMarkdownClassname } from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";

export const OnScreenControlsMenuItem = () => {
  const hintMarkdown = `Enables on-screen controls: for mobile, tablet, or any device with a touch-screen.

You can turn this off for phones paired with joypads/keyboards`;
  return (
    <MenuItem
      doubleHeight
      id="onScreenControls"
      label={
        <span className="text-multi-line mobile:w-max">Touch controls</span>
      }
      valueElement={
        <Switch
          className="ml-auto"
          value={useIsUserPreferenceOnScreenControls()}
        />
      }
      onSelect={useDispatchActionCallback(toggleUserSetting, {
        path: "onScreenControls",
      })}
      verticalAlignItemsCentre
      hint={
        <BlockyMarkdown
          className={optionsHintMarkdownClassname}
          markdown={hintMarkdown}
        />
      }
    />
  );
};
