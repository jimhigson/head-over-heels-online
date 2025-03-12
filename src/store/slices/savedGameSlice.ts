import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { ValueOf } from "type-fest";
import type { GameState } from "../../game/gameState/GameState";
import type { GameMenusState } from "./gameMenusSlice";
import type { CharacterName } from "../../model/modelTypes";

export type SerialisableCharacterRoom = {
  foo: "bar";
  // non-serialisable in items state we have:
  // * standingOn (free item state)
  // * stoodOnBy (base item state)
  // ! carried items are ok
  // ^^^^^ if these were string ids, we could serialise the whole room state as json
};

export type CharacterRooms = Partial<{
  [C in CharacterName]: SerialisableCharacterRoom;
}>;

export type SavedGame = {
  screenshotBase64: string;
  characterRooms: CharacterRooms;
} & Pick<GameState<string>, "gameTime" | "pickupsCollected"> &
  Pick<GameMenusState, "planetsLiberated" | "scrollsRead">;

export type SavedGamesState = {
  current?: SavedGame;
  fishes: SavedGame[];
};

export const initialSavedGameSliceState: SavedGamesState = {
  fishes: [],
};

/**
 * a slice for all the state that is controlled in react-land
 * (most state is controlled in the game itself and not touched here)
 */
export const savedGamesSlice = createSlice({
  name: "savedGames",
  initialState: initialSavedGameSliceState,
  reducers: {
    saveCurrent(state, { payload }: PayloadAction<SavedGame>) {
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

//export const {} = savedGamesSlice.actions;

export const savedGamesSliceActions = savedGamesSlice.actions;
