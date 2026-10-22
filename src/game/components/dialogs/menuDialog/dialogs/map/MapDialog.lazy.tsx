import { lazy } from "preact/compat";

import { mapDialogColourClasses } from "../../../../../../map/mapDialogColourClasses";
import { LazyDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";

export const LazyMapDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./MapDialog"))),
  mapDialogColourClasses,
  "map",
);
