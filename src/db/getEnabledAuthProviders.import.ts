import { importOnce } from "../utils/importOnce";

export const importGetEnabledAuthProviders = importOnce(
  () => import("./getEnabledAuthProviders.ts"),
);
