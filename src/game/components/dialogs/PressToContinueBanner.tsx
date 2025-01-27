import { BitmapText } from "../Sprite";
import type { Action } from "../../input/InputState";
import { CurrentKeyAssignment } from "./menuDialog/CurrentKeyAssignment";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../../store/hooks";

export const PressToContinueBanner = ({
  action,
  className,
  keyClassName = "text-pink zx:text-zxRed",
}: {
  action: Action;
  className?: string;
  keyClassName?: string;
}) => {
  const inputAssignment = useAppSelector((state) => {
    return state.userSettings.inputAssignment.hold;
  });

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
        <CurrentKeyAssignment
          className="inline"
          keyClassName={keyClassName}
          inputs={inputAssignment}
        />
        <BitmapText>)</BitmapText>
      </div>
    </div>
  );
};
