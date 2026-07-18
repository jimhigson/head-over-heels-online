import { lazy } from "preact/compat";

import { LazyDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";

export const LazyQuitGameConfirmDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./QuitGameConfirmDialog"))),
);
