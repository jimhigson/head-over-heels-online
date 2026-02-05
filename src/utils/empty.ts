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

emptyMap.set = () => {
  throw new Error("emptyMap.set");
};
emptyMap.clear = () => {
  throw new Error("emptyMap.clear");
};
emptyMap.delete = () => {
  throw new Error("emptyMap.delete");
};

export const emptyObject = Object.freeze({});
