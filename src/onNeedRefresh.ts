/**
 * imported dynamically: this module is reachable from the registerAppSW
 * dynamic-import root, and a static import of the store graph here would make
 * rolldown merge everything the store reaches (including pixi's renderers)
 * into one eager shared chunk, defeating pixi's lazy renderer loading in
 * autoDetectRenderer
 */
export const onNeedRefresh = async (
  updateSW: (updatePage: boolean) => void,
) => {
  const [
    { store },
    { startAppListening },
    { continueWithRefresh },
    { needRefreshMenuShown },
  ] = await Promise.all([
    import("./store/store"),
    import("./store/listenerMiddleware"),
    import("./store/slices/continueWithRefresh"),
    import("./store/slices/gameMenus/gameMenusSlice"),
  ]);

  store.dispatch(needRefreshMenuShown());

  startAppListening({
    actionCreator: continueWithRefresh,
    effect() {
      updateSW(true);
    },
  });
};
