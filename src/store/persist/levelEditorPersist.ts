import persistReducer from "redux-persist/es/persistReducer";
import { type PersistConfig } from "redux-persist/es/types";

import {
  levelEditorSlice,
  type LevelEditorState,
} from "../../editor/slice/levelEditorSlice";
import { levelEditorSliceNonPersistedFields } from "../../editor/slice/levelEditorSliceTransientFields";
import { levelEditorHistoryTransform } from "./levelEditorHistoryTransform";
import { persistVersion } from "./persist";
import storage from "./storage";

const levelEditorPersistConfig: PersistConfig<LevelEditorState> = {
  key: "hohol/levelEditor",
  version: persistVersion,
  storage,
  blacklist: levelEditorSliceNonPersistedFields,
  transforms: [levelEditorHistoryTransform],
};

export const levelEditorPersistedReducer = persistReducer(
  levelEditorPersistConfig,
  levelEditorSlice.reducer,
);
