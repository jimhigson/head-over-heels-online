import { backToParentMenu } from "../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../store/useDispatchCallback";
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
