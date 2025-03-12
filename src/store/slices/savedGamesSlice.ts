import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { ValueOf } from "type-fest";
import type { SavedGameState } from "../../game/gameState/saving/SavedGameState";

export type SavedGamesSliceState = {
  /**
   * the current game is saved in case the game is closed and come back
   * to later - eg mobile app is switched away from
   */
  current?: SavedGameState;
};

export const initialSavedGameSliceState: SavedGamesSliceState = {};

/**
 * a slice for all the state that is controlled in react-land
 * (most state is controlled in the game itself and not touched here)
 */
export const savedGamesSlice = createSlice({
  name: "savedGames",
  initialState: initialSavedGameSliceState,
  reducers: {
    saveCurrent(state, { payload }: PayloadAction<SavedGameState>) {
      state.current = payload;
    },
  },
});

export type SavedGamesSliceAction = ReturnType<
  ValueOf<typeof savedGamesSlice.actions>
>;

export type SavedGamesSliceActionCreator = ValueOf<
  typeof savedGamesSlice.actions
>;

export const { saveCurrent } = savedGamesSlice.actions;

export const savedGamesSliceActions = savedGamesSlice.actions;
