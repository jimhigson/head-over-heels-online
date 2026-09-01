import { AppTicker } from "./AppTicker";

/**
 * the app's clock in normal play: animation frames bring the ticks in, each
 * carrying the time the browser reports since the last one. The only place in
 * the app that reads a real clock
 */
export class BrowserClockAppTicker extends AppTicker {
  /** the pending animation frame, or undefined when none is scheduled */
  #animationFrameRequestId: number | undefined = undefined;

  #tick = (time: number) => {
    this.#animationFrameRequestId = undefined;

    if (!this.started) {
      return;
    }

    if (time <= this.lastTime) {
      this.setFrameTimings(0);
      this.lastTime = time;
    } else if (!this.isTooSoonAfterLastFrame(time)) {
      this.setFrameTimings(time - this.lastTime);
      this.emit();
      this.lastTime = time;
    }

    this.#requestFrame();
  };

  #requestFrame(): void {
    if (this.#animationFrameRequestId === undefined && this.hasListeners) {
      this.#animationFrameRequestId = requestAnimationFrame(this.#tick);
    }
  }

  protected startTicking(): void {
    if (this.#animationFrameRequestId === undefined && this.hasListeners) {
      // measure the first frame from now, not from whenever the loop last ran
      this.lastTime = this.lastFrame = performance.now();
      this.#requestFrame();
    }
  }

  protected stopTicking(): void {
    if (this.#animationFrameRequestId !== undefined) {
      cancelAnimationFrame(this.#animationFrameRequestId);
      this.#animationFrameRequestId = undefined;
    }
  }

  protected timeAfterAdvance(): number {
    // the advance itself took real time, and driving it from a test takes more.
    // Resuming from now keeps that out of the next frame's elapsed
    return performance.now();
  }
}
