import { importOnce } from "../../utils/importOnce";

export const importWantedEditor404 = importOnce(
  () => import("./WantedEditor404.tsx"),
);
