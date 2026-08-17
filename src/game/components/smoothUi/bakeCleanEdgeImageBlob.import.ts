import { importOnce } from "../../../utils/importOnce";

export const importBakeCleanEdgeImageBlobOnce = importOnce(
  () => import("./bakeCleanEdgeImageBlob"),
);
