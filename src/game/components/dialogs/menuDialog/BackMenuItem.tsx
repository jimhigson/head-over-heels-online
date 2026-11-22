import { closeMenuThunk } from "../../../../store/slices/gameMenus/closeMenuThunk";
import { useDispatchActionCallback } from "../../../../store/useDispatchActionCallback";
import type { DialogId } from "./DialogId";
import { MenuItem } from "./MenuItem";

export type BackMenuItemProps = {
  /**
   * the dialog this item is in, which it closes
   */
  dialogId: DialogId;
  customLabel?: string;
};

export const BackMenuItem = ({ dialogId, customLabel }: BackMenuItemProps) => {
  return (
    <MenuItem
      id="back"
      label={customLabel || "Back"}
      isBack
      doubleHeightWhenFocussed
      onSelect={useDispatchActionCallback(closeMenuThunk, dialogId)}
      toParentMenu={true}
    />
  );
};
