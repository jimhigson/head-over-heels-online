import { importOnce } from "../../utils/importOnce";

export const importOriginalCampaign = importOnce(() => import("./campaign.ts"));
