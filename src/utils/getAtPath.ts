import type { Paths } from "type-fest";

export const getAtPath = <O extends object>(obj: O, path: Paths<O> & string) =>
  path
    .split(".")
    .reduce((acc: object, key) => (acc as Record<string, object>)[key], obj);
