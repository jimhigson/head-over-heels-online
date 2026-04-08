/** Count the number of enumerable properties on a plain object without creating an intermediate array. Only plain objects are supported. */
export const objectSize = (obj: object): number => {
  let count = 0;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _ in obj) count++;
  return count;
};
