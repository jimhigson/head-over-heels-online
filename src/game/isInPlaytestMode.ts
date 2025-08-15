import { typedURLSearchParams } from "../options/queryParams";

export const isInPlaytestMode = () => {
  return typedURLSearchParams().get("campaignName")?.startsWith("data:");
};
