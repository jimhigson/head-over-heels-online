import { lazy } from "react";

import { LazyDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";

export const LazyNeedRefreshDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./NeedRefreshDialog"))),
);
