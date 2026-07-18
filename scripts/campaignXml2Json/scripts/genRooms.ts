import { migrateTowersInPlace } from "../../../src/model/inPlaceMutators/migrateTowersInPlace";
import { migrateWallTilesInPlace } from "../../../src/model/inPlaceMutators/migrateWallTilesInPlace";
import { valuesIter } from "../../../src/utils/entries";
import { applyCampaignPatches } from "../applyCampaignPatches";
import { convertCampaign } from "../convertCampaign";
import { mergeNewRooms } from "../mergeNewRooms";
import { reconsolidateCampaign } from "../reconsolidateCampaign";
import { simplifyCampaign } from "../simplifyCampaign";
import { writeOut } from "../writeOut";

const go = async () => {
  const campaign = await convertCampaign();
  const patched = await applyCampaignPatches(campaign);
  const reconsolidated = reconsolidateCampaign(patched);
  const withNewRooms = await mergeNewRooms(reconsolidated);
  // every wall must carry tiles, and towers must be single z-only columns;
  // patches and hand-written new rooms can still describe near walls in the old
  // times-based format and towers repeated in x/y, so normalise here:
  for (const room of valuesIter(withNewRooms.rooms)) {
    migrateWallTilesInPlace(room);
    migrateTowersInPlace(room);
  }
  const simplified = simplifyCampaign(withNewRooms);
  await writeOut(simplified);
};

go();
