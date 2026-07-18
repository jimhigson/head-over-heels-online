import { lazy } from "preact/compat";

import { LazyDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";

export const LazyOptionsDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./OptionsDialog"))),
);
