import { lazy } from "preact/compat";

import { LazyDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";
import { sureWantEditorDialogColourClasses } from "./sureWantEditorDialogColourClasses";

export const LazySureWantEditorDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./SureWantEditorDialog"))),
  sureWantEditorDialogColourClasses,
);
