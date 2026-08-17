import { importOnce } from "../../../utils/importOnce";

export const importBakeUpscaledImageBlobOnce = importOnce(
  () => import("./bakeUpscaledImageBlob"),
);
