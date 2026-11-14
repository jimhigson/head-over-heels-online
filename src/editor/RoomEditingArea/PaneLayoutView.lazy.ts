import { lazy } from "preact/compat";

import { importPaneLayoutView } from "./PaneLayoutView.import.ts";

export const LazyPaneLayoutView = lazy(importPaneLayoutView);
