import { convertCampaign } from "../convertCampaign";
import { writeOut } from "../writeOut";

const go = async () => {
  const campaign = await convertCampaign();
  await writeOut(campaign);
};

go();
