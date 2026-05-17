import persistReducer from "redux-persist/es/persistReducer";
import { type PersistConfig } from "redux-persist/es/types";
import storage from "redux-persist/lib/storage";

import {
  levelEditorSlice,
  type LevelEditorState,
} from "../../editor/slice/levelEditorSlice";
import { levelEditorSliceNonPersistedFields } from "../../editor/slice/levelEditorSliceTransientFields";
import { persistVersion } from "./persist";

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
