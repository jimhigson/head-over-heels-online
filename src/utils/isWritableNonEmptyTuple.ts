import type { WritableNonEmptyTuple } from "./types/WritableNonEmptyTuple";

export const isWritableNonEmptyTuple = <T>(
  array: T[],
): array is WritableNonEmptyTuple<T> => array.length > 0;
