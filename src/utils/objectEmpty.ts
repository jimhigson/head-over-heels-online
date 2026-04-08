/** Check if a plain object has no enumerable properties, without counting them all. Only plain objects are supported. */
export const objectEmpty = (obj: object): boolean => {
  for (const _unused in obj) return false;
  return true;
};
