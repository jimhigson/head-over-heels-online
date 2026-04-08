// Teach TypeScript that `IterableIterator<T>` has the iterator helper methods
// (.map, .filter, .toArray, etc.) that shipped with the Stage 4 proposal in
// Node 22+ and modern browsers. TS 5.6+ added these methods to a *new* type
// `IteratorObject<T>` rather than to `IterableIterator<T>`, to avoid breaking
// code that implements `IterableIterator` by hand without the helpers.
// Generator functions and other native iterators return `IterableIterator<T>`,
// so without this augmentation their helper methods are invisible to TypeScript.
//
// Safe here because this codebase has no custom `IterableIterator`
// implementations; every such value at runtime comes from a native iterator
// that does inherit from `Iterator.prototype` and has the helpers.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IterableIterator<T, TReturn = undefined, TNext = unknown>
    extends IteratorObject<T, TReturn, TNext> {}
}

export {};
