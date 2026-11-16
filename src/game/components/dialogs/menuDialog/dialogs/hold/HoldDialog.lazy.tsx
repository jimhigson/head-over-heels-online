import { lazy } from "preact/compat";

import { LazyOverlayDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";

export const LazyHoldDialog = LazyOverlayDialogHoc(
  lazy(importOnce(() => import("./HoldDialog"))),
);
