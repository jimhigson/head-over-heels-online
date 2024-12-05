export const emptyArray = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emptySet = new Set<any>();

emptySet.add = () => {
  throw new Error("emptySet.add");
};
emptySet.clear = () => {
  throw new Error("emptySet.clear");
};

export const emptyObject = Object.freeze({});
