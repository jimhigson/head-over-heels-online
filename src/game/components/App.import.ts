import { importOnce } from "../../utils/importOnce";

export const importAppOnce = importOnce(() => import("./App"));
