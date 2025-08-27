import type { CreateAudioNodeOptionsObject } from "./createAudioNode";

import { audioCtx } from "../audioCtx";
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
  // eg, standing on - don't want to play the 'bump' sound on first entering
  // a room and discovering that we are standing on something, only when the
  // state transitions
  noStartOnFirstFrame?: boolean;
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
    noStartOnFirstFrame = true,
  }: CreateBracketedEventOptions,
  connectTo: AudioNode,
) => {
  let isFirstFrame = true;
  let currentSound: AudioBufferSourceNode | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- var left in for later use
  let currentGain: GainNode | undefined;
  let currentValue: Value;

  return (value: Value) => {
    const startedOrStopped = !!value !== !!currentValue;
    if (startedOrStopped) {
      if (value) {
        // starting
        if (start !== undefined && !(isFirstFrame && noStartOnFirstFrame)) {
          // stop in case was playing the end sound and is starting up again
          // TODO: this is good for charles, but bad for (eg, the ski heads in the gym trying
          // to play the start sound too often)
          if (currentSound) {
            currentSound.onended = null;
            currentSound.stop();
          }

          currentSound = createAudioNode({ ...start });
          currentGain = connectWithGain(currentSound, start.gain, connectTo);

          if (loop !== undefined) {
            if (startAndLoopTogether) {
              // play the loop while the start is already playing, without stopping the start:

              currentSound = createAudioNode({ ...loop, loop: true });
              currentGain = connectWithGain(currentSound, loop.gain, connectTo);
            } else {
              // once the start sound finishes, start the 'loop' sound:
              currentSound.onended = () => {
                if (!currentValue) {
                  return;
                }
                if (currentSound) {
                  // here, stopping usually isn't needed, but there is an edge case where
                  // since creating this sound and adding the onended, another loop sound
                  // has started playing, especially if starting and stopping quickly, which
                  // leads to an unstoppable loop sound playing forever (unstoppable because no
                  // reference to it remains)
                  currentSound.onended = null;
                  currentSound.stop();
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
          currentSound.onended = null;
          currentSound.stop();
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
    isFirstFrame = false;
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
