import { entries } from "../utils/entries";
import { importOnce } from "../utils/importOnce";
import { audioCtx } from "./audioCtx";
import { soundUrls } from "./soundUrls";

type AppSounds = { [K in keyof typeof soundUrls]: AudioBuffer };

let loaded: AppSounds | undefined = undefined;

const loadAndDecode = async (url: string): Promise<AudioBuffer> => {
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
    throw error; // Re-throw in normal browsers
  }
};

const importSoundsOnce = importOnce(async (): Promise<AppSounds> => {
  const decoded = {} as Record<string, AudioBuffer>;
  for (const [id, url] of entries(soundUrls)) {
    decoded[id] = await loadAndDecode(url);
  }
  return decoded as AppSounds;
});

export const loadSounds = async () => {
  if (loaded !== undefined) {
    return;
  }

  loaded = await importSoundsOnce();
};

/**
 * NOTE: this is only safe to call after the spritesheet has had load() called
 * and it resolved! - this is a sync export since we need to get the spritesheet
 * inside the update/render loop synchronously many times
 */
export const loadedSounds = (): AppSounds => {
  if (loaded === undefined) {
    throw new Error(
      `sounds not loaded - only call this from inside code 
      (like in a render loop) that is protected and only executed once 
      loading has happened`,
    );
  }
  return loaded;
};
