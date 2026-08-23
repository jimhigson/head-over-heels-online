/* the two halves of a changed file's path, split the same way everywhere it
   needs splitting - the filename to read, and the directory it lives in */

export const basename = (path: string): string => path.slice(path.lastIndexOf("/") + 1);

export const dirname = (path: string): string =>
  path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "";
