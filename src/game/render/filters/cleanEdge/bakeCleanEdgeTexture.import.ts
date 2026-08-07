import { importOnce } from "../../../../utils/importOnce";

export const importBakeCleanEdgeTextureOnce = importOnce(
  () => import("./bakeCleanEdgeTexture"),
);
