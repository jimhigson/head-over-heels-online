import { useIsUserPreferenceOnScreenControls } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { toggleUserSetting } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Switch } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { multilineTextClass } from "../../multilineTextClass";
import { optionsHintMarkdownClassname } from "../options/optionsHintMarkdownClassname";

export const OnScreenControlsMenuItem = () => {
  const hintMarkdown = `Enables on-screen controls: for mobile, tablet, or any device with a touch-screen.

You can turn this off for phones paired with joypads/keyboards`;
  return (
    <MenuItem
      doubleHeightWhenFocussed
      id="onScreenControls"
      label={
        <BitmapText className={`${multilineTextClass} mobile:w-max`}>
          Touch controls
        </BitmapText>
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
      hintInline
      hint={
        <BlockyMarkdown
          className={optionsHintMarkdownClassname}
          markdown={hintMarkdown}
        />
      }
    />
  );
};
