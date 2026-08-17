import { importOnce } from "../../../../utils/importOnce";

export const importBakeUpscaledTextureOnce = importOnce(
  () => import("./bakeUpscaledTexture"),
);
