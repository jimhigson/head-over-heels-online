import { type SpriteOption } from "../../store/slices/userSettings/userSettingsSlice";

/**
 * the events the game emits for end-to-end tests to wait on. Add a new key here
 * (and a matching {@link emitE2eEvent} call at the point it happens) to give a
 * spec a precise signal to wait for instead of a fixed delay.
 */
export type E2eEventMap = {
  /** a room has rendered its first frame; carries the room that rendered */
  firstRenderOfRoom: { roomId: string };
  /** a frame was rendered reflecting the given sprite option */
  spriteOptionRendered: { spriteOption: SpriteOption };
};

export type E2eEventName = keyof E2eEventMap;

/**
 * a logged event. `detail` is stored as `unknown` because a single log holds
 * every event name's detail type; a waiter narrows it back with a name check
 * (see {@link createE2eEventBus}) - TypeScript cannot narrow `E2eEventMap[N]`
 * through the heterogeneous log on its own.
 */
type E2eLoggedEvent = {
  id: number;
  name: E2eEventName;
  detail: unknown;
};

export type E2eEventWaitOptions<N extends E2eEventName> = {
  /**
   * only events whose id is at least this value are considered - capture it with
   * {@link E2eEventBus.cursor} *before* triggering the action that causes the
   * event, so an event that fires before this wait is set up is still caught
   */
  afterId: number;
  timeoutMs: number;
  /** further narrow which event of this name resolves the wait */
  match?: (detail: E2eEventMap[N]) => boolean;
};

/**
 * a tiny event bus exposed on `window.__e2e_events` in visual-regression builds.
 *
 * Unlike a bare `EventTarget`, it keeps a bounded log of recent events so a
 * waiter can match an event that already fired: a test captures {@link cursor}
 * before acting, triggers the action, then {@link waitFor} resolves from the log
 * if the event already happened, or waits live otherwise. This removes the
 * attach-listener-then-act race that would otherwise need a retry.
 */
export type E2eEventBus = {
  emit: <N extends E2eEventName>(name: N, detail: E2eEventMap[N]) => void;
  /** the id the next emitted event will carry - a bookmark for "now" */
  cursor: () => number;
  waitFor: <N extends E2eEventName>(
    name: N,
    options: E2eEventWaitOptions<N>,
  ) => Promise<E2eEventMap[N]>;
};

/** how many recent events the bus remembers for after-the-fact matching */
const logCapacity = 512;

const createE2eEventBus = (): E2eEventBus => {
  const log: E2eLoggedEvent[] = [];
  let nextId = 0;
  const listeners = new Set<(event: E2eLoggedEvent) => void>();

  return {
    emit(name, detail) {
      const event: E2eLoggedEvent = { id: nextId++, name, detail };
      log.push(event);
      if (log.length > logCapacity) {
        log.shift();
      }
      // copy so a listener removing itself mid-iteration is safe
      for (const listener of [...listeners]) {
        listener(event);
      }
    },
    cursor() {
      return nextId;
    },
    waitFor<N extends E2eEventName>(
      name: N,
      { afterId, timeoutMs, match }: E2eEventWaitOptions<N>,
    ): Promise<E2eEventMap[N]> {
      // narrowing by name is what makes reading `detail` as this name's type
      // sound; TypeScript cannot see that through the heterogeneous log:
      const matches = (event: E2eLoggedEvent): boolean =>
        event.name === name &&
        event.id >= afterId &&
        (match === undefined || match(event.detail as E2eEventMap[N]));

      const buffered = log.find(matches);
      if (buffered !== undefined) {
        return Promise.resolve(buffered.detail as E2eEventMap[N]);
      }

      return new Promise<E2eEventMap[N]>((resolve, reject) => {
        const listener = (event: E2eLoggedEvent) => {
          if (matches(event)) {
            listeners.delete(listener);
            clearTimeout(timer);
            resolve(event.detail as E2eEventMap[N]);
          }
        };
        const timer = setTimeout(() => {
          listeners.delete(listener);
          reject(
            new Error(
              `timed out waiting for e2e event "${name}" after ${timeoutMs}ms`,
            ),
          );
        }, timeoutMs);
        listeners.add(listener);
      });
    },
  };
};

/**
 * get the singleton bus, creating it on first use. The bus is shared between the
 * game (which emits) and the tests (which read `window.__e2e_events`), so it
 * lives on the window rather than in module scope.
 */
export const installE2eEventBus = (): E2eEventBus =>
  (window.__e2e_events ??= createE2eEventBus());

export const emitE2eEvent = <N extends E2eEventName>(
  name: N,
  detail: E2eEventMap[N],
): void => {
  installE2eEventBus().emit(name, detail);
};
