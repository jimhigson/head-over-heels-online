import { lazy } from "preact/compat";

import { LazyOverlayDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";

export const LazyDeathDialog = LazyOverlayDialogHoc(
  lazy(importOnce(() => import("./DeathDialog"))),
);
