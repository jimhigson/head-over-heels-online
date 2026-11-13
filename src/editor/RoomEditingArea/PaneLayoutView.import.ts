import { importOnce } from "../../utils/importOnce.ts";

export const importPaneLayoutView = importOnce(
  () => import("./PaneLayoutView.tsx"),
);
