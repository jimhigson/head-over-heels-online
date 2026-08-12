import { lazy } from "preact/compat";

import { LazyDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";
import { mapDialogColourClasses } from "./mapDialogColourClasses";

export const LazyMapDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./MapDialog"))),
  mapDialogColourClasses,
);
