import { importOnce } from "../../utils/importOnce";

export const importNotFound404Page = importOnce(
  () => import("./NotFound404Page.tsx"),
);
