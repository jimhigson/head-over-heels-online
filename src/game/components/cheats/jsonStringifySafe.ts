/**
 * JSON.stringify that survives circular references: an object that contains
 * itself (directly or deeper down) is emitted as "[circular]" where it recurs,
 * instead of recursing forever. Objects merely referenced from several places
 * are written out in full each time. For debug output (eg copying game state
 * to the clipboard) - the result is not round-trippable
 */
export const jsonStringifySafe = (
  value: unknown,
  space: number = 2,
): string => {
  /**
   * the objects enclosing the one being visited, outermost first
   */
  const ancestors: object[] = [];
  return JSON.stringify(
    value,
    // a function, not an arrow: the replacer gets the visited value's parent as `this`
    function (this: unknown, _key, visited: unknown) {
      if (typeof visited !== "object" || visited === null) {
        return visited;
      }
      // leave the branches already finished, back up to the parent:
      while (ancestors.length > 0 && ancestors.at(-1) !== this) {
        ancestors.pop();
      }
      if (ancestors.includes(visited)) {
        return "[circular]";
      }
      ancestors.push(visited);
      return visited;
    },
    space,
  );
};
