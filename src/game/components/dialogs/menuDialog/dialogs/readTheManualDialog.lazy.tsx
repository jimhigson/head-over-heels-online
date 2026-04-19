import { lazy } from "react";

import { LazyDialogHoc } from "../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../utils/importOnce";

export const LazyReadTheManualDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./readTheManualDialog"))),
);
