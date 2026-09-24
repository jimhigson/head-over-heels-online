/**
 * the value found by following a dotted path (eg `gameMenus.openMenus.0`)
 * from the root, or undefined if the path leads nowhere
 */
export const valueAtPath = (
  root: unknown,
  /** dotted path; empty for the root itself */
  path: string,
): unknown => {
  let value = root;
  for (const segment of path.split(".").filter((s) => s !== "")) {
    if (typeof value !== "object" || value === null) {
      return undefined;
    }
    value = (value as Record<string, unknown>)[segment];
  }
  return value;
};
