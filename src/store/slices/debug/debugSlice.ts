import { createSlice } from "@reduxjs/toolkit";

import { typedURLSearchParams } from "../../../options/queryParams";
import { detectDeviceType } from "../../../utils/detectEnv/detectDeviceType";
import { clearAllData } from "../clearAllData";

const inBrowser = detectDeviceType() !== "server";
const cheatsOnFromUrl =
  inBrowser ?
    typedURLSearchParams().has("cheats")
    // in node (probably vitest)
  : false;

export type DebugSliceState = {
  /**
   * When true, the cheats UI is rendered and debug-only behaviours (e.g.
   * pointer-tap debug decorators on items) are wired in. Initialised
   * from the `?cheats=1` URL param at app boot. May in future be unlocked
   * via in-game code entry.
   */
  cheatsOn: boolean;
};

const initialDebugSliceState: DebugSliceState = {
  cheatsOn: cheatsOnFromUrl,
};

/**
 * Cross-cutting debug/development state. Currently just tracks whether
 * cheats are enabled. Lives in its own slice (rather than `gameInPlay` or
 * `userSettings`) because it is neither an in-play property nor a
 * user-toggled preference — it's a session-level debug flag, and the
 * cheats UI + debug-click wiring that consumes it will eventually move
 * into a dedicated `hoh-debug` package alongside this slice.
 */
export const debugSlice = createSlice({
  name: "debug",
  initialState: initialDebugSliceState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(clearAllData, () => ({ cheatsOn: cheatsOnFromUrl }));
  },
  selectors: {
    selectCheatsOn(state) {
      return state.cheatsOn;
    },
  },
});

export const { selectCheatsOn } = debugSlice.selectors;
