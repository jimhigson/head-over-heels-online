import { importOnce } from "../../utils/importOnce.ts";

export const importDialogRoomArea = importOnce(
  () => import("./DialogRoomArea.tsx"),
);
