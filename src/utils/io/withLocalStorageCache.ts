/**
 * Wraps an async function with a localStorage cache.
 * Network-first strategy: on success, caches the result;
 * on failure (e.g. offline), falls back to the cached value.
 */
export const withLocalStorageCache =
  <Args extends unknown[], T>(
    /** prefix of the key to cache under */
    keyFn: (...args: Args) => string,
    /** the async function to wrap */
    fn: (...args: Args) => Promise<T>,
  ) =>
  (...args: Args) => {
    const key = keyFn(...args);
    return fn(...args)
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
