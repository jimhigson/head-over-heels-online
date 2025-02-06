import type { Get, Paths } from "type-fest";

export const getAtPath = <O extends object, P extends Paths<O> & string>(
  obj: O,
  path: P,
): Get<O, P> =>
  path
    .split(".")
    .reduce(
      (acc: object, key) => (acc as Record<string, object>)[key],
      obj,
    ) as Get<O, P>;

export const setAtPath = <O extends object, P extends Paths<O> & string>(
  obj: O,
  path: P,
  value: Get<O, P>,
): void => {
  const pathNodes = path.split(".");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = obj;
  for (let i = 0; i < pathNodes.length - 1; i++) {
    const key = pathNodes[i];
    current = current[key];
  }

  current[pathNodes[pathNodes.length - 1]] = value;
};
