import { detectDeviceType } from "../utils/detectEnv/detectDeviceType";

/**
 * the sample rate of the visual-regression build's audio - fixed, since its
 * audio never reaches an output device that would set one
 */
export const visualRegressionSampleRate = 44_100;

export const audioCtx: BaseAudioContext =
  detectDeviceType() === "server" ?
    // no code on the server should actually be using sound - we lie to the
    // type system to avoid the overhead of dynamically creating a singleton
    // but this will crash if the sound-making code isn't protected against
    // running on the server
    (undefined as unknown as BaseAudioContext)
  : import.meta.env.MODE === "visual-regression" ?
    // snapshots never need audible sound: an offline context asks the
    // platform for no output device, so it can't be handed a broken one
    new OfflineAudioContext({
      numberOfChannels: 2,
      length: 1,
      sampleRate: visualRegressionSampleRate,
    })
  : new window.AudioContext();
