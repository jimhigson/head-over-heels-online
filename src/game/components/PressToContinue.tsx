import { BitmapText } from "./Sprite";
import type { Action, KeyAssignment } from "../input/InputState";
import { Fragment } from "react/jsx-runtime";
import { textScale } from "./dialogScales";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import type { Color } from "pixi.js";
import { cx } from "class-variance-authority";

export const PressToContinue = ({
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
    <div className={cx("text-left", `mt-${textScale * 2}`, className)}>
      <BitmapText scale={4} color={textColor}>
        Press
      </BitmapText>
      <BitmapText scale={4} color={keyColor}>
        {action}
      </BitmapText>
      <BitmapText scale={4} color={spritesheetPalette.metallicBlue}>
        to continue
      </BitmapText>
      <div>
        <BitmapText scale={4} color={textColor}>
          (
        </BitmapText>
        {keys.map((k, i) => (
          <Fragment key={k}>
            <BitmapText scale={4} color={keyColor}>
              {k === " " ? "space" : k}
            </BitmapText>
            {i < keys.length - 1 && (
              <BitmapText scale={4} color={textColor}>
                /
              </BitmapText>
            )}
          </Fragment>
        ))}
        <BitmapText scale={4} color={spritesheetPalette.metallicBlue}>
          )
        </BitmapText>
      </div>
    </div>
  );
};
