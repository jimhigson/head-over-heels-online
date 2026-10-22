import { startAppListening } from "./store/listenerMiddleware";
import { continueWithRefresh } from "./store/slices/continueWithRefresh";
import { needRefreshMenuShown } from "./store/slices/gameMenus/gameMenusSlice";
import { store } from "./store/store";
import { appTicker } from "./utils/ticker/appTickerInstance";

export const onNeedRefresh = (updateSW: (updatePage: boolean) => void) => {
  store.dispatch(needRefreshMenuShown({ openedAt: appTicker.time }));

  startAppListening({
    actionCreator: continueWithRefresh,
    effect() {
      updateSW(true);
    },
  });
};
