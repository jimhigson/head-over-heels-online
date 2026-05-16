import { importOnce } from "./utils/importOnce";

export const importOnNeedRefreshOnce = importOnce(
  () => import("./onNeedRefresh"),
);
