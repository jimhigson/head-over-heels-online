import { importOnce } from "../../utils/importOnce.ts";

export const importJsonRoomEditor = importOnce(
  () => import("./JsonRoomEditor.tsx"),
);
