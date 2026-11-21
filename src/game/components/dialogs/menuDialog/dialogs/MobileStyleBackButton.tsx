import { twMerge } from "tailwind-merge";

import { closeMenuThunk } from "../../../../../store/slices/gameMenus/closeMenuThunk";
import { useDispatchActionCallback } from "../../../../../store/useDispatchActionCallback";
import type { DialogId } from "../DialogId";
import { useMenuItem } from "./menus/useMenuItem";

export type MobileStyleBackButtonProps = {
  /**
   * the dialog this button is in, which it closes
   */
  dialogId: DialogId;
  class?: string;
};

/**
 * a back button for the top-left of the screen, like in iOS
 */
export const MobileStyleBackButton = ({
  dialogId,
  class: className,
}: MobileStyleBackButtonProps) => {
  const onSelect = useDispatchActionCallback(closeMenuThunk, dialogId);

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
      <span class="text-double-height">{"<<"}</span>
      <span class="text-double-height">Back</span>
    </div>
  );
};
