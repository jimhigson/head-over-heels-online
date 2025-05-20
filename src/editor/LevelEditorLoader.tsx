import { lazy } from "react";
import { importOnce } from "../utils/importOnce";
import { LoadSpritesheetGate } from "./AssetLoadGate";

const importLevelEditorOnce = importOnce(() => import("./LevelEditor"));
const LevelEditorLazy = lazy(importLevelEditorOnce);

export const LevelEditorLoader = () => {
  return (
    <LoadSpritesheetGate>
      <LevelEditorLazy />
    </LoadSpritesheetGate>
  );
};
