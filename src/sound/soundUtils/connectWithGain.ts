import type { BracketedSegmentOptions } from "./createBracketedSound";

import { audioCtx } from "../audioCtx";
import { soundsFadeDurationSec } from "./stopWithFade";

/**
 * Create a gainNode between the sound and the connectTo node,
 * connect them up and return the gainNode.
 *
 * When randomiseStartPoint is true, the sound starts at a random position
 * in the waveform, so we fade in from zero to avoid a click from the
 * sudden non-zero amplitude.
 */

export const connectWithGain = (
  sound: AudioBufferSourceNode,
  { gain, randomiseStartPoint }: BracketedSegmentOptions,
  connectTo: AudioNode,
) => {
  const gainNode = audioCtx.createGain();
  const targetGain = gain ?? gainNode.gain.defaultValue;

  if (randomiseStartPoint) {
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      targetGain,
      audioCtx.currentTime + soundsFadeDurationSec,
    );
  } else if (gain !== undefined) {
    gainNode.gain.value = gain;
  }

  sound.connect(gainNode);
  gainNode.connect(connectTo);
  return gainNode;
};
