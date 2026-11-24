import type { NonEmptyTuple, Writable } from "type-fest";

/**
 * a tuple with at least one element. Mutable, unlike type-fest's
 * NonEmptyTuple, so that it can be held in immer-managed state
 */
export type WritableNonEmptyTuple<T> = Writable<NonEmptyTuple<T>>;
