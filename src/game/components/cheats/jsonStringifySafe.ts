/**
 * JSON.stringify that survives circular references: any object seen more
 * than once is emitted as "[circular]" instead of recursing forever. For
 * debug output (eg copying game state to the clipboard) - the result is not
 * round-trippable
 */
export const jsonStringifySafe = (
  value: unknown,
  space: number = 2,
): string => {
  const seen = new WeakSet<object>();
  return JSON.stringify(
    value,
    (_key, visited: unknown) => {
      if (typeof visited === "object" && visited !== null) {
        if (seen.has(visited)) {
          return "[circular]";
        }
        seen.add(visited);
      }
      return visited;
    },
    space,
  );
};
