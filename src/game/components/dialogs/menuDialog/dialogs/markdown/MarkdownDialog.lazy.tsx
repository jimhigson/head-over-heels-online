import { lazy } from "react";

import { LazyDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";

export const LazyMarkdownDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./MarkdownDialog"))),
);
