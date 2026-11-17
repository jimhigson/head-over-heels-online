import persistReducer from "redux-persist/es/persistReducer";
import { type PersistConfig } from "redux-persist/es/types";

import {
  levelEditorSlice,
  type LevelEditorState,
} from "../../editor/slice/levelEditorSlice";
import { levelEditorSliceCampaignTransientFields } from "../../editor/slice/levelEditorSliceTransientFields";
import { levelEditorCampaignMigrationTransform } from "./levelEditorCampaignMigrationTransform";
import { levelEditorHistoryTransform } from "./levelEditorHistoryTransform";
import { persistVersion } from "./persist";
import storage from "./storage";

export const levelEditorPersistKey = "hohol/levelEditor";

const levelEditorPersistConfig: PersistConfig<LevelEditorState> = {
  key: levelEditorPersistKey,
  version: persistVersion,
  storage,
  blacklist: levelEditorSliceCampaignTransientFields,
  transforms: [
    levelEditorHistoryTransform,
    levelEditorCampaignMigrationTransform,
  ],
};

export const levelEditorPersistedReducer = persistReducer(
  levelEditorPersistConfig,
  levelEditorSlice.reducer,
);
