import { type Ticker as PixiTicker } from "pixi.js";

import { AppTickerListener } from "./AppTickerListener";

/**
 * `this` takes the context as optional so a plain `(ticker) => …` - the common
 * case, with no context at all - is assignable
 */
export type AppTickerCallback<Context> = (
  this: Context | undefined,
  ticker: AppTicker,
) => void;

/**
 * frames per millisecond that `deltaTime` is expressed relative to, ie 60fps.
 * deltaTime is a pixi convention of how many 60fps (arbitrarily chosen) frames
 * worth of time have passed
 */
export const deltaTimeUnitValue = 60 / 1_000;

/**
 * the same numbers as pixi's `UPDATE_PRIORITY`
 */
export const updatePriority = {
  interaction: 50,
  high: 25,
  normal: 0,
  low: -25,
  utility: -50,
} as const;

/**
 * Abstract class for a reimplementation of the pixi ticker
 */
export abstract class AppTicker {
  /** @see https://pixijs.download/release/docs/ticker.Ticker.html#autoStart */
  autoStart = true;
  /** @see https://pixijs.download/release/docs/ticker.Ticker.html#started */
  started = false;

  /** @see https://pixijs.download/release/docs/ticker.Ticker.html#elapsedMS */
  elapsedMS = 1 / deltaTimeUnitValue;
  /** @see https://pixijs.download/release/docs/ticker.Ticker.html#deltaMS */
  deltaMS = 1 / deltaTimeUnitValue;
  /** @see https://pixijs.download/release/docs/ticker.Ticker.html#deltaTime */
  deltaTime = 1;
  /** @see https://pixijs.download/release/docs/ticker.Ticker.html#lastTime */
  lastTime = -1;
  /** @see https://pixijs.download/release/docs/ticker.Ticker.html#speed */
  speed = 1;

  /** from minFPS: the longest tick allowed, so a stalled tab cannot teleport */
  #maxElapsedMS = 100;
  #head = AppTickerListener.of(undefined, undefined, Infinity);

  protected abstract startTicking(): void;
  protected abstract stopTicking(): void;

  protected get hasListeners(): boolean {
    return this.#head.next !== undefined;
  }

  /** @see https://pixijs.download/release/docs/ticker.Ticker.html#add */
  add<Context>(
    fn: AppTickerCallback<Context>,
    context?: Context,
    priority: number = updatePriority.normal,
  ): this {
    return this.#addListener(AppTickerListener.of(fn, context, priority));
  }

  /** @see https://pixijs.download/release/docs/ticker.Ticker.html#addOnce */
  addOnce<Context>(
    fn: AppTickerCallback<Context>,
    context?: Context,
    priority: number = updatePriority.normal,
  ): this {
    return this.#addListener(AppTickerListener.of(fn, context, priority, true));
  }

  /** @see https://pixijs.download/release/docs/ticker.Ticker.html#remove */
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

  /** @see https://pixijs.download/release/docs/ticker.Ticker.html#start */
  start(): void {
    if (this.started) {
      return;
    }
    this.started = true;
    this.startTicking();
  }

  /** @see https://pixijs.download/release/docs/ticker.Ticker.html#stop */
  stop(): void {
    if (!this.started) {
      return;
    }
    this.started = false;
    this.stopTicking();
  }

  /**
   * noop destroy, since the app only uses shared and system tickers, which
   * are never destroyed
   *
   * @see https://pixijs.download/release/docs/ticker.Ticker.html#destroy
   */
  destroy(): void {}

  /**
   * takes the time rather than defaulting it to `performance.now()` as pixi
   * does: reading a clock is a subclass's business, not this one's
   *
   * @see https://pixijs.download/release/docs/ticker.Ticker.html#update
   */
  update(currentTime: number): void {
    if (currentTime <= this.lastTime) {
      this.setFrameTimings(0);
      this.lastTime = currentTime;
      return;
    }
    this.setFrameTimings(currentTime - this.lastTime);
    this.emit();
    this.lastTime = currentTime;
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
    this.deltaTime = this.deltaMS * deltaTimeUnitValue;
  }

  /** @see https://pixijs.download/release/docs/ticker.Ticker.html#count */
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

  /** @see https://pixijs.download/release/docs/ticker.Ticker.html#FPS */
  get FPS(): number {
    return 1_000 / this.elapsedMS;
  }

  /** @see https://pixijs.download/release/docs/ticker.Ticker.html#minFPS */
  get minFPS(): number {
    return 1_000 / this.#maxElapsedMS;
  }
  set minFPS(fps: number) {
    const minFramesPerMs = Math.min(
      Math.max(0, fps) / 1_000,
      deltaTimeUnitValue,
    );
    this.#maxElapsedMS = 1 / minFramesPerMs;
  }

  /**
   * capping the frame rate is not implemented - the app never asked for it, so
   * the frame-skipping pixi does for it is not carried here
   *
   * @see https://pixijs.download/release/docs/ticker.Ticker.html#maxFPS
   */
  get maxFPS(): number {
    return 0;
  }
  set maxFPS(fps: number) {
    // I never set maxFPS in-game so don't waste bytes implementing it:
    if (import.meta.env.DEV || import.meta.env.MODE === "visual-regression") {
      throw new Error(`maxFPS is not supported by this ticker (given ${fps})`);
    }
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
 * use typecheck to verify we implement all of pixi's Ticker
 */
type MissingComparedToPixiTicker = Exclude<keyof PixiTicker, keyof AppTicker>;
type CoversPixiTicker<T extends never> = { anything: T };
/* oxlint-disable no-unused-vars */
// next line would have type error if not matching
type _TestCoversPixiTicker = CoversPixiTicker<MissingComparedToPixiTicker>;
/* oxlint-enable no-unused-vars */
