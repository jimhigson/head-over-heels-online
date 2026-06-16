import { importOnce } from "../utils/importOnce";

export const importGameMainOnce = importOnce(() => import("./gameMain.ts"));
