import { createListenerMiddleware } from "@reduxjs/toolkit";
import { menuItemSelected } from "./gameMenusSlice";
import type { AppDispatch, RootState } from "./store";
import { menus } from "../game/components/dialogs/menuDialog/menus";

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
startAppListening({
  actionCreator: menuItemSelected,
  async effect(action, { dispatch, getState, getOriginalState }) {
    const originalState = getOriginalState();
    const originalMenu = originalState.menus.at(0)?.menuId;

    const {
      menus: [{ menuId, selectedIndex }],
    } = getState();

    if (originalMenu !== menuId) {
      // switched to this menu, which maybe just happens to have a switch first - in that case,
      // don't flip the switch on going to the submenu
      return;
    }

    const menu = menus[menuId];
    const selectedMenuItem = menu.items.at(selectedIndex);
    if (
      selectedMenuItem !== undefined &&
      selectedMenuItem.type === "switch" &&
      selectedMenuItem.dispatch
    ) {
      dispatch(selectedMenuItem.dispatch);
    }
  },
});
