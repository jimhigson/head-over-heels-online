import { BitmapText } from "../Sprite";
import type { Action } from "../../input/InputState";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import type { Color } from "pixi.js";
import { cx } from "class-variance-authority";
import { CurrentKeyAssignment } from "./menu/CurrentKeyAssignment";

export const PressToContinueBanner = ({
  action,
  className,
  textColor = spritesheetPalette.metallicBlue,
  keyColor = spritesheetPalette.pink,
}: {
  action: Action;
  className?: string;
  textColor?: Color;
  keyColor?: Color;
}) => {
  return (
    <div className={cx("text-left", `mt-1`, className)}>
      <BitmapText colour={textColor}>Press</BitmapText>
      <BitmapText colour={keyColor}>{action}</BitmapText>
      <BitmapText colour={spritesheetPalette.metallicBlue}>
        to continue
      </BitmapText>
      <div>
        <BitmapText colour={textColor}>(</BitmapText>
        <CurrentKeyAssignment
          className="inline"
          action="hold"
          keyColor={keyColor}
          deliminatorColor={textColor}
        />
        <BitmapText colour={spritesheetPalette.metallicBlue}>)</BitmapText>
      </div>
    </div>
  );
};
