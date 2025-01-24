import { menus } from "../../game/components/dialogs/menuDialog/menus";
import { menuItemSelected } from "../gameMenusSlice";
import { startAppListening } from "../listener";

export const addListeners = () => {
  // Add one or more listener entries that look for specific actions.
  // They may contain any sync or async logic, similar to thunks.
  startAppListening({
    actionCreator: menuItemSelected,
    async effect(_action, { dispatch, getState, getOriginalState }) {
      const originalState = getOriginalState();
      const originalMenu = originalState.openMenus.at(0)?.menuId;

      const { openMenus } = getState();

      if (openMenus.length === 0) {
        return;
      }

      const [{ menuId, selectedIndex }] = openMenus;

      if (originalMenu !== menuId) {
        // switched to this menu, which maybe just happens to have a switch first - in that case,
        // don't flip the switch on going to the submenu
        return;
      }

      const menu = menus[menuId];
      const selectedMenuItem = menu.items.at(selectedIndex);

      if (selectedMenuItem === undefined) {
        return;
      }

      if (
        (selectedMenuItem.type === "switch" ||
          selectedMenuItem.type === "dispatch") &&
        selectedMenuItem.dispatch
      ) {
        dispatch(selectedMenuItem.dispatch());
      }
    },
  });
};
