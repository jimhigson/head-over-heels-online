import { type Get, type Paths } from "type-fest";

/** the default split strategy: a dot-delimited path, eg `a.b.c` */
const splitDotPath = (path: string): string[] => path.split(".");

export const getAtPath = <O extends object, P extends Paths<O> & string>(
  obj: O,
  path: P,
  /**
   * how to break the path into its segments. Defaults to splitting a dot path.
   * Pass a JSON Pointer splitter (one that strips the leading `/` and decodes
   * `~1`/`~0`) to read at a runtime pointer whose keys may contain slashes.
   */
  split: (path: string) => string[] = splitDotPath,
): Get<O, P> =>
  split(path).reduce<unknown>(
    (node, key) =>
      node == null ? undefined : (node as Record<string, unknown>)[key],
    obj,
  ) as Get<O, P>;

export const setAtPath = <O extends object, P extends Paths<O> & string>(
  obj: O,
  path: P,
  value: Get<O, P>,
  /** how to break the path into its segments; see {@link getAtPath} */
  split: (path: string) => string[] = splitDotPath,
): void => {
  const segments = split(path);

  let current = obj as Record<string, unknown>;
  for (let i = 0; i < segments.length - 1; i++) {
    current = current[segments[i]] as Record<string, unknown>;
  }
  current[segments[segments.length - 1]] = value;
};
