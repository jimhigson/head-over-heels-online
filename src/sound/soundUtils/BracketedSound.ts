import { connectWithGain } from "./connectWithGain";
import {
  createAudioNode,
  type CreateAudioNodeOptionsObject,
} from "./createAudioNode";
import { stopWithFade } from "./stopWithFade";

/** options for the start, stop, or end of a sound */
export type BracketedSegmentOptions = Omit<
  CreateAudioNodeOptionsObject,
  "connectTo" | "loop"
> & {
  gain?: number;
};

export type BracketedSoundOptions = {
  start?: BracketedSegmentOptions;
  change?: BracketedSegmentOptions;
  loop?: BracketedSegmentOptions;
  stop?: BracketedSegmentOptions;
  loopAlwaysFadesIn?: boolean;
  startAndLoopTogether?: boolean;
  // play the start sound if already active on the first tick (eg entering a room)
  startOnFirstFrame?: boolean;
};

/**
 * whether a bracket's value means its sound is active. "Off" is expressed
 * either as no value at all, or as `false` for the boolean-valued brackets -
 * so a meaningful falsy value (such as the direction index `0`) still counts
 * as active, and only changes the sound rather than stopping it.
 */
const isActive = <Value>(value: Value): boolean =>
  value !== undefined && value !== false;

export class BracketedSound<Value = boolean> {
  readonly #start: BracketedSegmentOptions | undefined;
  readonly #change: BracketedSegmentOptions | undefined;
  readonly #loop: BracketedSegmentOptions | undefined;
  readonly #stop: BracketedSegmentOptions | undefined;
  readonly #loopAlwaysFadesIn: boolean;
  readonly #startAndLoopTogether: boolean;
  readonly #startOnFirstFrame: boolean;
  readonly #connectTo: AudioNode;

  #isFirstFrame = true;
  #currentSound: AudioBufferSourceNode | undefined;
  #currentGain: GainNode | undefined;
  #currentValue: undefined | Value;

  constructor(
    {
      start,
      change,
      loop,
      stop,
      loopAlwaysFadesIn = false,
      startAndLoopTogether = false,
      startOnFirstFrame = false,
    }: BracketedSoundOptions,
    connectTo: AudioNode,
  ) {
    this.#start = start;
    this.#change = change;
    this.#loop = loop;
    this.#stop = stop;
    this.#loopAlwaysFadesIn = loopAlwaysFadesIn;
    this.#startAndLoopTogether = startAndLoopTogether;
    this.#startOnFirstFrame = startOnFirstFrame;
    this.#connectTo = connectTo;
  }

  #playLoop(loop: BracketedSegmentOptions) {
    this.#currentSound = createAudioNode({ ...loop, loop: true });
    this.#currentGain = connectWithGain(
      this.#currentSound,
      loop,
      this.#connectTo,
      this.#loopAlwaysFadesIn,
    );
  }

  #playStart(start: BracketedSegmentOptions) {
    const loop = this.#loop;
    // stop in case was playing the end sound and is starting up again
    // TODO: this is good for charles, but bad for (eg, the ski heads in the gym trying
    // to play the start sound too often)
    if (this.#currentSound && this.#currentGain) {
      this.#currentSound.onended = null;
      stopWithFade(this.#currentSound, this.#currentGain);
    }

    this.#currentSound = createAudioNode({ ...start });
    this.#currentGain = connectWithGain(
      this.#currentSound,
      start,
      this.#connectTo,
    );

    if (loop === undefined) {
      return;
    }
    if (this.#startAndLoopTogether) {
      // play the loop while the start is already playing, without stopping the start:
      this.#playLoop(loop);
    } else {
      // once the start sound finishes, start the 'loop' sound:
      this.#currentSound.onended = () => {
        if (!isActive(this.#currentValue)) {
          return;
        }
        if (this.#currentSound && this.#currentGain) {
          // here, stopping usually isn't needed, but there is an edge case where
          // since creating this sound and adding the onended, another loop sound
          // has started playing, especially if starting and stopping quickly, which
          // leads to an unstoppable loop sound playing forever (unstoppable because no
          // reference to it remains)
          this.#currentSound.onended = null;
          stopWithFade(this.#currentSound, this.#currentGain);
        }
        this.#playLoop(loop);
      };
    }
  }

  #stopLoop() {
    if (this.#currentSound && this.#currentSound.loop && this.#currentGain) {
      this.#currentSound.onended = null;
      stopWithFade(this.#currentSound, this.#currentGain);
    }
  }

  tick(value: Value) {
    const startedOrStopped = isActive(value) !== isActive(this.#currentValue);
    if (startedOrStopped) {
      if (isActive(value)) {
        if (
          this.#start !== undefined &&
          (!this.#isFirstFrame || this.#startOnFirstFrame)
        ) {
          this.#playStart(this.#start);
        } else if (this.#loop !== undefined) {
          // no start but we have a loop - play the loop on activation
          this.#playLoop(this.#loop);
        }
      } else {
        // stopping - we let the start sound play out if it is still playing
        this.#stopLoop();
        if (this.#stop !== undefined) {
          this.#currentSound = createAudioNode({ ...this.#stop });
          this.#currentGain = connectWithGain(
            this.#currentSound,
            this.#stop,
            this.#connectTo,
          );
        }
      }
    } else if (this.#currentValue !== value && this.#change !== undefined) {
      // a change of the value - this can potentially play at the same
      // time as the loop, without stopping the loop
      const changeSound = createAudioNode({ ...this.#change });
      const changeGain = connectWithGain(
        changeSound,
        this.#change,
        this.#connectTo,
      );
      changeSound.onended = () => {
        changeSound.disconnect();
        changeGain.disconnect();
      };
    }
    this.#isFirstFrame = false;
    this.#currentValue = value;
  }

  /**
   * silently ends the sound: any loop fades out, and neither the stop sound
   * nor a pending loop plays
   */
  destroy() {
    const currentSound = this.#currentSound;
    if (currentSound === undefined) {
      return;
    }
    if (currentSound.loop) {
      this.#stopLoop();
    } else {
      // a start sound still playing must not go on to start the loop
      currentSound.onended = null;
    }
  }
}
