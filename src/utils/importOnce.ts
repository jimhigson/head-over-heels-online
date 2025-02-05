/**
 * Safari has issues if the same module is dynamically imported multiple times.
 * Ensure that the module is only imported once.
 */
export const importOnce = <M>(
  importFn: () => Promise<M>,
): (() => Promise<M>) => {
  let promise: Promise<M> | undefined;

  return () => {
    if (!promise) {
      promise = importFn();
    }

    return promise;
  };
};
