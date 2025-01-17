import { BitmapText } from "../Sprite";
import type { Action } from "../../input/InputState";
import { CurrentKeyAssignment } from "./menuDialog/CurrentKeyAssignment";
import { twMerge } from "tailwind-merge";

export const PressToContinueBanner = ({
  action,
  className,
  keyClassName = "sprite-tint-pink",
}: {
  action: Action;
  className?: string;
  keyClassName?: string;
}) => {
  return (
    <div
      className={twMerge(
        "sprite-tint-metallicBlue text-left",
        `mt-1`,
        className,
      )}
    >
      <BitmapText>Press</BitmapText>
      <BitmapText className={keyClassName}>{action}</BitmapText>
      <BitmapText>to continue</BitmapText>
      <div>
        <BitmapText>(</BitmapText>
        <CurrentKeyAssignment
          className="inline"
          keyClassName={keyClassName}
          action="hold"
        />
        <BitmapText>)</BitmapText>
      </div>
    </div>
  );
};
