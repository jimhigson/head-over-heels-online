// a bit of type voodoo to get the types that can be toggled on/off - ie, the boolean

import type { ConditionalPickDeep, Paths, Split } from "type-fest";

type StringObject = object;

// properties, at any depth in the slice state:
type PathsOfBooleansNodesOrObjectsWithBooleans<T extends StringObject> = Paths<
  ConditionalPickDeep<T, boolean>
> &
  string;
type PathsSplit<T extends StringObject> = Split<
  PathsOfBooleansNodesOrObjectsWithBooleans<T>,
  "."
>;
type PathsSplitWithMultipleNodes<T extends StringObject> = PathsSplit<T> &
  [string, string];
export type ToggleablePaths<
  T extends StringObject,
  TAllPaths = PathsOfBooleansNodesOrObjectsWithBooleans<T>,
  TExcluePaths = PathsSplitWithMultipleNodes<T>[0],
> = Exclude<TAllPaths, TExcluePaths>;
