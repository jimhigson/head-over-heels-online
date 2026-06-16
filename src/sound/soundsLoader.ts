import {
  exportedSfxUrls,
  type ExportedSoundId,
} from "../_generated/sfxdex/sfx";
import { loadAndDecode } from "./loadAndDecode";

const soundCategories = {
  requiredForGameplay: [
    "activate",
    "ballHit",
    "bubbleRobotLoop",
    "buttonOff",
    "buttonOn",
    "carry",
    "collectedItem",
    "collectedRabbit",
    "conveyorEnd",
    "conveyorLoop",
    "conveyorStart",
    "crownSparkle",
    "deactivate",
    "destroy",
    "detect",
    "door",
    "doughnutSplat",
    "drum",
    "elephantHoot",
    "emit",
    "fall",
    "glassClink",
    "glide",
    "glitchRobot",
    "headAccent",
    "headJumping",
    "headJumpStart",
    "headOverHeelsAccent",
    "headWalk",
    "heavyScrape",
    "heelsAccent",
    "heelsJumping",
    "heelsJumpStart",
    "heelsWalk",
    "helicopter",
    "hooter",
    "hushPuppyVanish",
    "iceSlide",
    "jetpackLoop",
    "jetpackTurnaround",
    "loop",
    "lowerSmallMotorLoop",
    "lowHum",
    "metalClang",
    "mojoLoop",
    "mojoTurn",
    "monkeyTurn",
    "moonbaseDoor",
    "robotWhirLoop",
    "rollingBallLoop",
    "scrape",
    "servoLoop",
    "servoStart",
    "servoStop",
    "softBump",
    "springBoing",
    "switchClick",
    "teleportIn",
    "teleportOut",
    "teleportWarningSiren",
    "toasterPopUp",
    "toasterPushDown",
    "uhOh",
  ],
  loadForMenus: [
    "headWalk",
    "heelsWalk",
    "menuSofter",
    "scrollOpen",
    "setting0",
    "setting1",
    "setting2",
    "setting3",
  ],
  soundsLoadOnDemand: [
    "blacktooth",
    "bookworld",
    "egyptus",
    "fanfare",
    "market",
    "moonbase",
    "penitentiary",
    "safari",
    "intro",
  ],
} as const satisfies Record<string, readonly ExportedSoundId[]>;

type SoundCategory = keyof typeof soundCategories;
type CategorisedSoundId = (typeof soundCategories)[SoundCategory][number];

/**
 * a sound id missing from all three category arrays above is left in
 * {@link UncategorisedSoundId}, which then violates the `extends never`
 * constraint of {@link AssertNever} - a compile error naming the missing id(s)
 */
type UncategorisedSoundId = Exclude<ExportedSoundId, CategorisedSoundId>;
type AssertNever<T extends never> = T;
// oxlint-disable-next-line no-unused-vars
type _EverySoundIsCategorised = AssertNever<UncategorisedSoundId>;

// where all loaded sounds are stored, keyed by their id, once they are loaded,
// regardless of which category they are in
const loadedSounds: Partial<Record<ExportedSoundId, AudioBuffer>> = {};

/**
 * loads and decodes a single sound on demand. Returns undefined synchronously
 * when the sound is already loaded (so callers can play it without awaiting);
 * otherwise returns a promise resolving once it has been loaded and decoded
 */
export const loadSound = (
  soundId: ExportedSoundId,
): Promise<void> | undefined => {
  if (loadedSounds[soundId] !== undefined) {
    return undefined;
  }
  return loadAndDecode(exportedSfxUrls[soundId]).then((buffer) => {
    loadedSounds[soundId] = buffer;
  });
};

/**
 * loads and decodes every sound in the category that isn't already loaded.
 * Returns undefined synchronously when nothing is missing (the common case),
 * so callers can skip awaiting; otherwise returns a promise resolving when the
 * missing sounds are loaded
 */
export const loadSoundCategory = (
  category: Exclude<
    SoundCategory,
    // on-demand sounds by definition are single sounds needed
    // on-demand, not loaded as a category, so calling with that parameter
    // doesn't make sense
    "soundsLoadOnDemand"
  >,
): Promise<void> | undefined => {
  const missing = soundCategories[category].filter(
    (id) => loadedSounds[id] === undefined,
  );
  if (missing.length === 0) {
    return undefined;
  }
  return Promise.all(missing.map(loadSound)).then(() => undefined);
};

/**
 * sync function to get a previously loaded sound, or throws an error if not yet loaded
 */
export const loadedSound = (soundId: ExportedSoundId): AudioBuffer => {
  const buffer = loadedSounds[soundId];
  if (buffer === undefined) {
    throw new Error(`sound "${soundId}" is not loaded`);
  }
  return buffer;
};
