import { audioCtx } from "./audioCtx";

const cache = new Map<string, Promise<AudioBuffer>>();

export const loadAndDecode = (url: string): Promise<AudioBuffer> => {
  const cached = cache.get(url);
  if (cached) {
    return cached;
  }

  // a failed load is forgotten so a later call can try again - the promise is
  // cached before it settles, so it would otherwise be handed back rejected
  // for the life of the page
  const promise = fetchAndDecode(url).catch((error: unknown) => {
    cache.delete(url);
    throw error;
  });
  cache.set(url, promise);
  return promise;
};

const fetchAndDecode = async (url: string): Promise<AudioBuffer> => {
  if (import.meta.env.MODE === "visual-regression") {
    // silent stub - snapshots never need audible sound, and decoding depends
    // on codecs that automated browsers may not have (webkit's decodeAudioData
    // never settles without them, hanging anything gated on sound loading)
    try {
      return audioCtx.createBuffer(2, 1, audioCtx.sampleRate);
    } catch (e) {
      throw new Error(
        `Problem creating fake audio buffer for visual regression with:
            audioCtx.sampleRate = ${audioCtx.sampleRate}
            audioCtx.state = ${JSON.stringify(audioCtx.state)}`,
        { cause: e },
      );
    }
  }
  return audioCtx.decodeAudioData(await (await fetch(url)).arrayBuffer());
};
