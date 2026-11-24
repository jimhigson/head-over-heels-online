/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NonEmptyTuple, Writable } from "type-fest";

type NonEmptyStrings = NonEmptyTuple<string>;
type NonEmptyObjects = NonEmptyTuple<{ a: number; b?: string }>;
type NonEmptyUnions = NonEmptyTuple<{ type: "x" } | { type: "y" }>;
type HoldsNonEmpty = { items: NonEmptyTuple<string>; other: number };
type OptionalElementTuple = [string, number?];
type WritableNonEmptyStrings = Writable<NonEmptyTuple<string>>;
