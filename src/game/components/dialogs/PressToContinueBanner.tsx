import { twMerge } from "tailwind-merge";

import { detectDeviceType } from "../../../utils/detectDeviceType";
import { BitmapText } from "../tailwindSprites/Sprite";
import { CurrentKeyAssignments } from "./menuDialog/CurrentKeyAssignment";

export const PressToContinueBanner = ({
  className,
  keyClassName = "text-pink zx:text-zxRed",
}: {
  className?: string;
  keyClassName?: string;
}) => {
  return (
    <div className={`${className} bg-zxBlack py-oneScaledPix`}>
      {detectDeviceType() === "desktop" ?
        <>
          <BitmapText>Press to continue:</BitmapText>
          <div className="flex flex-row gap-1 w-min mx-auto">
            <CurrentKeyAssignments
              className="flex flex-row gap-1"
              keyClassName={keyClassName}
              action="hold"
            />
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
