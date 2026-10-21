import { type PlanetName } from "../../sprites/planets";
import { valuesIter } from "../../utils/entries";
import { type AnyRoomJson } from "../RoomJson";

/**
 * a teleporter's config as campaigns and saves made before
 * `activatedIfPlanetLiberated` could hold it: the condition named as a path
 * into the game's store
 */
export type LegacyTeleporterActivationConfig = {
  activatedOnStoreValue?: `planetsLiberated.${PlanetName}`;
  activatedIfPlanetLiberated?: PlanetName;
};

const legacyActivationPrefix = "planetsLiberated.";

/**
 * rename a teleporter's legacy store-path condition to the planet it names
 */
export const migrateTeleporterActivationConfigInPlace = (
  config: LegacyTeleporterActivationConfig,
): void => {
  const { activatedOnStoreValue } = config;
  if (activatedOnStoreValue === undefined) {
    return;
  }
  config.activatedIfPlanetLiberated = activatedOnStoreValue.slice(
    legacyActivationPrefix.length,
  ) as PlanetName;
  delete config.activatedOnStoreValue;
};

/**
 * migrate every teleporter (fixed or portable) of a room json
 *
 * Needed for campaigns authored before `activatedIfPlanetLiberated`, loaded
 * from the db or kept in the editor
 */
export const migrateTeleporterActivationInPlace = (room: AnyRoomJson): void => {
  for (const item of valuesIter(room.items)) {
    if (item.type === "teleporter" || item.type === "portableTeleporter") {
      migrateTeleporterActivationConfigInPlace(item.config);
    }
  }
};
