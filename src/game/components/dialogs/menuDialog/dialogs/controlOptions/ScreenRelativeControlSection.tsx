import { twMerge } from "tailwind-merge";

import { useIsScreenRelativeControl } from "../../../../../../store/selectors";
import { toggleBoolean } from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { multilineTextClass } from "../../multilineTextClass";
import { spriteLeaderClasses } from "./spriteLeaderClasses";

const screenRelativeControlOffHintMarkdown =
  "**world**: Control is relative to directions in the isometric world";

const screenRelativeControlOnHintMarkdown = `**screen**: Control is relative to the screen.

More intuitive if you find directions confusing in isometric games, but requires inputting diagonals a lot`;

const ScreenRelativeControlValue = ({ className }: { className?: string }) => {
  return (
    <span className={multilineTextClass}>
      <BitmapText
        className={twMerge(
          `text-nowrap me-1`,
          "text-pinkHalfbrite zx:text-zxRed selectedMenuItem:text-pink zx:selectedMenuItem:text-zxRed",
          className,
        )}
      >
        {useIsScreenRelativeControl() ? "screen" : "world"}
      </BitmapText>
      <BitmapText
        className={twMerge(
          `text-nowrap`,
          "text-mossHalfbrite zx:text-zxBlue selectedMenuItem:text-moss zx:selectedMenuItem:text-zxBlue",
          className,
        )}
      >
        {useIsScreenRelativeControl() ? "⬅ ➡ ⬆ ⬇" : "↖ ↘ ↗ ↙"}
      </BitmapText>
    </span>
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
          className={`${spriteLeaderClasses} ${isScreenRelativeControl ? "texture-heels_walking_towardsRight_2 selectedMenuItem:texture-animated-heels_screenDirections" : "texture-heels_walking_right_2 selectedMenuItem:texture-animated-heels_worldDirections"}`}
        />
      }
      valueElement={<ScreenRelativeControlValue />}
      onSelect={useDispatchActionCallback(
        toggleBoolean,
        "userSettings.screenRelativeControl",
      )}
      hintInline
      hint={
        <BlockyMarkdown
          className="text-midGrey zx:text-zxBlack"
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
