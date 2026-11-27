import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { EmptyObject } from "type-fest";

import type { DialogId } from "../../../game/components/dialogs/menuDialog/DialogId";
import type { PokeableNumber } from "../../../model/itemInPlay/ItemStateMap";
import type { ScrollConfig } from "../../../model/json/ItemConfigMap";
import type { CharacterName } from "../../../model/modelTypes";
import { emptyObject } from "../../../utils/empty";
import { clearAllData } from "../clearAllData";
import { errorCaught, errorDismissed } from "../errors/errorsSlice";
import { savedGameLoadedOnAppLoad } from "../savedGames/savedGamesSlice";
import { findDrawnMenu } from "./selectDrawnMenu";

/**
 * options that can be given when opening a menu
 */
export type MenuOptions = {
  /**
   * stays above every menu opened after it, and is left in place when the
   * stack beneath it is replaced
   */
  alwaysOnTop: boolean;
  /**
   * if a menu is marked as not dismissable,
   * the player's back and exit cannot close it, so only an explicit request
   * to close that names it will remove it from the store's menu stack
   */
  notDismissable: boolean;
  /**
   * how long after opening it is drawn - until then the menu beneath it is
   * drawn in its place
   */
  showAfterDelayMs: number;
  /**
   * how long it stays drawn after being closed
   */
  lingerMs: number;
};

type BaseOpenMenu = MenuOptions & {
  // will be undefined if the menu items have not been rendered yet, since relies
  // on rendering to discover the ids
  focussedItemId?: string;
  // maintain because selecting by mouse doesn't trigger scrolling in the renderer
  scrollableSelection: boolean;
  /**
   * the app ticker's `time` when it was opened
   */
  openedAt: number;
  /**
   * the app ticker's `time` when it was closed, while it lingers before
   * being removed - undefined while it is open
   */
  closingAt: number | undefined;
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
        "crowns" | "death" | "mainMenu" | "markdown/inline"
      >;
      menuParam: EmptyObject;
    });

export type HoldPress = "hold" | "toggle" | "unhold";

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

const initialGameMenuSliceState: GameMenusState = {
  openMenus: [
    {
      menuId: "mainMenu",
      scrollableSelection: false,
      alwaysOnTop: false,
      notDismissable: false,
      showAfterDelayMs: 0,
      lingerMs: 0,
      closingAt: undefined,
      openedAt: 0,
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
/**
 * replace the stack with these menus - any always-on-top menu already open
 * is left in place above them
 */
const replaceMenuStack = (
  state: GameMenusState,
  /**
   * the new stack, top first
   */
  menus: OpenMenu[],
) => {
  state.openMenus = [
    ...state.openMenus.filter(({ alwaysOnTop }) => alwaysOnTop),
    ...menus,
  ];
};

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
        payload: { openMainIfEmpty, openedAt },
      }: PayloadAction<{ openMainIfEmpty: boolean; openedAt: number }>,
    ) {
      // back and exit act on the menu drawn, or failing that the top of the stack
      const menuToClose =
        findDrawnMenu(state.openMenus, openedAt) ?? state.openMenus.at(0);
      if (menuToClose !== undefined) {
        // a menu is open, close it if it is closable:

        const isUnclosable =
          menuToClose.notDismissable ||
          // closes only by choosing one of its options, which dismiss the error:
          menuToClose.menuId === "errorCaught" ||
          (state.openMenus.length === 1 &&
            menuToClose.menuId === "mainMenu" &&
            !menuToClose.menuParam.isClosable);

        if (!isUnclosable) {
          state.openMenus = state.openMenus.filter(
            (openMenu) => openMenu !== menuToClose,
          );
        }
      } else if (openMainIfEmpty) {
        // no menus open, open one:
        replaceMenuStack(state, [
          {
            menuId: "mainMenu",
            scrollableSelection: false,
            alwaysOnTop: false,
            notDismissable: false,
            showAfterDelayMs: 0,
            lingerMs: 0,
            closingAt: undefined,
            openedAt,
            menuParam: { isClosable: true },
          },
        ]);
      }
    },
    /**
     * open a menu above the others - unless it is already open. Opened again
     * while it lingers, it stays, open once more
     */
    goToSubmenu(
      state,
      {
        payload: { dialogId, openedAt, ...options },
      }: PayloadAction<{ dialogId: DialogId; openedAt: number } & MenuOptions>,
    ) {
      const existing = state.openMenus.find(
        ({ menuId }) => menuId === dialogId,
      );
      if (existing !== undefined) {
        existing.closingAt = undefined;
        return;
      }
      state.openMenus = [
        {
          menuId: dialogId,
          scrollableSelection: false,
          ...options,
          openedAt,
          closingAt: undefined,
          menuParam: {},
        } as OpenMenu,
        ...state.openMenus,
      ];
    },
    /**
     * remove a menu from wherever it is in the stack - the top one with that
     * id, since two can be queued, eg two deaths close together
     */
    menuClosed(
      state,
      {
        payload: { menuId: closingMenuId },
      }: PayloadAction<{ menuId: DialogId }>,
    ) {
      const closingIndex = state.openMenus.findIndex(
        ({ menuId }) => menuId === closingMenuId,
      );
      if (closingIndex !== -1) {
        state.openMenus.splice(closingIndex, 1);
      }
    },
    /**
     * a menu is closed but stays drawn for its `lingerMs`
     */
    menuLingerStarted(
      state,
      {
        payload: { menuId: closingMenuId, closingAt },
      }: PayloadAction<{ menuId: DialogId; closingAt: number }>,
    ) {
      const closingMenu = state.openMenus.find(
        ({ menuId }) => menuId === closingMenuId,
      );
      if (closingMenu !== undefined) {
        closingMenu.closingAt = closingAt;
      }
    },
    /**
     * a lingering menu's time is up: it is removed, unless opened again since
     */
    menuLingerEnded(
      state,
      {
        payload: { menuId: closingMenuId, closingAt },
      }: PayloadAction<{ menuId: DialogId; closingAt: number }>,
    ) {
      state.openMenus = state.openMenus.filter(
        (menu) => menu.menuId !== closingMenuId || menu.closingAt !== closingAt,
      );
    },
    closeAllMenus(state) {
      replaceMenuStack(state, []);
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
      {
        payload: { press, openedAt },
      }: PayloadAction<{ press: HoldPress; openedAt: number }>,
    ) {
      const showingAMenu = state.openMenus.length > 0;

      if (showingAMenu) {
        const onHoldAlready = state.openMenus[0]?.menuId === "hold";
        if (onHoldAlready && press !== "hold") {
          // go off hold:
          replaceMenuStack(state, []);
        }
        // else do nothing if hold pressed while in menus
      } else {
        // no menus shown
        if (press !== "unhold") {
          // go on hold:
          replaceMenuStack(state, [
            {
              menuId: "hold",
              scrollableSelection: false,
              alwaysOnTop: false,
              notDismissable: false,
              showAfterDelayMs: 0,
              lingerMs: 0,
              closingAt: undefined,
              openedAt,
              menuParam: emptyObject,
            },
          ]);
        }
      }
    },
    mapPressed(
      state,
      { payload: { openedAt } }: PayloadAction<{ openedAt: number }>,
    ) {
      const mapMenu: OpenMenu = {
        menuId: "map",
        scrollableSelection: false,
        alwaysOnTop: false,
        notDismissable: false,
        showAfterDelayMs: 0,
        lingerMs: 0,
        closingAt: undefined,
        openedAt,
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
        replaceMenuStack(state, [mapMenu]);
      }
    },
    cmdKPressed(
      state,
      { payload: { openedAt } }: PayloadAction<{ openedAt: number }>,
    ) {
      if (state.openMenus.at(0)?.menuId === "cmdk") {
        const [, ...tail] = state.openMenus;
        state.openMenus = tail;
      } else {
        state.openMenus = [
          {
            menuId: "cmdk",
            scrollableSelection: false,
            alwaysOnTop: false,
            notDismissable: false,
            showAfterDelayMs: 0,
            lingerMs: 0,
            closingAt: undefined,
            openedAt,
            menuParam: emptyObject,
          },
          ...state.openMenus,
        ];
      }
    },
    // --- Listener-driven menu transitions -----------------------------------
    //
    // The reducers below are dispatched by listener middleware in
    // gameMenusListeners.ts in response to cross-slice events from
    // gameInPlaySlice. Each names the menu transition it produces; the
    // listener supplies the payload context.

    deathDialogShown(
      state,
      {
        payload: { deathMenuParam, openedAt },
      }: PayloadAction<{ deathMenuParam: DeathMenuParam; openedAt: number }>,
    ) {
      const newMenu: OpenMenu = {
        menuId: "death",
        scrollableSelection: false,
        alwaysOnTop: false,
        notDismissable: false,
        showAfterDelayMs: 0,
        lingerMs: 0,
        closingAt: undefined,
        openedAt,
        menuParam: deathMenuParam,
      };

      const beneathAlwaysOnTop = state.openMenus.filter(
        ({ alwaysOnTop }) => !alwaysOnTop,
      );
      if (
        beneathAlwaysOnTop.length === 1 &&
        beneathAlwaysOnTop[0].menuId === "death"
      ) {
        // already one game dialog - slip the new one in below it
        // to show after that one is dismissed. Ie, if two playable
        // characters die very close to each other in time.
        replaceMenuStack(state, [beneathAlwaysOnTop[0], newMenu]);
      } else {
        replaceMenuStack(state, [newMenu]);
      }
    },

    /**
     * Show the crowns menu after a crown is collected. If `allCrowns` is true,
     * also pushes the "proclaim emperor" dialog above the crowns menu.
     */
    crownsMenuShown(
      state,
      {
        payload: { playMusic, allCrowns, openedAt },
      }: PayloadAction<{
        playMusic: boolean;
        allCrowns: boolean;
        openedAt: number;
      }>,
    ) {
      const crownsMenu: OpenMenu = {
        menuId: "crowns",
        scrollableSelection: false,
        alwaysOnTop: false,
        notDismissable: false,
        showAfterDelayMs: 0,
        lingerMs: 0,
        closingAt: undefined,
        openedAt,
        menuParam: { playMusic },
      };
      replaceMenuStack(
        state,
        allCrowns ?
          [
            {
              menuId: "proclaimEmperor",
              scrollableSelection: false,
              alwaysOnTop: false,
              notDismissable: false,
              showAfterDelayMs: 0,
              lingerMs: 0,
              closingAt: undefined,
              openedAt,
              menuParam: emptyObject,
            },
            crownsMenu,
          ]
        : [crownsMenu],
      );
    },

    /**
     * Reset the menu stack at the start of a game. Either clears menus
     * entirely (e.g. playtest mode) or shows the crowns intro screen.
     */
    gameStartedMenusOpened(
      state,
      {
        payload: { showCrowns, openedAt },
      }: PayloadAction<{ showCrowns: boolean; openedAt: number }>,
    ) {
      replaceMenuStack(
        state,
        showCrowns ?
          [
            {
              menuId: "crowns",
              scrollableSelection: false,
              alwaysOnTop: false,
              notDismissable: false,
              showAfterDelayMs: 0,
              lingerMs: 0,
              closingAt: undefined,
              openedAt,
              menuParam: { playMusic: true },
            },
          ]
        : [],
      );
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
        (
          | { offerReincarnation: false; scoreAlreadyShown: boolean }
          | { offerReincarnation: true }
        ) & { openedAt: number }
      >,
    ) {
      const { openedAt } = payload;
      const score = {
        menuId: "score",
        scrollableSelection: false,
        alwaysOnTop: false,
        notDismissable: false,
        showAfterDelayMs: 0,
        lingerMs: 0,
        closingAt: undefined,
        openedAt,
        menuParam: emptyObject,
      } as const;
      const offerReincarnation = {
        menuId: "offerReincarnation",
        scrollableSelection: false,
        alwaysOnTop: false,
        notDismissable: false,
        showAfterDelayMs: 0,
        lingerMs: 0,
        closingAt: undefined,
        openedAt,
        menuParam: emptyObject,
      } as const;
      const mainMenu = {
        menuId: "mainMenu",
        scrollableSelection: true,
        alwaysOnTop: false,
        notDismissable: false,
        showAfterDelayMs: 0,
        lingerMs: 0,
        closingAt: undefined,
        openedAt,
        menuParam: { isClosable: false },
      } as const;

      if (payload.offerReincarnation) {
        replaceMenuStack(state, [score, offerReincarnation]);
      } else if (payload.scoreAlreadyShown) {
        replaceMenuStack(state, [mainMenu]);
      } else {
        replaceMenuStack(state, [score, mainMenu]);
      }
    },

    /**
     * Show a scroll's markdown content as a dialog. Picks `markdown/<page>`
     * for manual-source scrolls or `markdown/inline` for inline content.
     */
    scrollContentMenuShown(
      state,
      {
        payload: { scrollConfig, openedAt },
      }: PayloadAction<{ scrollConfig: ScrollConfig; openedAt: number }>,
    ) {
      replaceMenuStack(
        state,
        scrollConfig.source === "manual" ?
          [
            {
              menuId: `markdown/${scrollConfig.page}`,
              scrollableSelection: false,
              alwaysOnTop: false,
              notDismissable: false,
              showAfterDelayMs: 0,
              lingerMs: 0,
              closingAt: undefined,
              openedAt,
              menuParam: emptyObject,
            },
          ]
        : [
            {
              menuId: "markdown/inline",
              scrollableSelection: false,
              alwaysOnTop: false,
              notDismissable: false,
              showAfterDelayMs: 0,
              lingerMs: 0,
              closingAt: undefined,
              openedAt,
              menuParam: {
                markdown:
                  Array.isArray(scrollConfig.markdown) ?
                    scrollConfig.markdown.join("\n\n")
                  : scrollConfig.markdown,
              },
            },
          ],
      );
    },

    /**
     * Show the "you've been reincarnated, restart from save" prompt after
     * the user accepts a reincarnation offer.
     */
    reincarnationRestartMenuShown(
      state,
      { payload: { openedAt } }: PayloadAction<{ openedAt: number }>,
    ) {
      replaceMenuStack(state, [
        {
          menuId: "reincarnatedRestart",
          scrollableSelection: false,
          alwaysOnTop: false,
          notDismissable: false,
          showAfterDelayMs: 0,
          lingerMs: 0,
          closingAt: undefined,
          openedAt,
          menuParam: emptyObject,
        },
      ]);
    },

    needRefreshMenuShown(
      state,
      { payload: { openedAt } }: PayloadAction<{ openedAt: number }>,
    ) {
      state.openMenus = [
        {
          menuId: "needRefresh",
          scrollableSelection: false,
          alwaysOnTop: false,
          notDismissable: false,
          showAfterDelayMs: 0,
          lingerMs: 0,
          closingAt: undefined,
          openedAt,
          menuParam: emptyObject,
        },
        ...state.openMenus,
      ];
    },
  },
  extraReducers(builder) {
    builder.addCase(clearAllData, () => initialGameMenuSliceState);
    builder.addCase(errorCaught, (state, { payload: { openedAt } }) => {
      // when the error slice receives an error, react by showing our error dialog
      // overwrite to blat out all open menus - the menu may have caused the error!
      replaceMenuStack(state, [
        {
          menuId: "errorCaught",
          scrollableSelection: false,
          alwaysOnTop: false,
          notDismissable: false,
          showAfterDelayMs: 0,
          lingerMs: 0,
          closingAt: undefined,
          openedAt,
          menuParam: emptyObject,
        },
      ]);
    });
    builder.addCase(errorDismissed, (state) => {
      replaceMenuStack(state, []);
    });
    // After loading a save on app start, show the hold (paused) menu so the
    // player resumes on their own time rather than dropping straight into
    // gameplay — they may have just opened the tab, may need to re-orient,
    // or may have intended to navigate via URL without auto-playing.
    builder.addCase(
      savedGameLoadedOnAppLoad,
      (state, { payload: { openedAt } }) => {
        replaceMenuStack(state, [
          {
            menuId: "hold",
            scrollableSelection: false,
            alwaysOnTop: false,
            notDismissable: false,
            showAfterDelayMs: 0,
            lingerMs: 0,
            closingAt: undefined,
            openedAt,
            menuParam: emptyObject,
          },
        ]);
      },
    );
  },
});

export const {
  closeAllMenus,
  cmdKPressed,
  crownsMenuShown,
  deathDialogShown,
  gameEndedMenusOpened,
  gameStartedMenusOpened,
  goToSubmenu,
  holdPressed,
  mapPressed,
  menuClosed,
  menuLingerEnded,
  menuLingerStarted,
  menuOpenOrExitPressed,
  needRefreshMenuShown,
  reincarnationRestartMenuShown,
  scrollContentMenuShown,
  setFocussedMenuItemId,
} = gameMenusSlice.actions;
