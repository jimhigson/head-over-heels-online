import { applyCampaignPatches } from "../applyCampaignPatches";
import { convertCampaign } from "../convertCampaign";
import { simplifyCampaign } from "../simplifyCampaign";
import { writeOut } from "../writeOut";

const go = async () => {
  const campaign = await convertCampaign();
  const patched = await applyCampaignPatches(campaign);
  const simplified = simplifyCampaign(patched);
  await writeOut(simplified);
};

go();
