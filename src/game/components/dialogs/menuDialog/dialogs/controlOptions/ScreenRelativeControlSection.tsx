import { useIsScreenRelativeControl } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { toggleBoolean } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { SwitchN } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { MenuItem } from "../../MenuItem";
import { optionsHintMarkdownClassname } from "../options/optionsHintMarkdownClassname";
import { spriteLeaderClasses } from "./spriteLeaderClasses";

const screenRelativeControlOffHintMarkdown =
  "**world**: Control is relative to directions in the isometric world";

const screenRelativeControlOnHintMarkdown = `**screen**: Control is relative to the screen.

More intuitive if you find directions confusing in isometric games, but means hitting diagonals a lot`;

const ScreenRelativeControlValue = () => {
  const isScreenRelativeControl = useIsScreenRelativeControl();

  return (
    <SwitchN
      className="ml-auto"
      values={["world", "screen"]}
      value={isScreenRelativeControl ? "screen" : "world"}
    />
  );
};

export const ScreenRelativeControlMenuItem = () => {
  const isScreenRelativeControl = useIsScreenRelativeControl();
  return (
    <MenuItem
      id="screenRelativeControl"
      label="input axes"
      leader={
        <span
          className={`${spriteLeaderClasses} ${isScreenRelativeControl ? "texture-heels_walking_towardsRight_2 selectedMenuItem:texture-animated-heels_screenDirections" : "texture-heels_walking_right_2 selectedMenuItem:texture-animated-heels_worldDirections sprites-normal-height"} `}
        />
      }
      valueElement={<ScreenRelativeControlValue />}
      onSelect={useDispatchActionCallback(
        toggleBoolean,
        "userSettings.screenRelativeControl",
      )}
      hintInline
      verticalAlignItemsCentre
      doubleHeightWhenFocussed
      hint={
        <BlockyMarkdown
          className={optionsHintMarkdownClassname}
          markdown={
            isScreenRelativeControl ?
              screenRelativeControlOnHintMarkdown
            : screenRelativeControlOffHintMarkdown
          }
        />
      }
    />
  );
};
