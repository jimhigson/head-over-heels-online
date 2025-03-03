import { importOnce } from "../../../utils/importOnce";

export const importCheats = importOnce(() => import("./Cheats.tsx"));
