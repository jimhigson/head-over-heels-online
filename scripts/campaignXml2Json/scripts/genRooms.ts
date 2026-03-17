import { applyCampaignPatches } from "../applyCampaignPatches";
import { convertCampaign } from "../convertCampaign";
import { mergeNewRooms } from "../mergeNewRooms";
import { simplifyCampaign } from "../simplifyCampaign";
import { writeOut } from "../writeOut";

const go = async () => {
  const campaign = await convertCampaign();
  const patched = await applyCampaignPatches(campaign);
  const withNewRooms = await mergeNewRooms(patched);
  const simplified = simplifyCampaign(withNewRooms);
  await writeOut(simplified);
};

go();
