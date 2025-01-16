import { createListenerMiddleware } from "@reduxjs/toolkit";
import { menuItemSelected } from "./gameMenusSlice";
import type { AppDispatch, RootState } from "./store";
import { menus } from "@/game/components/dialogs/menuDialog/menus";

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
startAppListening({
  actionCreator: menuItemSelected,
  async effect(action, { dispatch, getState }) {
    const {
      menus: [{ menuId, selectedIndex }],
    } = getState();
    const menu = menus[menuId];
    const selectedMenuItem = menu.items[selectedIndex];
    if (selectedMenuItem.type === "switch" && selectedMenuItem.dispatch) {
      dispatch(selectedMenuItem.dispatch);
    }
  },
});
