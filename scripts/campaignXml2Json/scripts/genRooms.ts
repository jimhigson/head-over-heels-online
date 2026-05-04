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
  const simplified = simplifyCampaign(withNewRooms);
  await writeOut(simplified);
};

go();
