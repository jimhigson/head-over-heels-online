import { importOnce } from "../../../utils/importOnce";

export const importBakeUpscaledSpritesheetBlobOnce = importOnce(
  () => import("./bakeUpscaledSpritesheetBlobForCss"),
);
