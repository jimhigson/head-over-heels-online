import { createAction } from "@reduxjs/toolkit";

/**
 * Cross-slice reset. Each slice that wants to reset on this action handles
 * it via `extraReducers`. Dispatched from the error-dialog when the user
 * picks the "clearAllData" recovery strategy.
 */
export const clearAllData = createAction("global/clearAllData");
