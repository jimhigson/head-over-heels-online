import { createListenerMiddleware, addListener } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "./store";

export const listenerMiddleware = createListenerMiddleware();

/* static listeners */
export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

/** https://redux-toolkit.js.org/api/createListenerMiddleware#adding-listeners-inside-components -
 * dynamic listeners can be added via dispatching this event */
export const addAppListener = addListener.withTypes<RootState, AppDispatch>();
