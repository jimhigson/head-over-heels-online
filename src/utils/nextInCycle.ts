export const nextInCycle = <T>(
  arr: Readonly<T[]> | T[],
  current: T,
  equals: (a: T, b: T) => boolean = (a, b) => a === b,
) => {
  const curIndex = arr.findIndex((item) => equals(item, current));
  return arr[(curIndex + 1) % arr.length];
};
