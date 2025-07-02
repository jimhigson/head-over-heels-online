export const catchErrors = <Params extends unknown[], Return>(
  fn: (...args: Params) => Return,
  errorHandler: (error: unknown) => void = console.error,
): ((...args: Params) => Return | undefined) => {
  return (...args: Params) => {
    try {
      return fn(...args);
    } catch (error) {
      errorHandler(error);
      return undefined;
    }
  };
};
