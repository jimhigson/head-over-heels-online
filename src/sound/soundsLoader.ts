import {
  exportedSfxUrls,
  type ExportedSoundId,
} from "../_generated/sfxdex/sfx";
import { entries, fromAllEntries } from "../utils/entries";
import { importOnce } from "../utils/importOnce";
import { loadAndDecode } from "./loadAndDecode";

/**
 * the intro music is only ever played by the crowns dialog, streaming the
 * url directly through an <audio> element - decoding it into the map too
 * would download the file a second time
 */
export type MappedSoundId = Exclude<ExportedSoundId, "intro">;

export const isMappedSoundId = (id: ExportedSoundId): id is MappedSoundId =>
  id !== "intro";

type AppSounds = { [K in MappedSoundId]: AudioBuffer };

let loaded: AppSounds | undefined = undefined;

const importSoundsOnce = importOnce(async (): Promise<AppSounds> => {
  const loadedEntries: [MappedSoundId, AudioBuffer][] = await Promise.all(
    entries(exportedSfxUrls)
      .filter((entry): entry is [MappedSoundId, string] =>
        isMappedSoundId(entry[0]),
      )
      .map(async ([id, url]) => [id, await loadAndDecode(url)] as const),
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
