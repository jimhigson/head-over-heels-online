import { startAppListening } from "./store/listenerMiddleware";
import { continueWithRefresh } from "./store/slices/continueWithRefresh";
import { needRefreshMenuShown } from "./store/slices/gameMenus/gameMenusSlice";
import { store } from "./store/store";

export const onNeedRefresh = (updateSW: (updatePage: boolean) => void) => {
  store.dispatch(needRefreshMenuShown());

  startAppListening({
    actionCreator: continueWithRefresh,
    effect() {
      updateSW(true);
    },
  });
};
