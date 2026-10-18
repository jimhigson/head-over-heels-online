import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type SerialisableError } from "../../../utils/redux/createSerialisableErrors";
import { clearAllData } from "../clearAllData";

export type ErrorsState = {
  /**
   * errors caught and not yet dismissed - empty when there are none
   */
  caughtErrors: Array<SerialisableError>;
};

const initialErrorsSliceState: ErrorsState = {
  caughtErrors: [],
};

/**
 * errors caught anywhere in the app, for showing in an error dialog
 */
export const errorsSlice = createSlice({
  name: "errors",
  initialState: initialErrorsSliceState,
  reducers: {
    errorCaught(
      state,
      { payload: caughtErrors }: PayloadAction<Array<SerialisableError>>,
    ) {
      state.caughtErrors = caughtErrors;
    },
    errorDismissed(state) {
      state.caughtErrors = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(clearAllData, () => initialErrorsSliceState);
  },
  selectors: {
    selectCaughtErrors(state: ErrorsState) {
      return state.caughtErrors;
    },
    selectHasError(state: ErrorsState) {
      return state.caughtErrors.length > 0;
    },
  },
});

export const { errorCaught, errorDismissed } = errorsSlice.actions;

export const { selectCaughtErrors, selectHasError } = errorsSlice.selectors;
