import { audioCtx } from "./audioCtx";

const cache = new Map<string, Promise<AudioBuffer>>();

export const loadAndDecode = (url: string): Promise<AudioBuffer> => {
  const cached = cache.get(url);
  if (cached) return cached;

  const promise = fetchAndDecode(url);
  cache.set(url, promise);
  return promise;
};

const fetchAndDecode = async (url: string): Promise<AudioBuffer> => {
  try {
    return await audioCtx.decodeAudioData(
      await (await fetch(url)).arrayBuffer(),
    );
  } catch (error) {
    // Only suppress error if running in Playwright/automated browser
    if (navigator.webdriver === true) {
      // Playwright's Chromium doesn't include MP3/AAC codecs due to licensing restrictions
      // See: https://github.com/microsoft/playwright/issues/30409
      // and: https://stackoverflow.com/questions/8033495/chromium-embedded-framework-mp3-support
      console.warn(
        `Audio decode failed for ${url} - running in automated browser`,
        error,
      );
      // Return a minimal silent AudioBuffer instead of null
      return audioCtx.createBuffer(2, 1, audioCtx.sampleRate);
    }
    cache.delete(url);
    throw error; // Re-throw in normal browsers
  }
};
