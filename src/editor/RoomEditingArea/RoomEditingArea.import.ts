import { importOnce } from "../../utils/importOnce.ts";

export const importRoomEditingArea = importOnce(
  () => import("./RoomEditingArea.tsx"),
);
