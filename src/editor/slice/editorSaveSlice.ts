import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ValueOf } from "type-fest";

import { type SaveFailure } from "../../db/campaign";
import { clearAllData } from "../../store/slices/clearAllData";

export const showOkAfterSaveDuration = 2000;

/** a save-as targeting a name the user has already saved, awaiting their say-so */
export type PendingOverwrite = {
  campaignName: string;
  /** the latest version already in the db for this name */
  latest: number;
  publish: boolean;
};

export type EditorSaveDialog =
  | { failure: SaveFailure; type: "saveFailed" }
  | ({ type: "confirmOverwrite" } & PendingOverwrite)
  | { type: "openCampaign" }
  | { type: "saveAs" };

export type EditorSaveState = {
  /** the dialog currently shown for the save/open journeys, if any */
  dialog: EditorSaveDialog | null;
  /** >0 while the post-save "vN" flash is showing on the save button */
  justSaved: number;
};

export const initialEditorSaveState: EditorSaveState = {
  dialog: null,
  justSaved: 0,
};

export const editorSaveSlice = createSlice({
  name: "editorSave",
  initialState: initialEditorSaveState,
  reducers: {
    saveAsDialogShown(state) {
      state.dialog = { type: "saveAs" };
    },
    openCampaignDialogShown(state) {
      state.dialog = { type: "openCampaign" };
    },
    overwriteConfirmationShown(
      state,
      { payload }: PayloadAction<PendingOverwrite>,
    ) {
      state.dialog = { type: "confirmOverwrite", ...payload };
    },
    saveFailed(state, { payload: failure }: PayloadAction<SaveFailure>) {
      state.dialog = { type: "saveFailed", failure };
    },
    saveDialogClosed(state) {
      state.dialog = null;
    },
    saveFlashShown(state) {
      state.justSaved++;
    },
    saveFlashExpired(state) {
      state.justSaved = Math.max(0, state.justSaved - 1);
    },
  },
  extraReducers(builder) {
    builder.addCase(clearAllData, () => initialEditorSaveState);
  },
  selectors: {
    selectEditorSaveDialog: (state) => state.dialog,
    selectJustSaved: (state) => state.justSaved > 0,
  },
});

export type EditorSaveSliceAction = ReturnType<
  ValueOf<typeof editorSaveSlice.actions>
>;

export const {
  openCampaignDialogShown,
  overwriteConfirmationShown,
  saveAsDialogShown,
  saveDialogClosed,
  saveFailed,
  saveFlashExpired,
  saveFlashShown,
} = editorSaveSlice.actions;

export const { selectEditorSaveDialog, selectJustSaved } =
  editorSaveSlice.selectors;
