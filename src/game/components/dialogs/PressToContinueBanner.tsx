import { BitmapText } from "../Sprite";
import type { Action, KeyAssignment } from "../../input/InputState";
import { Fragment } from "react/jsx-runtime";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import type { Color } from "pixi.js";
import { cx } from "class-variance-authority";

export const PressToContinueBanner = ({
  action,
  keyAssignment,
  className,
  textColor = spritesheetPalette.metallicBlue,
  keyColor = spritesheetPalette.pink,
}: {
  action: Action;
  keyAssignment: KeyAssignment;
  className?: string;
  textColor?: Color;
  keyColor?: Color;
}) => {
  const keys = keyAssignment[action];

  return (
    <div className={cx("text-left", `mt-1`, className)}>
      <BitmapText colour={textColor}>Press</BitmapText>
      <BitmapText colour={keyColor}>{action}</BitmapText>
      <BitmapText colour={spritesheetPalette.metallicBlue}>
        to continue
      </BitmapText>
      <div>
        <BitmapText colour={textColor}>(</BitmapText>
        {keys.map((k, i) => (
          <Fragment key={k}>
            <BitmapText colour={keyColor}>{k === " " ? "space" : k}</BitmapText>
            {i < keys.length - 1 && (
              <BitmapText colour={textColor}>/</BitmapText>
            )}
          </Fragment>
        ))}
        <BitmapText colour={spritesheetPalette.metallicBlue}>)</BitmapText>
      </div>
    </div>
  );
};
