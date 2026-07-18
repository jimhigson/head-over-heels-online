import { lazy } from "preact/compat";

import { LazyDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";

export const LazyInputPresetDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./InputPresetDialog"))),
);
