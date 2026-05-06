import type { PayloadAction } from "@reduxjs/toolkit";
import type { ValueOf } from "type-fest";

import { createAction, createSlice } from "@reduxjs/toolkit";

import type {
  SavedGame,
  SavedStoreGameInPlay,
} from "../../../game/gameState/saving/SavedGameState";
import type { PlayableItem } from "../../../game/physics/itemPredicates";
import type { MarkdownPageName } from "../../../manual/pages";
import type { ScrollConfig } from "../../../model/json/ItemConfigMap";
import type {
  CampaignLocator,
  CharacterName,
  IndividualCharacterName,
} from "../../../model/modelTypes";
import type { PlanetName } from "../../../sprites/planets";
import type { ToggleablePaths } from "../../../utils/Toggleable";

import { clearAllData } from "../clearAllData";
import { savedGameLoadedOnAppLoad } from "../savedGames/savedGamesSlice";

export type ScrollsRead = {
  [m in MarkdownPageName]?: true;
};

export type FreeCharacters = {
  [C in IndividualCharacterName]?: true;
};

/**
 * The parts of a game-in-play state that are kept in the store. Not everything
 * goes in the store because in-play rooms etc. need to be mutated in-place for
 * performance.
 *
 * This works:
 *  * in play
 *  * for saves (plus serialisation of the gameState)
 *  * for reincarnation fish save points
 */
export type GameInPlayStoreState = {
  planetsLiberated: Record<PlanetName, boolean>;
  roomsExplored: Record<string, true>;
  /**
   * we don't want to show the same scroll twice, even if it is in a different room
   * so record what we've read:
   */
  scrollsRead: ScrollsRead;
  /**
   * The reincarnation point to continue from after losing all lives.
   *
   * Recursively (optionally) contains another reincarnationPoint, so it naturally
   * creates a linked-list of saves. This is how multiple saves are handled from
   * a single property.
   */
  reincarnationPoint?: SavedGame;
  /**
   * the userid/name of the campaign being played, or undefined if none
   */
  campaignLocator?: CampaignLocator;

  /** which characters have exited the game and found freedom? */
  freeCharacters: FreeCharacters;
};

export type GameInPlaySliceState = {
  gameInPlay: GameInPlayStoreState;
  /**
   * could maybe be replaced with conditionality of gameInPlay. However, currently
   * this would break the score dialog after game over, since at that point the game is
   * not playing, but it does need the data from this object.
   */
  gameRunning: boolean;
};

export type GameInPlayBooleanPaths = ToggleablePaths<GameInPlayStoreState>;

export const noPlanetsLiberated = {
  blacktooth: false,
  bookworld: false,
  egyptus: false,
  penitentiary: false,
  safari: false,
};

export const initialGameInPlayStoreState = {
  planetsLiberated: noPlanetsLiberated,
  roomsExplored: {},
  scrollsRead: {},
  reincarnationPoint: undefined,
  freeCharacters: {},
} satisfies GameInPlayStoreState;

export const initialGameInPlaySliceState: GameInPlaySliceState = {
  gameInPlay: initialGameInPlayStoreState,
  gameRunning: false,
};

const sliceName = "gameInPlay" as const;

/** Signal: a character lost a life. Analytics middleware tracks the event. */
export const lostLife = createAction<{
  characterLosingLifeItem: PlayableItem<CharacterName, string>;
}>(`${sliceName}/lostLife`);

/**
 * @deprecated characterRoomChange is redundant and can be merged with roomExplored
 * since they do almost the same thing, and are (almost) always fired together
 */
export const characterRoomChange = createAction<{
  characterName: CharacterName;
  roomId: string;
}>(`${sliceName}/characterRoomChange`);

/**
 * Signals that the player chose to reincarnate. The state mutation
 * — popping the reincarnationPoint stack and rolling back
 * roomsExplored / scrollsRead / freeCharacters etc. to the fish-eaten
 * snapshot — is handled by `gameRestoreFromSave`, which the dispatch
 * site fires immediately before this. The saved snapshot's inner
 * gameInPlay carries the prior reincarnationPoint, so each pop walks
 * one link back through the linked-list chain. The listener subscribed
 * to this action opens the reincarnatedRestart dialog.
 */
export const reincarnationAccepted = createAction(
  `${sliceName}/reincarnationAccepted`,
);

/**
 * The player just lost their last life, not necessarily game over.
 * A listener decides whether to offer reincarnation (if a reincarnationPoint
 * exists) or cascade into `gameOver` (if not).
 */
export const lostAllLives = createAction(`${sliceName}/lostAllLives`);

export const gameInPlaySlice = createSlice({
  name: sliceName,
  initialState: initialGameInPlaySliceState,
  reducers: {
    roomExplored(state, { payload: roomId }: PayloadAction<string>) {
      state.gameInPlay.roomsExplored[roomId] = true;
    },
    reincarnationFishEaten(state, { payload }: PayloadAction<SavedGame>) {
      state.gameInPlay.reincarnationPoint = payload;
    },
    gameRestoreFromSave(
      state,
      { payload }: PayloadAction<SavedStoreGameInPlay>,
    ) {
      state.gameInPlay = {
        freeCharacters: {},
        ...payload,
      };
      if (payload.freeCharacters === undefined) {
        // this is not possible as per the current ts types, but we could be loading from
        // an old save state
        state.gameInPlay.freeCharacters = {};
      }
      state.gameRunning = true;
    },
    /**
     * Records the read scroll. The menu-side effect (opening the markdown
     * dialog) is handled by listener middleware co-located with gameMenusSlice.
     */
    scrollRead(state, { payload }: PayloadAction<ScrollConfig>) {
      if (payload.source === "manual") {
        state.gameInPlay.scrollsRead[payload.page] = true;
      }
    },
    crownCollected(state, { payload: planet }: PayloadAction<PlanetName>) {
      state.gameInPlay.planetsLiberated[planet] = true;
    },
    characterReachesFreedom(
      state,
      {
        payload: individualCharacterName,
      }: PayloadAction<IndividualCharacterName>,
    ) {
      state.gameInPlay.freeCharacters[individualCharacterName] = true;
    },
    gameStarted(
      state,
      {
        payload: { campaignLocator },
      }: PayloadAction<{
        campaignLocator: CampaignLocator;
        // set to true to skip the crowns screen on game start - eg, for playtest mode
        noShowCrowns?: boolean;
      }>,
    ) {
      if (state.gameRunning) {
        // resuming an already-running game:
        throw new Error("game is already running");
      }
      state.gameRunning = true;
      state.gameInPlay = {
        ...initialGameInPlayStoreState,
        campaignLocator,
      };
    },
    /**
     * The game has ended permanently — explicit player quit or "stay dead"
     * after declining a reincarnation offer. Sets `gameRunning: false` and
     * clears any pending reincarnationPoint. Listeners on this action handle
     * deleting the campaign's save and resetting the menu stack.
     *
     * `reincarnationDeclined: true` indicates the action came from dismissing
     * the offerReincarnation dialog — the player just saw the score moments
     * ago, so the gameMenus listener uses this to suppress a redundant
     * second showing of the score dialog.
     */
    gameOver(
      state,
      _action: PayloadAction<{ reincarnationDeclined: boolean }>,
    ) {
      state.gameRunning = false;
      delete state.gameInPlay.reincarnationPoint;
    },
  },
  extraReducers(builder) {
    builder.addCase(clearAllData, () => initialGameInPlaySliceState);
    builder.addCase(savedGameLoadedOnAppLoad, (state, { payload }) => {
      state.gameInPlay = { freeCharacters: {}, ...payload };
      state.gameRunning = true;
    });
  },
});

export type GameInPlaySliceAction =
  | ReturnType<typeof characterRoomChange>
  | ReturnType<typeof lostAllLives>
  | ReturnType<typeof lostLife>
  | ReturnType<typeof reincarnationAccepted>
  | ReturnType<ValueOf<typeof gameInPlaySlice.actions>>;

export const {
  characterReachesFreedom,
  crownCollected,
  gameOver,
  gameRestoreFromSave,
  gameStarted,
  reincarnationFishEaten,
  roomExplored,
  scrollRead,
} = gameInPlaySlice.actions;

export const gameInPlaySliceActions = gameInPlaySlice.actions;
