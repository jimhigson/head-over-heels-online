export const emptyArray = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emptySet = new Set<any>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emptyMap = new Map<any, any>();

emptySet.add = () => {
  throw new Error("emptySet.add");
};
emptySet.clear = () => {
  throw new Error("emptySet.clear");
};

export const emptyObject = Object.freeze({});
