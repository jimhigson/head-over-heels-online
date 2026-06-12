import {
  exportedSfxUrls,
  type ExportedSoundId,
  isSoundId,
} from "../_generated/sfxdex/sfx";
import { type SceneryName, sceneryNames } from "../sprites/planets";
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

/**
 * room entry tunes (a theme per scenery, plus the new-game fanfare) are not
 * part of the initial load: each is loaded by {@link ensureSoundsLoaded} on
 * first entering a room that names it via a soundEffect item, while the main
 * loop holds off rendering - the same treatment as loading a spritesheet
 * variant
 */
export type RoomEntryTuneId = Extract<MappedSoundId, "fanfare" | SceneryName>;

const isSceneryWithTune = (
  name: SceneryName,
): name is Extract<RoomEntryTuneId, SceneryName> => isSoundId(name);

const roomEntryTuneIds: ReadonlySet<ExportedSoundId> = new Set<ExportedSoundId>(
  [...sceneryNames.filter(isSceneryWithTune), "fanfare"],
);

type InitiallyLoadedSoundId = Exclude<MappedSoundId, RoomEntryTuneId>;

const isInitiallyLoadedSoundId = (
  id: ExportedSoundId,
): id is InitiallyLoadedSoundId =>
  isMappedSoundId(id) && !roomEntryTuneIds.has(id);

type AppSounds = { [K in InitiallyLoadedSoundId]: AudioBuffer } & {
  [K in RoomEntryTuneId]?: AudioBuffer;
};

let loaded: AppSounds | undefined = undefined;

const importSoundsOnce = importOnce(async (): Promise<AppSounds> => {
  const loadedEntries: [InitiallyLoadedSoundId, AudioBuffer][] =
    await Promise.all(
      entries(exportedSfxUrls)
        .filter((entry): entry is [InitiallyLoadedSoundId, string] =>
          isInitiallyLoadedSoundId(entry[0]),
        )
        .map(async ([id, url]) => [id, await loadAndDecode(url)] as const),
    );
  return fromAllEntries(loadedEntries);
});

/**
 * load any of the given sounds that are not already in the map, adding them
 * to it. Returns undefined when nothing is missing, so callers can
 * distinguish the (usual) synchronous no-op from a load they should wait on
 */
export const ensureSoundsLoaded = (
  soundIds: Iterable<ExportedSoundId>,
): Promise<void> | undefined => {
  const map = loaded;
  if (map === undefined) {
    throw new Error(
      "ensureSoundsLoaded called before loadSounds resolved - sounds can only be ensured while the game is running",
    );
  }
  const missing = new Set<MappedSoundId>();
  for (const id of soundIds) {
    if (isMappedSoundId(id) && map[id] === undefined) {
      missing.add(id);
    }
  }
  if (missing.size === 0) {
    return undefined;
  }
  return Promise.all(
    Array.from(missing, async (id) => {
      map[id] = await loadAndDecode(exportedSfxUrls[id]);
    }),
  ).then(() => undefined);
};

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
