import { lazy } from "react";
import { importOnce } from "../../utils/importOnce";

const import404PageOnce = importOnce(() => import("./NotFound404Page"));
export const NotFound404PageLazy = lazy(import404PageOnce);
