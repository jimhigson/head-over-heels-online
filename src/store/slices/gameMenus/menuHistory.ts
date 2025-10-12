import type { AppStore } from "../../store";

import { startAppListening } from "../../listenerMiddleware";
import { restoreMenusFromHistory } from "./gameMenusSlice";

export const connectHistoryToMenusInStore = (store: AppStore) => {
  startAppListening({
    predicate(
      action,
      { gameMenus: { openMenus: curOpenMenus } },
      { gameMenus: { openMenus: prevOpenMenus } },
    ) {
      return (
        !restoreMenusFromHistory.match(action) &&
        (curOpenMenus.length !== prevOpenMenus.length ||
          curOpenMenus.some(
            (curMenu, index) => curMenu.menuId !== prevOpenMenus[index].menuId,
          ))
      );
    },
    effect(_action, listenerApi) {
      const { openMenus } = listenerApi.getState().gameMenus;

      console.log("pushing state", { openMenus });
      history.pushState({ openMenus }, "", window.location.href);
    },
  });

  window.addEventListener("popstate", (event) => {
    if (event.state?.openMenus) {
      store.dispatch(restoreMenusFromHistory(event.state.openMenus));
    }
  });
};
