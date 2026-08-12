import { lazy } from "preact/compat";

import { LazyDialogHoc } from "../../../../../../ui/LazyDialog";
import { importOnce } from "../../../../../../utils/importOnce";
import { mainMenuDialogColourClasses } from "../mainMenu/mainMenuDialogColourClasses";

export const LazyScoreDialog = LazyDialogHoc(
  lazy(importOnce(() => import("./ScoreDialog"))),
  mainMenuDialogColourClasses,
);
