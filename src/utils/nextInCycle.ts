export const nextInCycle = <T>(arr: Readonly<T[]> | T[], current: T) => {
  const curIndex = arr.indexOf(current);
  return arr[(curIndex + 1) % arr.length];
};
