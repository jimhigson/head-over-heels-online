import { lazy } from "preact/compat";

import { LazyDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";

export const LazySoundDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./SoundDialog"))),
);
