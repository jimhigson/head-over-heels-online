import type { SetOptional } from "type-fest";

import type { roomSpatialIndexKey, RoomState } from "../../../model/RoomState";
import type {
  GameInPlayStoreState,
  gameMenusSlice,
} from "../../../store/slices/gameMenus/gameMenusSlice";
import type { CharacterRooms, GameState } from "../GameState";

/**
 * the fields from the game state that are serialised for a saved game
 */
export const savedGameStateFields = [
  // TODO: this means the room json also goes in the save - hmmmm.
  "characterRooms",
  "currentCharacterName",
  "entryState",
  "gameTime",
  "pickupsCollected",
  "previousPlayable",
] as const satisfies readonly (keyof GameState<string>)[];

/** when RoomState is serialised, it does not have an index */
export type UnindexedRoomState<
  RoomId extends string,
  RoomItemId extends string,
> = Omit<RoomState<RoomId, RoomItemId>, typeof roomSpatialIndexKey>;

/**
 * SavedCharacterRooms is like Character Rooms, but doesn't have the spatial index - this needs to be
 * recomputed on load. Not saving this comes for free since we are writing to json, but ts doesn't
 * know that.
 */
export type SavedCharacterRooms<RoomId extends string> = {
  [C in keyof CharacterRooms<RoomId>]?: UnindexedRoomState<RoomId, string>;
};

type SavedGameStateFields = (typeof savedGameStateFields)[number];

type SavedGameState<RoomId extends string> = Pick<
  GameState<RoomId>,
  Exclude<SavedGameStateFields, "characterRooms">
> & {
  characterRooms: SavedCharacterRooms<RoomId>;
};

export type SavedStoreGameInPlay = SetOptional<
  GameInPlayStoreState,
  // freeCharacters marked as optional since it won't be in games saved before
  // as of late Sept/early Oct 2025
  "freeCharacters"
>;

export type SavedGame<RoomId extends string = string> = {
  saveTime: number;
  gameState: SavedGameState<RoomId>;
  store: {
    /**
     * gameInPlay is everything in the store that stores crowns collected,
     * scrolls read etc @see {GameInPlayStoreState}
     */
    [gameMenusSlice.reducerPath]: {
      gameInPlay: SavedStoreGameInPlay;
    };
  };
};
