import { lazy } from "preact/compat";

import { LazyDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";
import { needRefreshDialogColourClasses } from "./needRefreshDialogColourClasses";

export const LazyNeedRefreshDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./NeedRefreshDialog"))),
  needRefreshDialogColourClasses,
);
