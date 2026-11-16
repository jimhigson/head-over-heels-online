import { importOnce } from "../../../utils/importOnce";

export const importLoadCampaignOnce = importOnce(
  () => import("./loadCampaign"),
);
