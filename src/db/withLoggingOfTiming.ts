/**
 * e2e-only: narrate a db load for debugging test failures
 */
export const withLoggingOfTiming =
  <Args extends unknown[], T>(
    /** how this load should be named in the log */
    describe: (...args: Args) => string,
    /** the load to narrate */
    load: (...args: Args) => Promise<T>,
  ) =>
  async (...args: Args): Promise<T> => {
    const what = describe(...args);
    const startedAt = performance.now();
    console.log(`[db] ${what} started`);
    try {
      const loaded = await load(...args);
      console.log(
        `[db] ${what} loaded in ${Math.round(performance.now() - startedAt)}ms`,
      );
      return loaded;
    } catch (e) {
      console.log(
        `[db] ${what} failed after ${Math.round(performance.now() - startedAt)}ms: ${e}`,
      );
      throw e;
    }
  };
