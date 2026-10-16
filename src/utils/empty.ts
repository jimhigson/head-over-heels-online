export const emptyArray = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emptySet = new Set<any>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emptyMap = new Map<any, any>();

emptySet.add = () => {
  throw new Error("emptySet.add");
};
emptySet.clear = () => {
  throw new Error("emptySet.clear");
};

emptyMap.set = () => {
  throw new Error("emptyMap.set");
};
emptyMap.clear = () => {
  throw new Error("emptyMap.clear");
};
emptyMap.delete = () => {
  throw new Error("emptyMap.delete");
};

export const emptyObject = Object.freeze({});

const doneResult: IteratorReturnResult<undefined> = Object.freeze({
  done: true,
  value: undefined,
});

/**
 * an immutable iterator that always has zero elements; all methods all return without allocating -
 * chaining methods return the same instance
 */
class EmptyIterator implements IteratorObject<never, undefined, unknown> {
  readonly [Symbol.toStringTag] = "Empty Iterator";
  next(): IteratorReturnResult<undefined> {
    return doneResult;
  }
  [Symbol.iterator](): EmptyIterator {
    return this;
  }
  map(): EmptyIterator {
    return this;
  }
  filter(): EmptyIterator {
    return this;
  }
  take(): EmptyIterator {
    return this;
  }
  drop(): EmptyIterator {
    return this;
  }
  flatMap(): EmptyIterator {
    return this;
  }
  reduce(callbackfn: unknown): never;
  reduce<U>(callbackfn: unknown, initialValue: U): U;
  reduce<U>(_callbackfn: unknown, ...initialValue: [] | [U]): U {
    if (initialValue.length === 0) {
      throw new TypeError("reduce of empty iterator with no initial value");
    }
    return initialValue[0];
  }
  toArray(): never[] {
    return emptyArray;
  }
  forEach(): void {}
  [Symbol.dispose](): void {}
  some(): boolean {
    return false;
  }
  every(): boolean {
    return true;
  }
  find(): undefined {
    return undefined;
  }
}

export const emptyIterator = new EmptyIterator();

export const isEmptyObject = (obj: object): boolean => {
  for (const _ in obj) {
    return false;
  }
  return true;
};
