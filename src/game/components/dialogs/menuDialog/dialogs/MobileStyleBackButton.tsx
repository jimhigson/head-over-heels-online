import { twMerge } from "tailwind-merge";

import { backToParentMenu } from "../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../store/useDispatchActionCallback";
import { BitmapText } from "../../../tailwindSprites/Sprite";
import { useMenuItem } from "./menus/useMenuItem";

/**
 * a back button for the top-left of the screen, like in iOS
 */
export const MobileStyleBackButton = ({
  className,
}: {
  className?: string;
}) => {
  const onSelect = useDispatchActionCallback(backToParentMenu);

  const { menuItemProps, ref, focussed } = useMenuItem({
    id: "back",
    onSelect,
  });

  return (
    <div
      {...menuItemProps}
      className={twMerge(
        ` ` +
          ` sprites-double-height flex flex-row gap-1 ` +
          (focussed ? "selectedMenuItem" : ""),
        className,
      )}
      ref={ref}
    >
      <BitmapText className="inline-block scale-x-[-1]">{"⏩⏩"}</BitmapText>
      <BitmapText className="inline-block">{"Back"}</BitmapText>
    </div>
  );
};
