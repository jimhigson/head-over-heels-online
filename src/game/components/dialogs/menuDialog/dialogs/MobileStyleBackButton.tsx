import { twMerge } from "tailwind-merge";

import { backToParentMenu } from "../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../store/useDispatchCallback";
import { BitmapText } from "../../../tailwindSprites/Sprite";

/**
 * a back button for the top-left of the screen, like in iOS
 */
export const MobileStyleBackButton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        `text-redShadow zx:text-zxMagenta sprites-double-height flex flex-row gap-1`,
        className,
      )}
    >
      <BitmapText
        className="inline-block scale-[-1]"
        onClick={useDispatchActionCallback(backToParentMenu)}
      >
        {"⏩⏩"}
      </BitmapText>
      <BitmapText
        className="inline-block"
        onClick={useDispatchActionCallback(backToParentMenu)}
      >
        {"Back"}
      </BitmapText>
    </div>
  );
};
