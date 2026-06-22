import { type Get, type Paths } from "type-fest";

export const getAtPath = <O extends object, P extends Paths<O> & string>(
  obj: O,
  path: P,
  /** separator between path segments; pass "/" for JSON Pointer-style paths */
  delimiter = ".",
): Get<O, P> =>
  path
    .split(delimiter)
    .reduce(
      (acc: object, key) => (acc as Record<string, object>)[key],
      obj,
    ) as Get<O, P>;

export const setAtPath = <O extends object, P extends Paths<O> & string>(
  obj: O,
  path: P,
  value: Get<O, P>,
  /** separator between path segments; pass "/" for JSON Pointer-style paths */
  delimiter = ".",
): void => {
  const pathNodes = path.split(delimiter);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = obj;
  for (let i = 0; i < pathNodes.length - 1; i++) {
    const key = pathNodes[i];
    current = current[key];
  }

  current[pathNodes[pathNodes.length - 1]] = value;
};
