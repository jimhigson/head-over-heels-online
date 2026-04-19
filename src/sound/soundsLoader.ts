import type { SoundId } from "./soundUrls";

import { entries, fromAllEntries } from "../utils/entries";
import { importOnce } from "../utils/importOnce";
import { loadAndDecode } from "./loadAndDecode";
import { soundUrls } from "./soundUrls";

type AppSounds = { [K in SoundId]: AudioBuffer };

let loaded: AppSounds | undefined = undefined;

const importSoundsOnce = importOnce(async (): Promise<AppSounds> => {
  const loadedEntries: [SoundId, AudioBuffer][] = await Promise.all(
    entries(soundUrls).map(async ([id, url]) => [id, await loadAndDecode(url)]),
  );
  return fromAllEntries(loadedEntries);
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
