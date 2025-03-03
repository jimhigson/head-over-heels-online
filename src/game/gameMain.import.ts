import { importOnce } from "../utils/importOnce";

export const importGameMain = importOnce(() => import("./gameMain.ts"));
