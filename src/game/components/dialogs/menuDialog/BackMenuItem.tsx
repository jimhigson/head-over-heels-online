import { backToParentMenu } from "../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../store/useDispatchCallback";
import { MenuItem } from "./MenuItem";

export const BackMenuItem = () => {
  return (
    <MenuItem
      id="back"
      label="Back"
      flipLeader
      doubleHeightWhenFocussed
      onSelect={useDispatchActionCallback(backToParentMenu)}
    />
  );
};
