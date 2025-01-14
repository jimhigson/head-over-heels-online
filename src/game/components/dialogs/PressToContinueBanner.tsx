import { BitmapText } from "../Sprite";
import type { Action, KeyAssignment } from "../../input/InputState";
import { Fragment } from "react/jsx-runtime";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import type { Color } from "pixi.js";
import { cx } from "class-variance-authority";
import { useContext } from "react";
import { ScaleFactorContext } from "../ScaleFactorContext";

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
  const scaleFactor = useContext(ScaleFactorContext);
  const keys = keyAssignment[action];

  return (
    <div className={cx("text-left", `mt-${scaleFactor * 2}`, className)}>
      <BitmapText color={textColor}>Press</BitmapText>
      <BitmapText color={keyColor}>{action}</BitmapText>
      <BitmapText color={spritesheetPalette.metallicBlue}>
        to continue
      </BitmapText>
      <div>
        <BitmapText color={textColor}>(</BitmapText>
        {keys.map((k, i) => (
          <Fragment key={k}>
            <BitmapText color={keyColor}>{k === " " ? "space" : k}</BitmapText>
            {i < keys.length - 1 && (
              <BitmapText color={textColor}>/</BitmapText>
            )}
          </Fragment>
        ))}
        <BitmapText color={spritesheetPalette.metallicBlue}>)</BitmapText>
      </div>
    </div>
  );
};
