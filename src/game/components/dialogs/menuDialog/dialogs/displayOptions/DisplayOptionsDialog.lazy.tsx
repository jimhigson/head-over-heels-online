import { lazy } from "preact/compat";

import { LazyDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";
import { optionsDialogColourClasses } from "../optionsDialogColourClasses";

export const LazyDisplayOptionsDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./DisplayOptionsDialog"))),
  optionsDialogColourClasses,
);
