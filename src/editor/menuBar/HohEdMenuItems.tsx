import { store } from "../../store/store";
import { MenuItem } from "../../ui/menuBar/MenuItem";
import { showAboutDialogThunk } from "./about/showAboutDialogThunk";

/**
 * the HohEd menu: about the editor itself
 */
export const HohEdMenuItems = () => (
  <MenuItem
    label="About"
    onSelect={() => store.dispatch(showAboutDialogThunk())}
  />
);
