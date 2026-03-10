/**
 * Wraps an async function with a localStorage cache.
 * Network-first strategy: on success, caches the result;
 * on failure (e.g. offline), falls back to the cached value.
 */
export const withLocalStorageCache =
  <O, T>(
    /** prefix of the key to cache under */
    keyFn: (options: O) => string,
    /** the async function to wrap */
    fn: (options: O) => Promise<T>,
  ) =>
  (options: O) => {
    const key = keyFn(options);
    return fn(options)
      .then((result) => {
        localStorage.setItem(key, JSON.stringify(result));
        return result;
      })
      .catch((e) => {
        const cached = localStorage.getItem(key);
        if (cached !== null) {
          return JSON.parse(cached) as T;
        }
        throw e;
      });
  };
