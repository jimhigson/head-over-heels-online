import { migrateTeleporterActivationInPlace } from "../../../model/inPlaceMutators/migrateTeleporterActivationInPlace";
import { migrateWallTilesInPlace } from "../../../model/inPlaceMutators/migrateWallTilesInPlace";
import { valuesIter } from "../../../utils/entries";
import { type EditorCampaign } from "../../editorTypes";

/**
 * bring every item of a loaded campaign up to the current json format,
 * returning a migrated copy:
 *
 * - walls carry `tiles`: community rooms authored before tiles were universal
 *   could describe a near wall by a `times` length with no tiles
 * - teleporters name the planet they need liberated
 *   (`activatedIfPlanetLiberated`), not a path into the game's store
 *
 * Runs in memory on load into the editor; nothing is persisted until the
 * campaign is re-saved. Idempotent: items already in the current form are left
 * untouched.
 *
 * The campaign is cloned first, since the incoming one may be frozen (eg from the
 * RTK Query cache) and the migrations rewrite items in place.
 */
export const migrateRoomItems = (campaign: EditorCampaign): EditorCampaign => {
  const migrated = structuredClone(campaign);
  for (const room of valuesIter(migrated.rooms)) {
    migrateWallTilesInPlace(room);
    migrateTeleporterActivationInPlace(room);
  }
  return migrated;
};
