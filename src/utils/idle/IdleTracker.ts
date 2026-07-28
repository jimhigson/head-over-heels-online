import mitt from "mitt";

/**
 * considered idle this long after the last activity - shared by the software
 * pointer and the hud's pointer-summoned buttons, so the two appear and
 * disappear together
 */
const idleAfterMs = 2_000;

export type IdleTrackerEvents = {
  /** nothing has called {@link IdleTracker.markActive} for {@link idleAfterMs} */
  idle: void;
  /** activity again, having previously been idle */
  active: void;
};

/**
 * Emits when activity stops for a while, and when it starts again. Knows
 * nothing about what the activity is, so it serves both an event-driven
 * consumer (the software pointer, which hides on the `idle` event) and a
 * per-tick polling one (the hud's buttons, which read {@link IdleTracker.idle}).
 */
export class IdleTracker {
  readonly events = mitt<IdleTrackerEvents>();

  #idle = true;
  #lastActiveAtMs = -Infinity;
  #timeout: number | undefined;

  /** true while there has been no activity for {@link idleAfterMs} */
  get idle() {
    return this.#idle;
  }

  markActive() {
    this.#lastActiveAtMs = performance.now();
    // one timer stays armed across a whole burst of activity, rather than
    // being torn down and remade on every call - activity can be as frequent
    // as pointer moves
    this.#timeout ??= window.setTimeout(this.#onTimeout, idleAfterMs);

    if (this.#idle) {
      this.#idle = false;
      this.events.emit("active");
    }
  }

  /** become idle immediately, without waiting out the remaining time */
  makeIdleNow = () => {
    window.clearTimeout(this.#timeout);
    this.#timeout = undefined;
    this.#becomeIdle();
  };

  #onTimeout = () => {
    const remainingMs =
      idleAfterMs - (performance.now() - this.#lastActiveAtMs);
    if (remainingMs > 0) {
      this.#timeout = window.setTimeout(this.#onTimeout, remainingMs);
      return;
    }
    this.#timeout = undefined;
    this.#becomeIdle();
  };

  #becomeIdle = () => {
    if (this.#idle) {
      return;
    }
    this.#idle = true;
    this.events.emit("idle");
  };

  destroy() {
    window.clearTimeout(this.#timeout);
    this.#timeout = undefined;
    this.events.all.clear();
  }
}
