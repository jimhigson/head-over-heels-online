import { backToParentMenu } from "../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../store/useDispatchActionCallback";
import { MenuItem } from "./MenuItem";

export const BackMenuItem = ({ customLabel }: { customLabel?: string }) => {
  return (
    <MenuItem
      id="back"
      label={customLabel || "Back"}
      flipLeader
      doubleHeightWhenFocussed
      onSelect={useDispatchActionCallback(backToParentMenu)}
    />
  );
};
