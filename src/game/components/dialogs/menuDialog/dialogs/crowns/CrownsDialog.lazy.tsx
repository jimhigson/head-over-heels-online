import { lazy } from "preact/compat";

import { LazyDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";
import { crownsDialogColourClasses } from "./crownsDialogColourClasses";

export const LazyCrownsDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./CrownsDialog"))),
  crownsDialogColourClasses,
);
