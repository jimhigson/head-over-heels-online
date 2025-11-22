import { importOnce } from "../utils/importOnce";

export const importLutPage = importOnce(() => import("./LutPage.tsx"));
