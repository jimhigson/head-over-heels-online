export const iterate = <T, TReturn = undefined, TNext = undefined>(
  iterable: Iterable<T, TReturn, TNext>,
) => iterable[Symbol.iterator]() as IteratorObject<T, TReturn, TNext>;
