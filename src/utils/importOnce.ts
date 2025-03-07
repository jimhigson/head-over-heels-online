/**
 * Safari has issues if the same module is dynamically imported multiple times.
 * Ensure that the module is only imported once.
 */
export const importOnce = <M, Args extends Array<unknown> = []>(
  importFn: (...args: Args) => Promise<M>,
): ((...args: Args) => Promise<M>) => {
  let promise: Promise<M> | undefined;

  /**
   * @parm args - note that only the first call's args are used. It is not supported
   * to import twice with different args
   */
  return (...args) => {
    if (!promise) {
      promise = importFn(...args);
    }

    return promise;
  };
};

/**
 * Like importOnce, but for react; the returned function throws a promise
 * if called but not loaded to take up to the nearest suspense boundary
 */
export const importOnceForReactSuspense = <
  Result,
  Args extends Array<unknown> = [],
>(
  importFn: (...args: Args) => Promise<Result>,
): ((...args: Args) => Result) => {
  let result: Result | undefined;
  let promise: Promise<Result> | undefined;

  /**
   * @parm args - note that only the first call's args are used. It is not supported
   * to import twice with different args
   */
  return (...args) => {
    if (result) {
      return result;
    }

    if (!promise) {
      promise = importFn(...args).then((r) => {
        result = r;
        return r;
      });
    }

    throw promise;
  };
};
