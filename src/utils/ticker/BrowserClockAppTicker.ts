import { AppTicker } from "./AppTicker";

/**
 * The ticker that the game uses - gets swopped out in tests for
 * TestDrivenAppTicker.
 *
 * Is the only code in the game that reads a real clock, so that tests
 * can use their fake clock instead
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
    } else {
      this.setFrameTimings(time - this.lastTime);
      this.emit();
      this.lastTime = time;
    }

    // set up the next frame
    this.#requestFrame();
  };

  #requestFrame(): void {
    if (this.#animationFrameRequestId === undefined && this.hasListeners) {
      this.#animationFrameRequestId = requestAnimationFrame(this.#tick);
    }
  }

  protected override startTicking(): void {
    if (this.#animationFrameRequestId === undefined && this.hasListeners) {
      // measure the first frame from now, not from whenever the loop last ran
      this.lastTime = performance.now();
      this.#requestFrame();
    }
  }

  protected override stopTicking(): void {
    if (this.#animationFrameRequestId !== undefined) {
      cancelAnimationFrame(this.#animationFrameRequestId);
      this.#animationFrameRequestId = undefined;
    }
  }
}
