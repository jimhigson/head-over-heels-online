import { lazy, Suspense } from "preact/compat";

import { SpinnerHead } from "../ui/Spinner";
import { importOnce } from "../utils/importOnce";

const importLevelEditorOnce = importOnce(() => import("./LevelEditor"));
const LevelEditorLazy = lazy(importLevelEditorOnce);

export const LevelEditorLoader = () => {
  return (
    <Suspense fallback={<SpinnerHead loadingBorder />}>
      <LevelEditorLazy />
    </Suspense>
  );
};
