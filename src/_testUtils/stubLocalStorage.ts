const store = new Map<string, string>();

const stubLocalStorage = {
  getItem(key: string) {
    return store.get(key) ?? null;
  },
  setItem(key: string, value: string) {
    store.set(key, value);
  },
  removeItem(key: string) {
    store.delete(key);
  },
  clear() {
    store.clear();
  },
  get length() {
    return store.size;
  },
  key(index: number) {
    return [...store.keys()][index] ?? null;
  },
} satisfies Storage;

// defined rather than assigned: dom environments expose localStorage as a getter
Object.defineProperty(globalThis, "localStorage", {
  value: stubLocalStorage,
  configurable: true,
});
