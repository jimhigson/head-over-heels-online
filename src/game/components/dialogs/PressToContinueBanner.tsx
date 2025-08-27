import { twMerge } from "tailwind-merge";

import type { BooleanAction } from "../../input/actions";

import { detectDeviceType } from "../../../utils/detectDeviceType";
import { BitmapText } from "../tailwindSprites/Sprite";
import { CurrentKeyAssignments } from "./menuDialog/CurrentKeyAssignment";

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
    <div className={`${className} bg-zxBlack py-oneScaledPix`}>
      {detectDeviceType() === "desktop" ?
        <>
          <BitmapText className="me-1">Press</BitmapText>
          <BitmapText className={twMerge("me-1", keyClassName)}>
            {action}
          </BitmapText>
          <BitmapText>to continue</BitmapText>
          <div className="flex flex-row gap-1 w-min mx-auto">
            <BitmapText>(</BitmapText>
            <CurrentKeyAssignments
              className="flex flex-row gap-1"
              keyClassName={keyClassName}
              action="hold"
            />
            <BitmapText>)</BitmapText>
          </div>
        </>
      : <>
          <BitmapText className={twMerge("me-1", keyClassName)}>Tap</BitmapText>
          <BitmapText>to continue</BitmapText>
        </>
      }
    </div>
  );
};
