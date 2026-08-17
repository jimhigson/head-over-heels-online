import { type EmptyObject } from "type-fest";

import { type CharacterName } from "../../model/modelTypes";
import { type SpriteOption } from "../../store/slices/userSettings/userSettingsSlice";
import { type Xy } from "../../utils/vectors/vectors";

export type E2EEventBusPayloadMap = {
  characterChanged: { characterName: CharacterName };
  frameRendered: {
    roomId: string;
    spriteOption: SpriteOption;
    cameraAngle: Xy;
  };
  /** ticks stopped drawing anything, whatever they are waiting on */
  renderingSuspended: EmptyObject;
  /** ticks draw again */
  renderingResumed: EmptyObject;
};

export type E2EEventBusEventName = keyof E2EEventBusPayloadMap;

type LoggedEventByName = {
  [N in E2EEventBusEventName]: {
    atClock: number;
    name: N;
    payload: E2EEventBusPayloadMap[N];
  };
};

type LoggedEvent<N extends E2EEventBusEventName> = LoggedEventByName[N];

type AnyLoggedEvent = LoggedEventByName[E2EEventBusEventName];

/** Options when waiting on the event bus */
export type E2EEventBusWaitOptions<N extends E2EEventBusEventName> = {
  /**
   * get a clock time first, then ask for only
   * events after your given clock time
   */
  afterClock: number;
  timeoutMs: number;
  match?: (payload: E2EEventBusPayloadMap[N]) => boolean;
};

const logLength = 512;

/**
 * logger for e2e tests can wait on events that happen in-game
 * includes memory so that it is possible (mandatory even)
 * to 'listen' on events that happen before the listening starts,
 * after a given cursor number, to avoid race conditions between
 * listeners being attached and the events firing
 */
export class E2EEventBus {
  #log = new Map<
    /*
     * log key'd per event name so that frequent events can't
     * displace rarer ones
     */
    E2EEventBusEventName,
    AnyLoggedEvent[]
  >();
  #clock = 0;
  #listeners = new Set<(event: AnyLoggedEvent) => void>();

  static singleton(): E2EEventBus {
    return (window.__e2e_events ??= new E2EEventBus());
  }

  static emit<N extends E2EEventBusEventName>(
    name: N,
    payload: E2EEventBusPayloadMap[N],
  ): void {
    E2EEventBus.singleton().emit(name, payload);
  }

  emit<N extends E2EEventBusEventName>(
    name: N,
    payload: E2EEventBusPayloadMap[N],
  ): void {
    // ts can't check a literal against a still-generic type:
    const event = { atClock: this.#clock++, name, payload } as LoggedEvent<N>;
    const log = this.#log.get(name) ?? [];
    log.push(event);
    if (log.length > logLength) {
      log.shift();
    }
    this.#log.set(name, log);
    // copy: listeners may self-remove
    for (const listener of [...this.#listeners]) {
      listener(event);
    }
  }

  /** id for the next event */
  cursor(): number {
    return this.#clock;
  }

  waitFor<N extends E2EEventBusEventName>(
    name: N,
    { afterClock, timeoutMs, match }: E2EEventBusWaitOptions<N>,
  ): Promise<E2EEventBusPayloadMap[N]> {
    // === can't narrow on a type parameter; the predicate can:
    const matches = (event: AnyLoggedEvent): event is LoggedEvent<N> =>
      event.name === name &&
      event.atClock >= afterClock &&
      (match === undefined || match(event.payload as E2EEventBusPayloadMap[N]));

    const buffered = this.#log.get(name)?.find(matches);
    if (buffered !== undefined) {
      return Promise.resolve(buffered.payload);
    }

    return new Promise<E2EEventBusPayloadMap[N]>((resolve, reject) => {
      const listener = (event: AnyLoggedEvent) => {
        if (matches(event)) {
          this.#listeners.delete(listener);
          clearTimeout(timer);
          resolve(event.payload);
        }
      };
      const timer = setTimeout(() => {
        this.#listeners.delete(listener);
        reject(
          new Error(
            `timed out waiting for e2e event "${name}" after ${timeoutMs}ms`,
          ),
        );
      }, timeoutMs);
      this.#listeners.add(listener);
    });
  }
}
