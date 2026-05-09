import { lazy, Suspense } from "react";

import { injectSlice, store } from "../store/store";
import { SpinnerHead } from "../ui/Spinner";
import { importOnce } from "../utils/importOnce";
import { LoadSpritesheetGate } from "./AssetLoadGate";

const importLevelEditorOnce = importOnce(async () => {
  const [levelEditorModule, levelEditorSliceModule] = await Promise.all([
    import("./LevelEditor"),
    import("./slice/levelEditorSlice"),
  ]);

  injectSlice(levelEditorSliceModule.levelEditorSlice);

  // injecting a slice doesn't cause the slice's initial state to be put into the store, so dispatch
  // an event just to ensure this happens:
  store.dispatch(levelEditorSliceModule.injected());

  return levelEditorModule;
});
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
