import { twMerge } from "tailwind-merge";
import { toggleBoolean } from "../../../../../../store/gameMenusSlice";
import { useIsScreenRelativeControl } from "../../../../../../store/selectors";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { MenuItem } from "../../MenuItem";
import { BitmapText } from "../../../../Sprite";
import { spriteLeaderClasses } from "./spriteLeaderClasses";

const screenRelativeControlOffHintMarkdown =
  "**world**: Control is relative to directions in the isometric world";

const screenRelativeControlOnHintMarkdown = `**screen**: Control is relative to the screen.

More intuitive if you find directions confusing in isometric games, but requires inputting diagonals a lot`;

const ScreenRelativeControlValue = ({ className }: { className?: string }) => {
  return (
    <span>
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
          "text-moss zx:text-zxBlue selectedMenuItem:text-mossHalfbrite zx:selectedMenuItem:text-zxBlue",
          className,
        )}
      >
        {useIsScreenRelativeControl() ? "⬅ ➡ ⬆ ⬇" : "↖ ↘ ↗ ↙"}
      </BitmapText>
    </span>
  );
};

export const ScreenRelativeControlSection = () => {
  const isScreenRelativeControl = useIsScreenRelativeControl();
  return (
    <MenuItem
      id="screenRelativeControl"
      label="axes"
      leader={
        <span
          className={`${spriteLeaderClasses} ${isScreenRelativeControl ? "texture-heels.walking.towardsRight.2 selectedMenuItem:texture-animated-heels.screenDirections" : "texture-heels.walking.right.2 selectedMenuItem:texture-animated-heels.worldDirections"}`}
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
