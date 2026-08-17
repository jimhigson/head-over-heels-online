/* a store the imperative side can share with the component tree: monaco's view
   zones and the server poll live outside preact - they push into these, and
   anything rendered from them re-renders */

import { useEffect, useState } from "preact/hooks";

export type Store<T> = {
  get: () => T;
  set: (next: T) => void;
  subscribe: (listener: () => void) => () => void;
};

export const makeStore = <T,>(initial: T): Store<T> => {
  let value = initial;
  const listeners = new Set<() => void>();
  return {
    get: () => value,
    set(next: T) {
      value = next;
      for (const listener of listeners) {
        listener();
      }
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
};

export const useStore = <T,>(store: Store<T>): T => {
  const [, bump] = useState(0);
  useEffect(() => store.subscribe(() => bump((version) => version + 1)), [store]);
  return store.get();
};

export type ToastKind = "done" | "info" | "warn";

export type Toast = {
  id: number;
  text: string;
  kind: ToastKind;
  leaving: boolean;
};

export const toastStore = makeStore<Toast[]>([]);

let lastToastId = 0;

export const toast = (text: string, kind: ToastKind = "info"): void => {
  const id = (lastToastId += 1);
  toastStore.set([...toastStore.get(), { id, text, kind, leaving: false }]);
  setTimeout(
    () =>
      toastStore.set(
        toastStore.get().map((entry) => (entry.id === id ? { ...entry, leaving: true } : entry)),
      ),
    7_000,
  );
  setTimeout(() => toastStore.set(toastStore.get().filter((entry) => entry.id !== id)), 7_600);
};
