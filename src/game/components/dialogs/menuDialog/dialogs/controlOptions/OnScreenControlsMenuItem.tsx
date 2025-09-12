import { useIsUserPreferenceOnScreenControls } from "../../../../../../store/selectors";
import { toggleBoolean } from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Switch } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { multilineTextClass } from "../../multilineTextClass";
import { optionsHintMarkdownClassname } from "../options/optionsHintMarkdownClassname";

export const OnScreenControlsMenuItem = () => {
  const hintMarkdown = `enables touch controls: for mobile, tablet, or any device with a touch-screen.

You can turn this off for phones paired with joypads/keyboards`;
  return (
    <MenuItem
      id="onScreenControls"
      label={
        <BitmapText className={`${multilineTextClass} w-min mobile:w-max`}>
          on-screen controls
        </BitmapText>
      }
      valueElement={
        <Switch
          className="ml-auto"
          value={useIsUserPreferenceOnScreenControls()}
        />
      }
      onSelect={useDispatchActionCallback(
        toggleBoolean,
        "userSettings.onScreenControls",
      )}
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
