import { lazy, Suspense } from "react";

import { SpinnerHead } from "../ui/Spinner";
import { importOnce } from "../utils/importOnce";
import { LoadSpritesheetGate } from "./AssetLoadGate";

const importLevelEditorOnce = importOnce(() => import("./LevelEditor"));
const LevelEditorLazy = lazy(importLevelEditorOnce);

export const LevelEditorLoader = () => {
  return (
    <LoadSpritesheetGate>
      <Suspense fallback={<SpinnerHead loadingBorder />}>
        <LevelEditorLazy />
      </Suspense>
    </LoadSpritesheetGate>
  );
};
