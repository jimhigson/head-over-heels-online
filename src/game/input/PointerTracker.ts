import mitt from "mitt";

import { IdleTracker } from "../../utils/idle/IdleTracker";
import { originXyz, xyzEqual } from "../../utils/vectors/vectors";
import type { InputStateTrackerInterface } from "./InputStateTracker";

/**
 * every mouse action counts as the pointer being in use, not only movement -
 * clicking without moving should keep pointer-summoned ui on screen. All carry
 * clientX/clientY, so a handler can both detect use and read the position
 */
export const pointerActivityEvents = [
  "pointermove",
  "pointerdown",
  "pointerup",
] as const satisfies readonly (keyof WindowEventMap)[];

export type PointerTrackerEvents = {
  /**
   * {@link PointerTracker.active}, the position or {@link PointerTracker.overCanvas} changed
   */
  change: void;
};

/**
 * The mouse, for pointers the game draws itself in place of the operating
 * system's: whether one is in use, and where.
 * Knows nothing about how a pointer is drawn, so every renderer of one follows
 * the same tracker and they all appear, move and disappear together.
 *
 * In use until the mouse has been still for the idle tracker's countdown. Stops
 * being in use at once, rather than waiting out the countdown, when a direction
 * is pressed (the player has switched to keys or a pad), when the pointer is not
 * a mouse, and when the pointer leaves the window.
 *
 * Listens on `window`, since a mouse anywhere on screen counts: scoping to an
 * element could not work for a pointer that hides itself, as a hidden element
 * receives no pointer events to bring it back.
 */
export class PointerTracker {
  readonly events = mitt<PointerTrackerEvents>();

  #inputStateTracker: InputStateTrackerInterface;
  #idleTracker = new IdleTracker();

  #active = false;
  // held as scalars so a move costs no allocation
  #clientX = 0;
  #clientY = 0;
  #overCanvas = false;
  #frame = 0;

  constructor(inputStateTracker: InputStateTrackerInterface) {
    this.#inputStateTracker = inputStateTracker;
  }

  /**
   * whether the mouse is in use - a pointer is drawn, and pointer-summoned ui shown
   */
  get active(): boolean {
    return this.#active;
  }

  get clientX(): number {
    return this.#clientX;
  }

  get clientY(): number {
    return this.#clientY;
  }

  /**
   * whether the pointer is directly over a canvas - not over
   * dom drawn on top of it
   */
  get overCanvas(): boolean {
    return this.#overCanvas;
  }

  start(): void {
    if (import.meta.env.MODE === "visual-regression") {
      // the mouse never counts as in use, so pointer-summoned ui is a function
      // of the touch-controls setting alone and screenshots cannot catch it
      // mid-countdown. Playwright's own clicks would otherwise summon it
      return;
    }

    this.#idleTracker.events.on("active", this.#handleActive);
    this.#idleTracker.events.on("idle", this.#handleIdle);

    for (const eventName of pointerActivityEvents) {
      window.addEventListener(eventName, this.#handlePointerActivity, {
        passive: true,
      });
    }
    // the os cursor takes over once outside the window
    document.documentElement.addEventListener(
      "pointerleave",
      this.#idleTracker.makeIdleNow,
    );
    window.addEventListener("blur", this.#idleTracker.makeIdleNow);
  }

  stop(): void {
    for (const eventName of pointerActivityEvents) {
      window.removeEventListener(eventName, this.#handlePointerActivity);
    }
    document.documentElement.removeEventListener(
      "pointerleave",
      this.#idleTracker.makeIdleNow,
    );
    window.removeEventListener("blur", this.#idleTracker.makeIdleNow);

    this.#idleTracker.makeIdleNow();
    this.#idleTracker.events.off("active", this.#handleActive);
    this.#idleTracker.events.off("idle", this.#handleIdle);
  }

  #isSteering(): boolean {
    return !xyzEqual(this.#inputStateTracker.directionVector, originXyz);
  }

  #handlePointerActivity = (e: PointerEvent) => {
    // a mouse nudged while steering must not summon the pointer back
    if (e.pointerType !== "mouse" || this.#isSteering()) {
      this.#idleTracker.makeIdleNow();
      return;
    }
    this.#clientX = e.clientX;
    this.#clientY = e.clientY;
    this.#overCanvas = e.target instanceof HTMLCanvasElement;
    if (this.#active) {
      this.events.emit("change");
    }
    // on becoming active, emits change itself
    this.#idleTracker.markActive();
  };

  #handleActive = () => {
    this.#active = true;
    this.#frame = requestAnimationFrame(this.#watchSteering);
    this.events.emit("change");
  };

  #handleIdle = () => {
    cancelAnimationFrame(this.#frame);
    this.#active = false;
    this.events.emit("change");
  };

  /**
   * a held direction sends no events of its own, so steering is polled
   */
  #watchSteering = () => {
    if (this.#isSteering()) {
      this.#idleTracker.makeIdleNow();
      return;
    }
    this.#frame = requestAnimationFrame(this.#watchSteering);
  };
}
