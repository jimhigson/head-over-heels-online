import { audioCtx } from "../audioCtx";
import type { CreateAudioNodeOptionsObject } from "./createAudioNode";
import { createAudioNode } from "./createAudioNode";

export type BracketedSound<Value = boolean> = ReturnType<
  typeof createBracketedSound<Value>
>;

/** options for the start, stop, or end of a sound */
export type BracketedSegmentOptions = Omit<
  CreateAudioNodeOptionsObject,
  "connectTo" | "loop"
> & {
  gain?: number;
};

export type CreateBracketedEventOptions = {
  start?: BracketedSegmentOptions;
  change?: BracketedSegmentOptions;
  loop?: BracketedSegmentOptions;
  stop?: BracketedSegmentOptions;
  startAndLoopTogether?: boolean;
};

/**
 * create a gainNode between the sound and the connectTo node,
 * connect them up and return the gainNode
 */
const connectWithGain = (
  sound: AudioBufferSourceNode,
  gain: number | undefined,
  connectTo: AudioNode,
) => {
  const gainNode = audioCtx.createGain();
  if (gain !== undefined) {
    gainNode.gain.value = gain;
  }
  sound.connect(gainNode);
  gainNode.connect(connectTo);
  return gainNode;
};

export const createBracketedSound = <Value = boolean>(
  {
    start,
    change,
    loop,
    stop,
    startAndLoopTogether = false,
  }: CreateBracketedEventOptions,
  connectTo: AudioNode,
) => {
  let currentSound: AudioBufferSourceNode | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- var left in for later use
  let currentGain: GainNode | undefined;
  let currentValue: Value;

  return (value: Value) => {
    const startedOrStopped = !!value !== !!currentValue;
    if (startedOrStopped) {
      if (value) {
        // starting
        if (start !== undefined) {
          // stop in case was playing the end sound and is starting up again
          // TODO: this is good for charles, but bad for (eg, the ski heads in the gym trying
          // to play the start sound too often)
          currentSound?.stop();
          currentSound = createAudioNode({ ...start });
          currentGain = connectWithGain(currentSound, start.gain, connectTo);

          if (loop !== undefined) {
            if (startAndLoopTogether) {
              // play the loop while the start is already playing, without stopping the start:
              currentSound = createAudioNode({ ...loop, loop: true });
              currentGain = connectWithGain(currentSound, loop.gain, connectTo);
            } else {
              currentSound.onended = () => {
                if (!currentValue) {
                  return;
                }
                currentSound = createAudioNode({
                  ...loop,
                  loop: true,
                });
                currentGain = connectWithGain(
                  currentSound,
                  loop.gain,
                  connectTo,
                );
              };
            }
          }
        } else if (loop !== undefined) {
          // no start but we have a loop - play the loop on activation
          currentSound = createAudioNode({ ...loop, loop: true });
          currentGain = connectWithGain(currentSound, loop.gain, connectTo);
        }
      } else {
        // stopping

        if (currentSound && currentSound.loop) {
          // we let the start sound play out if it is still playing - only the
          // loop sound is always stopped to make way for the end sound
          currentSound.stop();
          currentSound.onended = null;
        }
        if (stop !== undefined) {
          currentSound = createAudioNode({ ...stop });
          currentGain = connectWithGain(currentSound, stop.gain, connectTo);
        }
      }
    } else {
      // not starting or stopping but could be a change:
      if (currentValue !== value) {
        // a change of the value - this can potentially play at the same
        // time as the loop, without stopping the loop
        if (change !== undefined) {
          const changeSound = createAudioNode({ ...change });
          currentGain = connectWithGain(changeSound, change.gain, connectTo);
        }
      }
    }
    currentValue = value;

    /*if (
      currentSound !== undefined &&
      typeof active === "number" &&
      active > 0
    ) {
      currentSound.playbackRate.value = active;
    }*/
  };
};
