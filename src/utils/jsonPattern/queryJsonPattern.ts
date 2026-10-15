import { entries } from "../entries";
import { matchesJsonPatternPart } from "./matchesJsonPatternPart";
import { splitJsonPattern } from "./splitJsonPattern";

/** objects and arrays, both indexed by their keys */
const isObjectOrArray = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const propertyAt = (value: unknown, propertyPath: string[]): unknown =>
  propertyPath.reduce<unknown>(
    (current, property) =>
      isObjectOrArray(current) ? current[property] : undefined,
    value,
  );

/**
 * everything in `root` that a json pattern (see `matchesJsonPatternPart`)
 * picks out, keyed by its dotted path from `root`. The pattern's first part
 * matches `root`'s own keys - eg over a room's items, `door1`, `[type=door]`
 * or `*.position`
 */
export const queryJsonPattern = (
  root: unknown,
  pattern: string,
): Record<string, unknown> => {
  let matches: Array<[path: string[], value: unknown]> = [[[], root]];

  for (const part of splitJsonPattern(pattern)) {
    matches = matches.flatMap(([path, value]) =>
      isObjectOrArray(value) ?
        entries(value)
          .filter(([key, childValue]) =>
            matchesJsonPatternPart(part, key, (propertyPath) =>
              propertyAt(childValue, propertyPath),
            ),
          )
          .map(([key, childValue]): [string[], unknown] => [
            [...path, key],
            childValue,
          ])
      : [],
    );
  }

  return Object.fromEntries(
    matches.map(([path, value]) => [path.join("."), value]),
  );
};
