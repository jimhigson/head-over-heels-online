import { type AsyncReturnType } from "type-fest";

import { importOnce } from "../../../../utils/importOnce";

export const importOnScreenControlsOnce = importOnce(
  () => import("./OnScreenControls"),
);

export type OnScreenControlsModule = AsyncReturnType<
  typeof importOnScreenControlsOnce
>;
