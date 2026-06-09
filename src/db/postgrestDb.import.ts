import { importOnce } from "../utils/importOnce";

export const importPostgrestDb = importOnce(() => import("./postgrestDb.ts"));
