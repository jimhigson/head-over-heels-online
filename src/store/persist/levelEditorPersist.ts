import type { PersistConfig } from "redux-persist/es/types";

import persistReducer from "redux-persist/es/persistReducer";

import {
  levelEditorSlice,
  type LevelEditorState,
} from "../../editor/slice/levelEditorSlice";
import { levelEditorSliceNonPersistedFields } from "../../editor/slice/levelEditorSliceTransientFields";
import { persistVersion } from "./persist";
import storage from "./storage";

const levelEditorPersistConfig: PersistConfig<LevelEditorState> = {
  key: "hohol/levelEditor",
  version: persistVersion,
  storage,
  blacklist: levelEditorSliceNonPersistedFields,
};

export const levelEditorPersistedReducer = persistReducer(
  levelEditorPersistConfig,
  levelEditorSlice.reducer,
);
