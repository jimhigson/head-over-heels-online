import { importOnce } from "../../utils/importOnce";

export const importMapPage = importOnce(() => import("./MapPage.tsx"));
