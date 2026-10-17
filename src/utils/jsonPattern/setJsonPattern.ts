import { produce } from "immer";

import { entries, keys } from "../entries";
import { setAtPath } from "../getAtPath";
import { queryJsonPattern } from "./queryJsonPattern";
import { splitJsonPattern } from "./splitJsonPattern";

export type SetJsonPatternResult<T> = {
  root: T;
  /** the dotted path of every value set */
  paths: string[];
};

type Target = { parentPath: string; key: string };

/** objects and arrays, both indexed by their keys */
const isObjectOrArray = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/** a part naming one key exactly, which can be inserted if absent */
const isPlainKeyPart = (part: string): boolean =>
  !part.startsWith("[") && !part.endsWith("*");

const pathOf = ({ parentPath, key }: Target) =>
  parentPath === "" ? key : `${parentPath}.${key}`;

/**
 * a copy of `root` with `value` put everywhere a json pattern (see
 * `queryJsonPattern`) picks out. A last part naming one key (eg `toRoom`)
 * inserts that key wherever the rest of the pattern matches; any other last
 * part replaces only values already there
 */
export const setJsonPattern = <T>(
  root: T,
  pattern: string,
  value: unknown,
): SetJsonPatternResult<T> => {
  const parts = splitJsonPattern(pattern);
  const lastPart = parts.at(-1);
  if (lastPart === undefined) {
    throw new Error("an empty pattern picks out nothing to set");
  }
  const parents = queryJsonPattern(root, parts.slice(0, -1).join("."));

  const targets = entries(parents)
    .filter(([, parent]) => isObjectOrArray(parent))
    .flatMap(([parentPath, parent]): Target[] =>
      isPlainKeyPart(lastPart) ?
        [{ parentPath, key: lastPart }]
      : keys(queryJsonPattern(parent, lastPart)).map((key) => ({
          parentPath,
          key,
        })),
    );

  const paths = targets.map(pathOf);
  const newRoot = produce(root, (draft) => {
    for (const path of paths) {
      setAtPath(draft as Record<string, unknown>, path, value);
    }
  });
  return { root: newRoot, paths };
};
