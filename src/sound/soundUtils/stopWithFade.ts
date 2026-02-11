import { audioCtx } from "../audioCtx";

/**
 * Duration in seconds for the fade-in/out when starting or stopping
 * to avoid clicks in the audio
 */
export const soundsFadeDurationSec = 0.1;

/**
 * Stops an AudioBufferSourceNode with a short fade-out to avoid clicks.
 *
 * The Web Audio API's `stop()` method immediately halts playback at whatever
 * sample position it's at. If the waveform isn't near zero amplitude at that
 * moment, this causes an audible click/pop artefact. By ramping the gain down
 * to zero before stopping, we avoid this discontinuity.
 *
 * After stopping, the nodes are disconnected from the audio graph to ensure
 * they can be garbage collected.
 */
export const stopWithFade = (
  source: AudioBufferSourceNode,
  gainNode: GainNode,
) => {
  const stopTime = audioCtx.currentTime + soundsFadeDurationSec;
  gainNode.gain.linearRampToValueAtTime(0, stopTime);
  source.stop(stopTime);
  source.onended = () => {
    source.disconnect();
    gainNode.disconnect();
  };
};
