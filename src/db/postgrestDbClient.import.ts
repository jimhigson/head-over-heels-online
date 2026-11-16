import { importOnce } from "../utils/importOnce";

export const importPostgrestDbClient = importOnce(
  () => import("./postgrestDbClient.ts"),
);
