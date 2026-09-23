import { importOnce } from "../utils/importOnce";

export const importWebMcpTools = importOnce(() => import("./WebMcpTools.tsx"));
