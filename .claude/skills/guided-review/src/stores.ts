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

export type ToastAction = { label: string; onClick: () => void };

export type Toast = {
  id: number;
  text: string;
  kind: ToastKind;
  leaving: boolean;
  actions?: ToastAction[];
};

export const toastStore = makeStore<Toast[]>([]);

let lastToastId = 0;

const hideToast = (id: number): void => {
  toastStore.set(
    toastStore.get().map((entry) => (entry.id === id ? { ...entry, leaving: true } : entry)),
  );
};

const removeToast = (id: number): void => {
  toastStore.set(toastStore.get().filter((entry) => entry.id !== id));
};

/** dismiss immediately - what an action button does with its own toast, so it
    doesn't linger after being acted on */
export const dismissToast = (id: number): void => {
  removeToast(id);
};

type DismissTimers = { hideTimer: ReturnType<typeof setTimeout>; removeTimer: ReturnType<typeof setTimeout> };

const scheduleAutoDismiss = (id: number, onRemoved?: () => void): DismissTimers => ({
  hideTimer: setTimeout(() => hideToast(id), 7_000),
  removeTimer: setTimeout(() => {
    removeToast(id);
    onRemoved?.();
  }, 7_600),
});

/** a toast carrying actions asks for a decision, so it waits for one rather
    than vanishing on the usual timer. Returns the new toast's id, for a
    caller that wants to replace or dismiss it later */
export const toast = (text: string, kind: ToastKind = "info", actions?: ToastAction[]): number => {
  const id = (lastToastId += 1);
  toastStore.set([...toastStore.get(), { id, text, kind, leaving: false, actions }]);
  if (actions === undefined || actions.length === 0) {
    scheduleAutoDismiss(id);
  }
  return id;
};

/* "path updated" coalesces repeats for the same path into a running count -
   an agent iterating on a fix can save the same file several times in a few
   seconds, and a fresh toast per save reads as spam rather than signal. Each
   new occurrence cancels the previous dismiss timers so the toast keeps
   resetting its own clock instead of vanishing mid-flurry. */
const fileUpdateToasts = new Map<string, { id: number; count: number } & DismissTimers>();

export const toastFileUpdated = (path: string): void => {
  const existing = fileUpdateToasts.get(path);
  const count = (existing?.count ?? 0) + 1;
  const text =
    count === 1 ?
      `${path} updated — diff refreshed`
    : `${path} updated ${count} times — diff refreshed`;

  if (existing !== undefined) {
    clearTimeout(existing.hideTimer);
    clearTimeout(existing.removeTimer);
    toastStore.set(
      toastStore
        .get()
        .map((entry) => (entry.id === existing.id ? { ...entry, text, leaving: false } : entry)),
    );
    fileUpdateToasts.set(path, {
      id: existing.id,
      count,
      ...scheduleAutoDismiss(existing.id, () => fileUpdateToasts.delete(path)),
    });
    return;
  }

  const id = (lastToastId += 1);
  toastStore.set([...toastStore.get(), { id, text, kind: "done", leaving: false }]);
  fileUpdateToasts.set(path, {
    id,
    count,
    ...scheduleAutoDismiss(id, () => fileUpdateToasts.delete(path)),
  });
};
