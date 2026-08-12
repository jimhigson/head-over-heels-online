import { lazy } from "preact/compat";

import { LazyDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";
import { offerReincarnationDialogColourClasses } from "./offerReincarnationDialogColourClasses";

export const LazyOfferReincarnationDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./OfferReincarnationDialog"))),
  offerReincarnationDialogColourClasses,
);
