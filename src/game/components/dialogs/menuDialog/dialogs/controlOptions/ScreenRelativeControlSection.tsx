import { twClass } from "../../../../../../editor/twClass";
import {
  type DirectionsRelativeToMode,
  directionsRelativeToModes,
} from "../../../../../../store/slices/gameMenus/directionsRelativeToModes";
import { useDirectionsRelativeTo } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { nextDirectionRelativeTo } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { SwitchN } from "../../../../../../ui/Switch";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { MenuItem } from "../../MenuItem";
import { optionsHintMarkdownClassname } from "../options/optionsHintMarkdownClassname";
import { spriteLeaderClasses } from "./spriteLeaderClasses";

const markdown: Record<DirectionsRelativeToMode, string> = {
  screen: `**Screen**: Control is relative to the *screen*.
More intuitive if you find directions confusing in isometric games, but means hitting diagonals a lot`,
  world:
    "**World**: Control is relative to directions in the *isometric world* - like the original",
  mixed:
    "**Mixed (default)**: *Analogue sticks* move relative to the *screen*, digital inputs like *keys* and *d-pad* move relative to the *world*",
};

const leaderClass: Record<DirectionsRelativeToMode, string> = {
  screen: twClass(
    "texture-heels_walking_towardsRight_2 selectedMenuItem:texture-animated-heels_screenDirections",
  ),
  world: twClass(
    "texture-heels_walking_right_2 selectedMenuItem:texture-animated-heels_worldDirections sprites-normal-height",
  ),
  mixed: twClass(
    "texture-heels_walking_right_2 selectedMenuItem:texture-animated-heels_mixedDirections sprites-normal-height",
  ),
};

const ScreenRelativeControlValue = () => {
  const isScreenRelativeControl = useDirectionsRelativeTo();

  return (
    <SwitchN
      className="ml-auto"
      values={directionsRelativeToModes}
      value={isScreenRelativeControl}
    />
  );
};

export const ScreenRelativeControlMenuItem = () => {
  const directionsRelativeTo = useDirectionsRelativeTo();
  return (
    <MenuItem
      id="screenRelativeControl"
      label="Input axes"
      leader={
        <span
          className={`${spriteLeaderClasses} ${leaderClass[directionsRelativeTo]}`}
        />
      }
      valueElement={<ScreenRelativeControlValue />}
      onSelect={useDispatchActionCallback(nextDirectionRelativeTo)}
      hintInline
      verticalAlignItemsCentre
      className="sprites-double-height"
      hint={
        <BlockyMarkdown
          className={optionsHintMarkdownClassname}
          markdown={markdown[directionsRelativeTo]}
        />
      }
    />
  );
};
