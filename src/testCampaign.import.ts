import { importOnce } from "./utils/importOnce";

export const importTestCampaign = importOnce(() => import("./testCampaign.ts"));
