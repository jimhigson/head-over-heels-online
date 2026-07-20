import { twMerge } from "tailwind-merge";

import { menuLeaderBackChar } from "../../../../../sprites/spritesheet/spritesheetData/hudChars";
import { backToParentMenu } from "../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../store/useDispatchActionCallback";
import { useMenuItem } from "./menus/useMenuItem";

/**
 * a back button for the top-left of the screen, like in iOS
 */
export const MobileStyleBackButton = ({
  class: className,
}: {
  class?: string;
}) => {
  const onSelect = useDispatchActionCallback(backToParentMenu);

  const { menuItemProps, ref, focussed } = useMenuItem({
    id: "back",
    onSelect,
  });

  return (
    <div
      {...menuItemProps}
      class={twMerge(
        "flex flex-row gap-1 cursor-pointer " +
          (focussed ? "selectedMenuItem" : ""),
        className,
      )}
      data-to-parent-menu={true}
      ref={ref}
    >
      <span class="text-double-height">{menuLeaderBackChar}</span>
      <span class="text-double-height">Back</span>
    </div>
  );
};
