import type { PayloadAction } from "@reduxjs/toolkit";
import type { EmptyObject, ValueOf } from "type-fest";

import { createSlice } from "@reduxjs/toolkit";

import type { DialogId } from "../../../game/components/dialogs/menuDialog/DialogId";
import type { PokeableNumber } from "../../../model/ItemStateMap";
import type { ScrollConfig } from "../../../model/json/ItemConfigMap";
import type { CharacterName } from "../../../model/modelTypes";
import type { SerialisableError } from "../../../utils/redux/createSerialisableErrors";

import { emptyObject } from "../../../utils/empty";
import { clearAllData } from "../clearAllData";
import { savedGameLoadedOnAppLoad } from "../savedGames/savedGamesSlice";

type BaseOpenMenu = {
  // will be undefined if the menu items have not been rendered yet, since relies
  // on rendering to discover the ids
  focussedItemId?: string;
  // maintain because selecting by mouse doesn't trigger scrolling in the renderer
  scrollableSelection: boolean;
};

export type OpenMenu =
  | (BaseOpenMenu & {
      menuId: "crowns";
      /**
       * menu-specific parameters - for example, the crowns menu can play music
       */
      menuParam: { playMusic: boolean };
    })
  | (BaseOpenMenu & {
      menuId: "death";
      menuParam: DeathMenuParam;
    })
  | (BaseOpenMenu & {
      menuId: "errorCaught";
      menuParam: Array<SerialisableError>;
    })
  | (BaseOpenMenu & {
      menuId: "mainMenu";
      /**
       * Whether the user can dismiss this main-menu instance by pressing
       * exit/escape. Set at creation time:
       * - boot/post-game-over: `false` (no game to return to — popping would
       *   leave nothing on screen)
       * - mid-game (user pressed exit during gameplay, opening this menu):
       *   `true`
       *
       * Invariant: every transition from `gameRunning: true` to `false`
       * rebuilds the menu stack from scratch (gameOver listener,
       * `clearAllData` extraReducer), so `isClosable: true` is never
       * observably stale — its presence implies a game is in play.
       */
      menuParam: { isClosable: boolean };
    })
  | (BaseOpenMenu & {
      menuId: "markdown/inline";
      // the markdown content
      menuParam: { markdown: string };
    })
  | (BaseOpenMenu & {
      menuId: Exclude<
        DialogId,
        "crowns" | "death" | "errorCaught" | "mainMenu" | "markdown/inline"
      >;
      menuParam: EmptyObject;
    });

export type DeathMenuParam = {
  dyingCharacterName: CharacterName;
  // 0 if out of the game
  headLives: PokeableNumber;
  // 0 if out of the game
  heelsLives: PokeableNumber;
};

export type GameMenusState = {
  /**
   * stack of menus currently open - empty if none are
   */
  openMenus: OpenMenu[];
};

export const initialGameMenuSliceState: GameMenusState = {
  openMenus: [
    {
      menuId: "mainMenu",
      scrollableSelection: false,
      // boot main menu: no game in play, so the user mustn't be able to pop
      // it (would leave the screen blank)
      menuParam: { isClosable: false },
    },
  ],
};

/**
 * a slice for the menu/dialog stack. Cross-cutting effects from gameInPlay
 * actions (open the crowns menu after collecting a crown, open the markdown
 * dialog when reading a scroll, etc.) live in `gameMenusListeners.ts` rather
 * than as inline reducer writes here.
 */
export const gameMenusSlice = createSlice({
  name: "gameMenus",
  initialState: initialGameMenuSliceState,
  reducers: {
    /**
     * Pop the top menu. If `openIfEmpty` is true and `openMenus` is empty,
     * push the main menu instead — letting one action serve both "exit a
     * menu" and "open the main menu mid-game" intents (caller picks via the
     * payload).
     *
     * Refuses to pop a length-1 mainMenu marked `isClosable: false` (its
     * `isClosable` flag is set by whichever site created it — boot,
     * post-game-over, etc.); popping it would leave the screen blank.
     *
     * The empty-stack branch is only reachable mid-game (a game must be
     * running for the stack to have been emptied), so any mainMenu pushed
     * here is closable.
     */
    menuOpenOrExitPressed(
      state,
      {
        payload: { openMainIfEmpty },
      }: PayloadAction<{ openMainIfEmpty: boolean }>,
    ) {
      if (state.openMenus.length > 0) {
        // a menu is open, pop it off if it is closable:

        const [top] = state.openMenus;

        const topIsUnclosable =
          state.openMenus.length === 1 &&
          top.menuId === "mainMenu" &&
          !top.menuParam.isClosable;

        if (!topIsUnclosable) {
          const [, ...tail] = state.openMenus;
          state.openMenus = tail;
        }
      } else if (openMainIfEmpty) {
        // no menus open, open one:
        state.openMenus = [
          {
            menuId: "mainMenu",
            scrollableSelection: false,
            menuParam: { isClosable: true },
          },
        ];
      }
    },
    goToSubmenu(state, { payload: dialogId }: PayloadAction<DialogId>) {
      state.openMenus = [
        {
          menuId: dialogId,
          scrollableSelection: false,
          menuParam: {},
        } as OpenMenu,
        ...state.openMenus,
      ];
    },
    closeAllMenus(state) {
      state.openMenus = [];
    },
    backToParentMenu(state) {
      const [, ...tail] = state.openMenus;
      state.openMenus = tail;
    },
    setFocussedMenuItemId(
      state,
      {
        payload: { focussedItemId, scrollableSelection },
      }: PayloadAction<{
        focussedItemId: string;
        scrollableSelection: boolean;
      }>,
    ) {
      const [displayedMenu] = state.openMenus;
      displayedMenu.focussedItemId = focussedItemId;
      displayedMenu.scrollableSelection = scrollableSelection;
    },
    holdPressed(
      state,
      { payload }: PayloadAction<"hold" | "toggle" | "unhold">,
    ) {
      const showingAMenu = state.openMenus.length > 0;

      if (showingAMenu) {
        const onHoldAlready = state.openMenus[0]?.menuId === "hold";
        if (onHoldAlready && payload !== "hold") {
          // go off hold:
          state.openMenus = [];
        }
        // else do nothing if hold pressed while in menus
      } else {
        // no menus shown
        if (payload !== "unhold") {
          // go on hold:
          state.openMenus = [
            {
              menuId: "hold",
              scrollableSelection: false,
              menuParam: emptyObject,
            },
          ];
        }
      }
    },
    mapPressed(state) {
      const mapMenu: OpenMenu = {
        menuId: "map",
        scrollableSelection: false,
        menuParam: emptyObject,
      };

      const showingAnyMenus = state.openMenus.length >= 1;

      if (showingAnyMenus) {
        const visibleMenuId = state.openMenus.at(0)?.menuId;

        if (visibleMenuId === "map") {
          // exit the map - either to gameplay or to previous menu:
          const [, ...tail] = state.openMenus;
          state.openMenus = tail;
        } else if (visibleMenuId === "hold") {
          // allow direct transition from hold menu to the map,
          // but exiting will come back to the hold dialog:
          state.openMenus = [mapMenu, ...state.openMenus];
        }
        // else do nothing if map pressed while in menus
      } else {
        // show the map:
        state.openMenus = [mapMenu];
      }
    },
    errorCaught(
      state,
      { payload: error }: PayloadAction<Array<SerialisableError>>,
    ) {
      // blat out all open menus - the menu may have caused the error!
      state.openMenus = [
        {
          menuId: "errorCaught",
          scrollableSelection: false,
          menuParam: error,
        },
      ];
    },
    /**
     * Dismiss the error dialog by clearing all open menus. The "clear all
     * data" recovery strategy is a separate top-level action (`clearAllData`)
     * that all slices reset on via `extraReducers`.
     */
    errorDismissed(state) {
      state.openMenus = [];
    },
    // --- Listener-driven menu transitions -----------------------------------
    //
    // The reducers below are dispatched by listener middleware in
    // gameMenusListeners.ts in response to cross-slice events from
    // gameInPlaySlice. Each names the menu transition it produces; the
    // listener supplies the payload context.

    deathDialogShown(state, { payload }: PayloadAction<DeathMenuParam>) {
      const newMenu: OpenMenu = {
        menuId: "death",
        scrollableSelection: false,
        menuParam: payload,
      };

      if (
        state.openMenus.length === 1 &&
        state.openMenus[0].menuId === "death"
      ) {
        // already one game dialog - slip the new one in below it
        // to show after that one is dismissed. Ie, if two playable
        // characters die very close to each other in time.
        state.openMenus = [state.openMenus[0], newMenu];
      } else {
        state.openMenus = [newMenu];
      }
    },

    /**
     * Show the crowns menu after a crown is collected. If `allCrowns` is true,
     * also pushes the "proclaim emperor" dialog above the crowns menu.
     */
    crownsMenuShown(
      state,
      {
        payload: { playMusic, allCrowns },
      }: PayloadAction<{ playMusic: boolean; allCrowns: boolean }>,
    ) {
      const crownsMenu: OpenMenu = {
        menuId: "crowns",
        scrollableSelection: false,
        menuParam: { playMusic },
      };
      state.openMenus =
        allCrowns ?
          [
            {
              menuId: "proclaimEmperor",
              scrollableSelection: false,
              menuParam: emptyObject,
            },
            crownsMenu,
          ]
        : [crownsMenu];
    },

    /**
     * Reset the menu stack at the start of a game. Either clears menus
     * entirely (e.g. playtest mode) or shows the crowns intro screen.
     */
    gameStartedMenusOpened(
      state,
      { payload: { showCrowns } }: PayloadAction<{ showCrowns: boolean }>,
    ) {
      state.openMenus =
        showCrowns ?
          [
            {
              menuId: "crowns",
              scrollableSelection: false,
              menuParam: { playMusic: false },
            },
          ]
        : [];
    },

    /**
     * Reset the menu stack on game over. Three shapes:
     *  - `offerReincarnation: true` → score + offerReincarnation.
     *  - `offerReincarnation: false`, `scoreAlreadyShown: false` → score +
     *    non-closable mainMenu (the standard post-game-over flow).
     *  - `offerReincarnation: false`, `scoreAlreadyShown: true` → just the
     *    non-closable mainMenu, used after the player declines a
     *    reincarnation offer (they saw the score on the way in, no point
     *    showing it again).
     *
     * The mainMenu is non-closable post-game-over because there's no game
     * to return to.
     */
    gameEndedMenusOpened(
      state,
      {
        payload,
      }: PayloadAction<
        | { offerReincarnation: false; scoreAlreadyShown: boolean }
        | { offerReincarnation: true }
      >,
    ) {
      const score = {
        menuId: "score",
        scrollableSelection: false,
        menuParam: emptyObject,
      } as const;
      const offerReincarnation = {
        menuId: "offerReincarnation",
        scrollableSelection: false,
        menuParam: emptyObject,
      } as const;
      const mainMenu = {
        menuId: "mainMenu",
        scrollableSelection: true,
        menuParam: { isClosable: false },
      } as const;

      if (payload.offerReincarnation) {
        state.openMenus = [score, offerReincarnation];
      } else if (payload.scoreAlreadyShown) {
        state.openMenus = [mainMenu];
      } else {
        state.openMenus = [score, mainMenu];
      }
    },

    /**
     * Show a scroll's markdown content as a dialog. Picks `markdown/<page>`
     * for manual-source scrolls or `markdown/inline` for inline content.
     */
    scrollContentMenuShown(
      state,
      { payload: scrollConfig }: PayloadAction<ScrollConfig>,
    ) {
      state.openMenus =
        scrollConfig.source === "manual" ?
          [
            {
              menuId: `markdown/${scrollConfig.page}`,
              scrollableSelection: false,
              menuParam: emptyObject,
            },
          ]
        : [
            {
              menuId: "markdown/inline",
              scrollableSelection: false,
              menuParam: {
                markdown:
                  Array.isArray(scrollConfig.markdown) ?
                    scrollConfig.markdown.join("\n\n")
                  : scrollConfig.markdown,
              },
            },
          ];
    },

    /**
     * Show the "you've been reincarnated, restart from save" prompt after
     * the user accepts a reincarnation offer.
     */
    reincarnationRestartMenuShown(state) {
      state.openMenus = [
        {
          menuId: "reincarnatedRestart",
          scrollableSelection: false,
          menuParam: emptyObject,
        },
      ];
    },
  },
  extraReducers(builder) {
    builder.addCase(clearAllData, () => initialGameMenuSliceState);
    // After loading a save on app start, show the hold (paused) menu so the
    // player resumes on their own time rather than dropping straight into
    // gameplay — they may have just opened the tab, may need to re-orient,
    // or may have intended to navigate via URL without auto-playing.
    builder.addCase(savedGameLoadedOnAppLoad, (state) => {
      state.openMenus = [
        {
          menuId: "hold",
          scrollableSelection: false,
          menuParam: emptyObject,
        },
      ];
    });
  },
  selectors: {
    selectHasError(state: GameMenusState) {
      return state.openMenus.some((menu) => menu.menuId === "errorCaught");
    },
  },
});

export type GameMenusSliceAction = ReturnType<
  ValueOf<typeof gameMenusSlice.actions>
>;

export type GameMenusSliceActionCreator = ValueOf<
  typeof gameMenusSlice.actions
>;

export const {
  backToParentMenu,
  closeAllMenus,
  crownsMenuShown,
  deathDialogShown,
  errorCaught,
  errorDismissed,
  gameEndedMenusOpened,
  gameStartedMenusOpened,
  goToSubmenu,
  holdPressed,
  mapPressed,
  menuOpenOrExitPressed,
  reincarnationRestartMenuShown,
  scrollContentMenuShown,
  setFocussedMenuItemId,
} = gameMenusSlice.actions;

export const { selectHasError } = gameMenusSlice.selectors;

export const gameMenusSliceActions = gameMenusSlice.actions;
