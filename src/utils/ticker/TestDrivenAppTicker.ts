import { AppTicker, deltaTimeUnitValue } from "./AppTicker";

/**
 * Version of AppTicker for tests. Does not tick on its own, only when the tests tell
 * it to advance time - pixi equivalent of turning on mock timers in vite; allows tests
 * to be highly deterministic since nothing relies on system clock
 */
export class TestDrivenAppTicker extends AppTicker {
  /** how soon is now? */
  #time = 0;

  /** does nothing since only the test-specific `advance` moves time forward */
  protected startTicking(): void {}
  protected stopTicking(): void {}

  /**
   * advance in one tick by this many ms
   */
  advance(ms: number): void {
    // set directly rather than through setFrameTimings: the fps floor is there
    // to tame a stalled tab, and would truncate the jump that was asked for
    this.elapsedMS = ms;
    this.deltaMS = ms * this.speed;
    this.deltaTime = this.deltaMS * deltaTimeUnitValue;

    // listeners cap their own step by minFPS for the same reason, so lift it:
    const minFpsBeforeJump = this.minFPS;
    this.minFPS = 0;
    this.emit();
    this.minFPS = minFpsBeforeJump;

    this.#time += ms;
    this.lastTime = this.#time;
  }
}
