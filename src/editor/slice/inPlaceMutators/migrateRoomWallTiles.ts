import { migrateWallTilesInPlace } from "../../../model/inPlaceMutators/migrateWallTilesInPlace";
import { valuesIter } from "../../../utils/entries";
import { type EditorCampaign } from "../../editorTypes";

/**
 * normalise every wall in a loaded campaign so it carries `tiles`, returning a
 * migrated copy. Community rooms authored before tiles were universal could describe
 * a near wall by a `times` length with no tiles; tiles are now required on every
 * wall. Runs in memory on load into the editor; nothing is persisted until the
 * campaign is re-saved. Idempotent: walls that already carry tiles are left
 * untouched.
 *
 * The campaign is cloned first, since the incoming one may be frozen (eg from the
 * RTK Query cache) and `migrateWallTilesInPlace` rewrites walls in place.
 */
export const migrateRoomWallTiles = (
  campaign: EditorCampaign,
): EditorCampaign => {
  const migrated = structuredClone(campaign);
  for (const room of valuesIter(migrated.rooms)) {
    migrateWallTilesInPlace(room);
  }
  return migrated;
};
