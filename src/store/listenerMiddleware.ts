import { createListenerMiddleware } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "./store";

export const listenerMiddleware = createListenerMiddleware();

/* static listeners (in theory, no reason can't be dynamic) */
export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

/** https://redux-toolkit.js.org/api/createListenerMiddleware#adding-listeners-inside-components -
 * dynamic listeners can be added via dispatching this event */
//export const addAppListener = addListener.withTypes<RootState, AppDispatch>();
