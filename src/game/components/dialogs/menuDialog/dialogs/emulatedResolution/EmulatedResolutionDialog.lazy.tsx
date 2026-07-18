import { lazy } from "preact/compat";

import { LazyDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";

export const LazyEmulatedResolutionDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./EmulatedResolutionDialog"))),
);
