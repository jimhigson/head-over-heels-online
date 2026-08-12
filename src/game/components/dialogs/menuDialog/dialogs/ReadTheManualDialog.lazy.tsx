import { lazy } from "preact/compat";

import { LazyDialogHoc } from "../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../utils/importOnce";
import { markdownDialogColourClasses } from "./markdownDialogColourClasses";

export const LazyReadTheManualDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./ReadTheManualDialog"))),
  markdownDialogColourClasses,
);
