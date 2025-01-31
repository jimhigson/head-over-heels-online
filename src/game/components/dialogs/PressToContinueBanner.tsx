import { BitmapText } from "../Sprite";
import type { BooleanAction } from "../../input/InputState";
import { CurrentKeyAssignments } from "./menuDialog/CurrentKeyAssignment";
import { twMerge } from "tailwind-merge";

export const PressToContinueBanner = ({
  action,
  className,
  keyClassName = "text-pink zx:text-zxRed",
}: {
  action: BooleanAction;
  className?: string;
  keyClassName?: string;
}) => {
  return (
    <div
      className={twMerge(
        "text-metallicBlue zx:text-zxBlue text-left",
        className,
      )}
    >
      <BitmapText className="me-1">Press</BitmapText>
      <BitmapText className={twMerge("me-1", keyClassName)}>
        {action}
      </BitmapText>
      <BitmapText>key to continue</BitmapText>
      <div>
        <BitmapText>(</BitmapText>
        <CurrentKeyAssignments
          className="inline"
          keyClassName={keyClassName}
          action="hold"
        />
        <BitmapText>)</BitmapText>
      </div>
    </div>
  );
};
