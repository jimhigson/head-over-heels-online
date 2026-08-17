import { type Ticker } from "pixi.js";

import { AppTickerListener } from "./AppTickerListener";

/**
 * `this` takes the context as optional so a plain `(ticker) => …` - the common
 * case, with no context at all - is assignable
 */
export type AppTickerCallback<Context> = (
  this: Context | undefined,
  ticker: AppTicker,
) => void;

/** frames per millisecond that `deltaTime` is expressed relative to, ie 60fps */
export const targetFramesPerMs = 0.06;

/**
 * the same numbers as pixi's `UPDATE_PRIORITY`, which the pixi code adding
 * itself to this ticker passes - higher runs first
 */
export const updatePriority = {
  interaction: 50,
  high: 25,
  normal: 0,
  low: -25,
  utility: -50,
} as const;

/**
 * the app's clock, driving the menus before the game engine exists and the game
 * once it does. Stands in for pixi's `Ticker`, installed as pixi's shared one,
 * so sprites, rendering and input all run from this.
 *
 * Holds the listeners and the frame's timings. Nothing here reads a clock or
 * schedules anything - subclasses own where ticks come from
 */
export abstract class AppTicker {
  autoStart = false;
  started = false;

  /** raw time since the last tick, before {@link speed} or any clamping */
  elapsedMS = 1 / targetFramesPerMs;
  /** {@link elapsedMS} clamped by the fps bounds and scaled by {@link speed} */
  deltaMS = 1 / targetFramesPerMs;
  /** {@link deltaMS} as a fraction of a frame at 60fps */
  deltaTime = 1;
  lastTime = -1;
  speed = 1;

  /** from minFPS: the longest tick allowed, so a stalled tab cannot teleport */
  #maxElapsedMS = 100;
  /** from maxFPS: ticks arriving sooner than this are skipped */
  #minElapsedMS = 0;
  /** when the last tick that wasn't skipped by maxFPS ran */
  protected lastFrame = -1;
  #head = AppTickerListener.of(undefined, undefined, Infinity);

  /** begin whatever brings ticks in, if anything does */
  protected abstract startTicking(): void;
  /** stop it again */
  protected abstract stopTicking(): void;
  /** where the timeline stands once an {@link advance} has been emitted */
  protected abstract timeAfterAdvance(ms: number): number;

  protected get hasListeners(): boolean {
    return this.#head.next !== undefined;
  }

  add<Context>(
    fn: AppTickerCallback<Context>,
    context?: Context,
    priority: number = updatePriority.normal,
  ): this {
    return this.#addListener(AppTickerListener.of(fn, context, priority));
  }

  addOnce<Context>(
    fn: AppTickerCallback<Context>,
    context?: Context,
    priority: number = updatePriority.normal,
  ): this {
    return this.#addListener(AppTickerListener.of(fn, context, priority, true));
  }

  remove<Context>(fn: AppTickerCallback<Context>, context?: Context): this {
    let listener = this.#head.next;

    while (listener !== undefined) {
      listener =
        listener.match(fn, context) ? listener.destroy() : listener.next;
    }

    if (!this.hasListeners) {
      this.stopTicking();
    }

    return this;
  }

  start(): void {
    if (this.started) {
      return;
    }
    this.started = true;
    this.startTicking();
  }

  stop(): void {
    if (!this.started) {
      return;
    }
    this.started = false;
    this.stopTicking();
  }

  /**
   * no-op: this ticker outlives any one pixi Application, so tearing the game
   * down must not take the menus' clock with it
   */
  destroy(): void {}

  /**
   * run one tick worth exactly this many milliseconds - how a test moves the
   * world by a stated amount rather than by however long it happened to wait
   */
  advance(ms: number): void {
    // set directly rather than through setFrameTimings: the fps floor is there
    // to tame a stalled tab, and would truncate the jump that was asked for
    this.elapsedMS = ms;
    this.deltaMS = ms * this.speed;
    this.deltaTime = this.deltaMS * targetFramesPerMs;

    // listeners cap their own step by minFPS for the same reason, so lift it:
    const minFpsBeforeJump = this.minFPS;
    this.minFPS = 0;
    this.emit();
    this.minFPS = minFpsBeforeJump;

    this.lastTime = this.lastFrame = this.timeAfterAdvance(ms);
  }

  /** call every listener, in priority order */
  protected emit(): void {
    let listener = this.#head.next;
    while (listener !== undefined) {
      listener = listener.emit(this);
    }

    if (!this.hasListeners) {
      this.stopTicking();
    }
  }

  /** set the frame's timings from a raw elapsed time, applying speed and clamps */
  protected setFrameTimings(rawElapsedMs: number): void {
    this.elapsedMS = rawElapsedMs;
    this.deltaMS = Math.min(rawElapsedMs, this.#maxElapsedMS) * this.speed;
    this.deltaTime = this.deltaMS * targetFramesPerMs;
  }

  /** would maxFPS skip a frame arriving now? Records it as run if not */
  protected isTooSoonAfterLastFrame(currentTime: number): boolean {
    if (this.#minElapsedMS === 0) {
      return false;
    }
    const sinceLastFrame = (currentTime - this.lastFrame) | 0;
    if (sinceLastFrame < this.#minElapsedMS) {
      return true;
    }
    this.lastFrame = currentTime - (sinceLastFrame % this.#minElapsedMS);
    return false;
  }

  get count(): number {
    let count = 0;
    for (
      let listener = this.#head.next;
      listener !== undefined;
      listener = listener.next
    ) {
      count++;
    }
    return count;
  }

  get FPS(): number {
    return 1_000 / this.elapsedMS;
  }

  get minFPS(): number {
    return 1_000 / this.#maxElapsedMS;
  }
  set minFPS(fps: number) {
    const minFps = Math.min(this.maxFPS, fps);
    const minFramesPerMs = Math.min(
      Math.max(0, minFps) / 1_000,
      targetFramesPerMs,
    );
    this.#maxElapsedMS = 1 / minFramesPerMs;
  }

  get maxFPS(): number {
    return this.#minElapsedMS !== 0 ?
        Math.round(1_000 / this.#minElapsedMS)
      : 0;
  }
  set maxFPS(fps: number) {
    if (fps === 0) {
      this.#minElapsedMS = 0;
      return;
    }
    const maxFps = Math.max(this.minFPS, fps);
    this.#minElapsedMS = 1 / (maxFps / 1_000);
  }

  #addListener(listener: AppTickerListener): this {
    let current: AppTickerListener | undefined = this.#head.next;
    let previous = this.#head;

    if (current === undefined) {
      listener.connect(previous);
    } else {
      // descending priority, and equal priorities keep insertion order:
      while (current !== undefined) {
        if (listener.priority > current.priority) {
          listener.connect(previous);
          break;
        }
        previous = current;
        current = current.next;
      }
      if (listener.previous === undefined) {
        listener.connect(previous);
      }
    }

    if (this.started) {
      this.startTicking();
    } else if (this.autoStart) {
      this.start();
    }

    return this;
  }
}

/**
 * compile-time proof that this ticker still covers everything pixi's public
 * `Ticker` api declares, so a pixi upgrade that adds a member breaks the build
 * rather than the game. Only the names are compared: pixi types its callbacks
 * as taking a `Ticker`, which nothing but a `Ticker` can satisfy - the private
 * members on that class make it nominal - so the install site asserts the type
 * and this asserts the shape
 */
type MembersPixiHasThatWeLack = Exclude<keyof Ticker, keyof AppTicker>;
export type AppTickerCoversPixiTicker =
  MembersPixiHasThatWeLack extends never ? true : MembersPixiHasThatWeLack;
