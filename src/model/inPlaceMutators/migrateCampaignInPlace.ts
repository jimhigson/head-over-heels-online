import { valuesIter } from "../../utils/entries";
import { type AnyRoomJson } from "../RoomJson";
import { migrateWallTilesInPlace } from "./migrateWallTilesInPlace";

/**
 * migrate every room of a campaign to the current json format. Applied at
 * every point the game loads a campaign that could have been authored under
 * an older format: from the db (community/sequel campaigns) or from a
 * playtest data: url.
 *
 * Once all campaigns in the db have been re-saved in the v26 format (walls
 * always carrying tiles), this migration can be removed.
 */
export const migrateCampaignInPlace = (campaign: {
  rooms: Record<string, AnyRoomJson>;
}): void => {
  for (const room of valuesIter(campaign.rooms)) {
    migrateWallTilesInPlace(room);
  }
};
