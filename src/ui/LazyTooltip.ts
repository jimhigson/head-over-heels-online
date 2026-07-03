import { lazy } from "preact/compat";

import { importOnce } from "../utils/importOnce";

const importTooltipModule = importOnce(() => import("./tooltip/Tooltip"));

export const LazyTooltip = lazy(() =>
  importTooltipModule().then((m) => ({ default: m.Tooltip })),
);
