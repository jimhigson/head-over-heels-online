import { importOnce } from "../../../../utils/importOnce";

export const importOnScreenControlsOnce = importOnce(
  () => import("./OnScreenControls"),
);

export type OnScreenControlsModule = Awaited<
  ReturnType<typeof importOnScreenControlsOnce>
>;
