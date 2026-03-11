import { lazy } from "react";

import { importOnce } from "../utils/importOnce";

const importTooltipModule = importOnce(() => import("./Tooltip"));

export const LazyTooltip = lazy(() =>
  importTooltipModule().then((m) => ({ default: m.Tooltip })),
);

export const LazyTooltipProvider = lazy(() =>
  importTooltipModule().then((m) => ({ default: m.TooltipProvider })),
);
