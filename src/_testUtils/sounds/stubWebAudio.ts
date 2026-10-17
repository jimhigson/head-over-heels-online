/**
 * a vitest setup file (see setupFiles in vitest.config.ts), ahead of any setup
 * file that loads the sound modules - so the audio context is created from the
 * test implementation installed here
 */

// only dom environments (eg happy-dom) have a window, and none provide web audio:
if (typeof globalThis.window !== "undefined") {
  // installs a test implementation of web audio (keeping a real node graph) on the global scope:
  const { default: webAudioTestApi } = await import("web-audio-test-api");
  webAudioTestApi.setState("AudioContext#decodeAudioData", "promise");
  webAudioTestApi.setState("AudioNode#disconnect", "selective");
  Object.defineProperty(globalThis.window, "AudioContext", {
    value: globalThis.AudioContext,
  });
}
