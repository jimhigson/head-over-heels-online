import { AppTicker } from "./AppTicker";

/**
 * the app's clock under test: nothing in the browser drives it - no animation
 * frames, no timers, no clock reads. The world moves only when
 * {@link AppTicker.advance} says so, and by exactly as much as it says, so two
 * runs of the same steps see the same times whatever the machine is doing
 */
export class TestDrivenAppTicker extends AppTicker {
  /** how far along the timeline this ticker drives, which starts at zero */
  #time = 0;

  /** nothing brings ticks in: `advance` is the only thing that emits */
  protected startTicking(): void {}
  protected stopTicking(): void {}

  protected timeAfterAdvance(ms: number): number {
    this.#time += ms;
    return this.#time;
  }
}
