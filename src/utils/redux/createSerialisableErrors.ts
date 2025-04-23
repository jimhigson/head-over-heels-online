/**
 * Error objects aren't serialisable (per redux definition) so let them be serialised
 * here
 */
export type SerialisableError = {
  message: string;
  stack?: string;
};

export const createSerialisableErrors = (
  thrown: unknown,
): Array<SerialisableError> => {
  const serialisableErrors: Array<SerialisableError> = [];

  for (
    let ti: unknown = thrown;
    ti !== undefined;
    ti = ti instanceof Error ? ti.cause : undefined
  ) {
    if (ti instanceof Error) {
      serialisableErrors.push({
        message: ti.message,
        stack: ti.stack,
      });
    }
  }

  return serialisableErrors;
};
