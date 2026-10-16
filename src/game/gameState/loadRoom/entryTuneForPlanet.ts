import {
  type ExportedSoundId,
  isSoundId,
} from "../../../_generated/sfxdex/sfx";
import { type SceneryName } from "../../../sprites/planets";

/** the tune announcing entry to a planet's rooms, if that planet has one */
export const entryTuneForPlanet = (
  planet: SceneryName,
): ExportedSoundId | undefined => (isSoundId(planet) ? planet : undefined);
