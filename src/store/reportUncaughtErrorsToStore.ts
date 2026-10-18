import { createSerialisableErrors } from "../utils/redux/createSerialisableErrors";
import { errorCaught } from "./slices/errors/errorsSlice";
import { type AppStore } from "./store";

/**
 * the last resort for errors: anything thrown that nothing else caught (eg from
 * a thunk dispatched by an event handler) is reported as a caught error. Code
 * that catches an error and reports it itself must not rethrow it, or it would
 * be reported twice
 */
export const reportUncaughtErrorsToStore = (store: AppStore) => {
  window.addEventListener("error", ({ error }: ErrorEvent) => {
    // error events with nothing thrown are browser notices, eg ResizeObserver
    // loops, not failures:
    if (error === null) {
      return;
    }
    store.dispatch(errorCaught(createSerialisableErrors(error)));
  });
  window.addEventListener(
    "unhandledrejection",
    ({ reason }: PromiseRejectionEvent) => {
      store.dispatch(errorCaught(createSerialisableErrors(reason)));
    },
  );
};
