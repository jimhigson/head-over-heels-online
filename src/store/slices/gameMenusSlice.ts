import type { PayloadAction } from "@reduxjs/toolkit";
import type { Container } from "pixi.js";
import type { EmptyObject, ValueOf } from "type-fest";

import { createSlice, current } from "@reduxjs/toolkit";
import { canonicalize } from "json-canonicalize";
import { REHYDRATE } from "redux-persist";

import type { DialogId } from "../../game/components/dialogs/menuDialog/DialogId";
import type { SavedGame } from "../../game/gameState/saving/SavedGameState";
import type { BooleanAction } from "../../game/input/actions";
import type {
  ActionInputAssignment,
  InputAssignment,
  InputPress,
} from "../../game/input/InputAssignment";
import type { KeyAssignmentPresetName } from "../../game/input/keyAssignmentPresets";
import type { PlayableItem } from "../../game/physics/itemPredicates";
import type { MarkdownPageName } from "../../manual/pages";
import type { UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import type { ScrollConfig } from "../../model/json/ItemConfigMap";
import type { CampaignLocator, CharacterName } from "../../model/modelTypes";
import type { ResolutionName } from "../../originalGame";
import type { PlanetName } from "../../sprites/planets";
import type { SerialisableError } from "../../utils/redux/createSerialisableErrors";
import type { ToggleablePaths } from "../../utils/Toggleable";
import type { gameMenusSliceWhitelist } from "../persist/gameMenusSliceWhitelist";
import type { RootState } from "../store";

import { keyAssignmentPresets } from "../../game/input/keyAssignmentPresets";
import { isInPlaytestMode } from "../../game/isInPlaytestMode";
import { typedURLSearchParams } from "../../options/queryParams";
import { resolutionNames } from "../../originalGame";
import { detectDeviceType } from "../../utils/detectDeviceType";
import { emptyObject } from "../../utils/empty";
import { getAtPath, setAtPath } from "../../utils/getAtPath";
import { nextInCycle } from "../../utils/nextInCycle";
import { pick } from "../../utils/pick";
import { directionsXy4 } from "../../utils/vectors/vectors";
import {
  selectEmulatedResolutionName,
  selectGameSpeed,
  selectInputDirectionMode,
} from "../selectors";
import {
  selectableGameSpeeds,
  type SelectableGameSpeeds,
} from "./selectableGameSpeeds";

export const showBoundingBoxOptions = ["none", "non-wall", "all"] as const;
export type ShowBoundingBoxes = (typeof showBoundingBoxOptions)[number];

/**
 * make a key so we can store campaigns against campaign locators, with composite keys,
 * as values on a plain old js objects in the store
 */
const gameStateLocatorKey = (campaignLocator: CampaignLocator) => {
  // leave version out, since a new version of a campaign can be made and hopefully the saves
  // can still apply
  return canonicalize(pick(campaignLocator, "userId", "campaignName"));
};

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
      menuId: "errorCaught";
      menuParam: Array<SerialisableError>;
    })
  | (BaseOpenMenu & {
      menuId: "markdown/inline";
      // the markdown content
      menuParam: { markdown: string };
    })
  | (BaseOpenMenu & {
      menuId: Exclude<DialogId, "crowns" | "errorCaught" | "markdown/inline">;

      /**
       * menu-specific parameters - for example, the crowns menu can play music
       */
      menuParam: EmptyObject;
    });

export type DisplaySettings = {
  emulatedResolution?: ResolutionName;
  crtFilter?: boolean;
  // all settings named after the opposite of the default - hence, uncolourised, not colourised
  uncolourised?: false;
  showBoundingBoxes?: ShowBoundingBoxes;
  showShadowMasks?: boolean;
};

export const inputDirectionModes = ["4-way", "8-way", "analogue"] as const;
export type InputDirectionMode = (typeof inputDirectionModes)[number];

export type SoundSettings = {
  mute?: boolean;
  noFootsteps?: boolean;
};

export type UserSettings = {
  inputAssignment?: InputAssignment;
  displaySettings: DisplaySettings;
  infiniteLivesPoke?: boolean;
  infiniteDoughnutsPoke?: boolean;
  showFps?: boolean;
  inputDirectionMode?: InputDirectionMode;
  screenRelativeControl?: boolean;
  onScreenControls?: boolean;
  gameSpeed?: SelectableGameSpeeds;

  // sound options
  soundSettings: SoundSettings;
};

const inBrowser = detectDeviceType() !== "server";
const cheatsOn =
  inBrowser ?
    // in a browser
    typedURLSearchParams().has("cheats")
    // in node (probably vitest)
  : false;

export type ScrollsRead = {
  [m in MarkdownPageName]?: true;
};

/**
 * the parts of a game in play state that are kept in the store. Not everything
 * goes in the store because in-play rooms etc need to be mutated in-place fo
 * performance
 *
 * this works:
 *  * in play
 *  * for saves (plus serialisation of the gameState)
 *  * for reincarnation fish save points
 */
export type GameInPlayStoreState = {
  planetsLiberated: Record<PlanetName, boolean>;
  roomsExplored: Record<string, true>;
  /**
    we don't want to show the same scroll twice, even if it is in a different room
    so record what we've read:
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
};

const noPlanetsLiberated = {
  blacktooth: false,
  bookworld: false,
  egyptus: false,
  penitentiary: false,
  safari: false,
};
const initialGameInPlayStoreState = {
  planetsLiberated: noPlanetsLiberated,
  roomsExplored: {},
  scrollsRead: {},
  reincarnationPoint: undefined,
};

export type GameMenusState = {
  /**
   * stack of menus currently open - empty if none are
   */
  openMenus: OpenMenu[];

  /**
   * for the key assignment menu, the key currently being assigned
   */
  assigningInput:
    | {
        action: BooleanAction;
        presses: ActionInputAssignment;
        axes: number[];
      }
    | undefined;

  /* all user settings are optional - if not stated in the store, the selector's
    job is to use a default instead */
  userSettings: UserSettings;

  /**
   * this could maybe be replaced with conditionality of gameInPlay. However, currently
   * this would break the score dialog after game over, since at that point the game is
   * not playing, but it does need the data from this object.
   */
  gameRunning: boolean;
  gameInPlay: GameInPlayStoreState;

  /**
   * current saved games, per-campaign, saved in case the game is closed and come back
   * to later - eg mobile app is switched away from, or the user switches
   * to another tab
   */
  savedGames: {
    saves: { [campaignLocatorFlat: string]: SavedGame };
    /**
     * location of the campaign that was most recently saved. This is the one the
     * app will automatically restore from on reloading - must exist as
     * a key in saves
     */
    lastSavedCampaignLocator?: CampaignLocator;
  };

  // if cheats are on, some cheat/debugging options are available
  cheatsOn: boolean;
};

/**
 * paths used in switches and teleporters when they reference into the store
 */
export type BooleanStatePaths = ToggleablePaths<
  Pick<GameMenusState, "gameInPlay" | "userSettings">
>;

export const initialGameMenuSliceState: GameMenusState = {
  userSettings: {
    displaySettings: {},
    soundSettings:
      navigator.webdriver ?
        // avoid playing sounds while running visual integration tests:
        { mute: true }
      : {},
  },

  gameRunning: false,
  gameInPlay: initialGameInPlayStoreState,

  openMenus:
    // this feature is off - ?cheats=1 no longer linked to skipping  menus
    // maybe a separate flag could be added if we need this later
    //cheatsOn ? [] :

    // start the app with the main menu showing:
    [
      {
        menuId: "mainMenu",
        scrollableSelection: false,
        menuParam: emptyObject,
      },
    ],
  assigningInput: undefined,
  cheatsOn,

  // optional fields given explicitly as undefined so that on restoring
  // a blank state after a crash, this can be used to overwrite the store
  savedGames: {
    saves: {},
  },
};

/**
 * a slice for all the state that is controlled in react-land
 * (most state is controlled in the game itself and not touched here)
 */
export const gameMenusSlice = createSlice({
  name: "gameMenus",
  initialState: initialGameMenuSliceState,
  reducers: {
    setEmulatedResolution(
      state,
      { payload }: PayloadAction<ResolutionName | undefined>,
    ) {
      let emulatedResolution;
      if (payload === undefined) {
        emulatedResolution = nextInCycle(
          resolutionNames,
          selectEmulatedResolutionName({ gameMenus: state } as RootState),
        );
      } else {
        emulatedResolution = payload;
      }

      state.userSettings.displaySettings.emulatedResolution =
        emulatedResolution;
    },
    setGameSpeed(
      state,
      { payload }: PayloadAction<SelectableGameSpeeds | undefined>,
    ) {
      let gameSpeed: SelectableGameSpeeds;
      if (payload === undefined) {
        gameSpeed = nextInCycle(
          selectableGameSpeeds,
          selectGameSpeed({ gameMenus: state } as RootState),
        );
      } else {
        gameSpeed = payload;
      }

      state.userSettings.gameSpeed = gameSpeed;
    },
    scrollRead(state, { payload: scrollConfig }: PayloadAction<ScrollConfig>) {
      if (scrollConfig.source === "manual") {
        state.gameInPlay.scrollsRead[scrollConfig.page] = true;
        state.openMenus = [
          {
            menuId: `markdown/${scrollConfig.page}`,
            scrollableSelection: false,
            menuParam: emptyObject,
          },
        ];
      } else {
        state.openMenus = [
          {
            menuId: `markdown/inline`,
            scrollableSelection: false,
            menuParam: { markdown: scrollConfig.markdown },
          },
        ];
      }
    },
    nextInputDirectionMode(state) {
      state.userSettings.inputDirectionMode = nextInCycle(
        inputDirectionModes,
        selectInputDirectionMode({ gameMenus: state } as RootState),
      );
    },
    /** adds another input to the currently being assigned action */
    inputAddedDuringAssignment(state, { payload }: PayloadAction<InputPress>) {
      if (state.assigningInput === undefined) {
        throw new Error("reducer called while not assigning keys");
      }

      const addIfUnique = <E>(arr: E[], el: NoInfer<E>) => {
        if (!arr.includes(el)) {
          arr.push(el);
        }
      };

      const { presses: actionInput, axes, action } = state.assigningInput;
      switch (payload.type) {
        case "key":
          addIfUnique(actionInput.keys, payload.input);
          break;
        case "gamepadButtons":
          addIfUnique(actionInput.gamepadButtons, payload.input);
          break;
        case "gamepadAxes": {
          const actionCanHaveAxisAssigned = (
            directionsXy4 as Readonly<string[]>
          ).includes(action);

          if (actionCanHaveAxisAssigned) {
            addIfUnique(axes, payload.input);
          }
          break;
        }
        default:
          payload satisfies never;
      }
    },
    doneAssigningInput(state) {
      if (state.assigningInput === undefined) {
        throw new Error("illegal action for state");
      }
      const { action, presses: actionInput, axes } = state.assigningInput;

      const totalInputs =
        actionInput.keys.length +
        actionInput.gamepadButtons.length +
        axes.length;

      const inputAssignment =
        state.userSettings.inputAssignment === undefined ?
          // user didn't previously have any keys set - copy the defaults in
          (state.userSettings.inputAssignment = structuredClone(
            keyAssignmentPresets.default.inputAssignment,
          ))
        : state.userSettings.inputAssignment;

      if (totalInputs > 0) {
        // the user inputted something - use the boolean actions:
        inputAssignment.presses[action] = actionInput;
        // copy axes if we're assigning something that can use them
        if (action === "left" || action === "right") {
          inputAssignment.axes.x = axes;
        }
        if (action === "towards" || action === "away") {
          inputAssignment.axes.y = axes;
        }
      }
      state.assigningInput = undefined;
    },
    menuOpenOrExitPressed(state) {
      if (state.openMenus.length > 0) {
        if (state.openMenus.length === 1 && !state.gameRunning) {
          return; // can't exit main menu if game not running
        }

        // go up one menu:
        const [, ...tail] = state.openMenus;
        state.openMenus = tail;
      } else {
        state.openMenus = [
          {
            menuId: "mainMenu",
            scrollableSelection: false,
            menuParam: emptyObject,
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
    gameStarted(
      state,
      {
        payload: { campaignLocator, noShowCrowns },
      }: PayloadAction<{
        campaignLocator: CampaignLocator;
        // set to true to skip the crowns screen on game start -
        // eg, for playtest mode
        noShowCrowns?: boolean;
      }>,
    ) {
      if (state.gameRunning) {
        // resuming an already-running game:
        throw new Error("game is already running");
      } else {
        // starting a new game:
        // go to crowns menu page if not already started the game
        state.openMenus =
          noShowCrowns ?
            []
          : [
              {
                menuId: "crowns",
                scrollableSelection: false,
                menuParam: { playMusic: false },
              },
            ];
        state.gameRunning = true;
        state.gameInPlay = {
          ...initialGameInPlayStoreState,
          campaignLocator,
        };
      }
    },
    backToParentMenu(state) {
      const [, ...tail] = state.openMenus;
      state.openMenus = tail;
    },
    assignInputStart(state, { payload: action }: PayloadAction<BooleanAction>) {
      state.assigningInput = {
        action,
        presses: { gamepadButtons: [], keys: [] },
        axes: [],
      };
    },
    keyAssignmentPresetChosen(
      state,
      {
        payload: keyAssignmentPresetName,
      }: PayloadAction<KeyAssignmentPresetName>,
    ) {
      const [, ...tail] = state.openMenus;
      state.openMenus = tail;
      (state as GameMenusState).userSettings.inputAssignment =
        keyAssignmentPresets[keyAssignmentPresetName].inputAssignment;
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
      const showingAMenu = state.openMenus.length > 0;

      if (showingAMenu) {
        const showingMapAlready = state.openMenus[0]?.menuId === "map";
        if (showingMapAlready) {
          // exit
          state.openMenus = [];
        }
        // else do nothing if hold pressed while in menus
      } else {
        // show the map:
        state.openMenus = [
          {
            menuId: "map",
            scrollableSelection: false,
            menuParam: emptyObject,
          },
        ];
      }
    },
    setShowBoundingBoxes(
      state,
      { payload: showBoundingBoxes }: PayloadAction<ShowBoundingBoxes>,
    ) {
      state.userSettings.displaySettings.showBoundingBoxes = showBoundingBoxes;
    },
    setShowShadowMasks(
      state,
      { payload: showShadowMasks }: PayloadAction<boolean>,
    ) {
      state.userSettings.displaySettings.showShadowMasks = showShadowMasks;
    },

    toggleBoolean(state, { payload }: PayloadAction<BooleanStatePaths>) {
      setAtPath(state, payload, !getAtPath(state, payload));
    },

    crownCollected(state, { payload: planet }: PayloadAction<PlanetName>) {
      state.gameInPlay.planetsLiberated[planet] = true;

      const allCrowns = Object.values(state.gameInPlay.planetsLiberated).every(
        (b) => b,
      );

      const crownsMenu = {
        menuId: "crowns",
        scrollableSelection: false,
        menuParam: { playMusic: true },
      } as const;

      if (allCrowns) {
        state.openMenus = [
          {
            menuId: "proclaimEmperor",
            scrollableSelection: false,
            menuParam: emptyObject,
          },
          crownsMenu,
        ];
      } else {
        state.openMenus = [crownsMenu];
      }
    },
    roomExplored(state, { payload: roomId }: PayloadAction<string>) {
      state.gameInPlay.roomsExplored[roomId] = true;
    },
    gameOver(
      state,
      {
        payload: { offerReincarnation },
      }: PayloadAction<{ offerReincarnation: boolean }>,
    ) {
      if (
        offerReincarnation &&
        state.gameInPlay.reincarnationPoint !== undefined
      ) {
        state.openMenus = [
          {
            menuId: "score",
            scrollableSelection: false,
            menuParam: emptyObject,
          },
          {
            menuId: "offerReincarnation",
            scrollableSelection: false,
            menuParam: emptyObject,
          },
        ];
      } else {
        state.gameRunning = false;
        delete state.gameInPlay.reincarnationPoint;
        const currentCampaignLocator = state.gameInPlay.campaignLocator;
        const locatorKey =
          currentCampaignLocator && gameStateLocatorKey(currentCampaignLocator);
        console.log(current(state.savedGames));
        if (locatorKey) {
          delete state.savedGames.saves[locatorKey];
          delete state.savedGames.lastSavedCampaignLocator;
        }
        console.log(current(state.savedGames));
        /*
        keep these for the scores dialog
        state.gameInPlay.planetsLiberated = noPlanetsLiberated;
        state.gameInPlay.roomsExplored = {};
        state.gameInPlay.scrollsRead = {};
        */
        state.openMenus = [
          {
            menuId: "score",
            scrollableSelection: false,
            menuParam: emptyObject,
          },
          {
            menuId: "mainMenu",
            scrollableSelection: true,
            menuParam: emptyObject,
          },
        ];
      }
    },
    reincarnationFishEaten(state, { payload }: PayloadAction<SavedGame>) {
      state.gameInPlay.reincarnationPoint = payload;
    },
    reincarnationAccepted(state) {
      delete state.gameInPlay.reincarnationPoint;
      // close the menu offering reincarnation
      state.openMenus = [
        {
          menuId: "reincarnatedRestart",
          scrollableSelection: false,
          menuParam: emptyObject,
        },
      ];
    },
    saveGame(state, { payload }: PayloadAction<SavedGame>) {
      const currentCampaignLocator = state.gameInPlay.campaignLocator;

      if (currentCampaignLocator === undefined) {
        throw new Error(
          "trying to save a game, but seems like there's no campaign to save against",
        );
      }

      if (isInPlaytestMode()) {
        throw new Error("shouldn't be saving in playtest mode");
      }

      // only puts the saved game in the store - it is up to
      // redux-persist to actually save it. The savedGame property should be
      // on its whitelist
      state.savedGames.saves[gameStateLocatorKey(currentCampaignLocator)] =
        payload;
      state.savedGames.lastSavedCampaignLocator = currentCampaignLocator;
    },
    gameRestoreFromSave(
      state,
      { payload }: PayloadAction<GameInPlayStoreState>,
    ) {
      state.gameInPlay = payload;
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
    errorDismissed(
      state,
      { payload: strategy }: PayloadAction<"clearAllData" | "ignore">,
    ) {
      switch (strategy) {
        case "ignore":
          state.openMenus = [];
          break;
        case "clearAllData":
          Object.assign(state, initialGameMenuSliceState);
          state.gameRunning = false;
          break;
        default:
          strategy satisfies never;
      }
    },
    /** for when the cheats are on, a no-op reducer (exists for the listener api)
     * that is dispatched after clicking on items
     */
    debugItemClicked(
      _state,
      _action: PayloadAction<{
        item: UnionOfAllItemInPlayTypes<string, string>;
        pixiContainer: Container;
      }>,
    ) {},
    /**
     * @deprecated characterRoomChange is redundant and can be merged with roomExplored
     * since they do almost the same thing, and are (almost) always fired together
     */
    characterRoomChange(
      _state,
      _action: PayloadAction<{ characterName: CharacterName; roomId: string }>,
    ) {
      // currently a noop for listeners.
      // Could be used to update the player rooms if this state
      // is moved into the store
    },
    lostLife(
      _state,
      _action: PayloadAction<{
        characterLosingLifeItem: PlayableItem<CharacterName, string>;
      }>,
    ) {
      // currently a noop for listeners.
      // Could be used to update the player rooms if this state
      // is moved into the store
    },
  },
  extraReducers(builder) {
    type RehydrateAction = PayloadAction<
      | Pick<GameMenusState, (typeof gameMenusSliceWhitelist)[number]>
      | undefined,
      typeof REHYDRATE
    >;

    // add a case for when the state is restored from redux-persist. Redux persist
    // will put the .savedGame property in for us, we just do a bit of housekeeping
    // for it
    builder.addCase<typeof REHYDRATE, RehydrateAction>(
      REHYDRATE,
      (state, action) => {
        if (typedURLSearchParams().get("campaignName")?.startsWith("data:")) {
          // this is a playtest session, we can skip loading any saves
          return;
        }

        const menusAfterRestore: OpenMenu[] = [
          // after restoring, start paused:
          {
            menuId: "hold",
            scrollableSelection: false,
            menuParam: emptyObject,
          },
        ];

        const paramCampaignLocator: Partial<CampaignLocator> = {
          userId:
            typedURLSearchParams().get("campaignAuthorUserId") ?? undefined,
          campaignName: typedURLSearchParams().get("campaignName") ?? undefined,
        };

        const savedGames = action.payload?.savedGames;

        const isCompleteCampaignLocator = (
          campaignLocator: Partial<CampaignLocator>,
        ): campaignLocator is CampaignLocator => {
          return (
            campaignLocator.userId !== undefined &&
            campaignLocator.campaignName !== undefined
          );
        };

        if (isCompleteCampaignLocator(paramCampaignLocator)) {
          state.gameRunning = true;
          const savedGameForParamCampaign =
            savedGames?.saves[gameStateLocatorKey(paramCampaignLocator)];

          if (savedGameForParamCampaign) {
            // have a campaign url and a save for that campaign:
            state.gameRunning = true;
            state.gameInPlay =
              savedGameForParamCampaign.store.gameMenus.gameInPlay;
            state.openMenus = menusAfterRestore;
            return;
          } else {
            // have a campaign url and no save for this campaign:
            state.gameRunning = true;
            state.gameInPlay = {
              ...initialGameInPlayStoreState,
              campaignLocator: paramCampaignLocator,
            };
            state.openMenus = menusAfterRestore;
            return;
          }
        }

        // no campaign in url params - check what the last campaign the user was playing
        // is and if they have a save:
        const lastSavedCampaignLocator = savedGames?.lastSavedCampaignLocator;

        const inPlaySave =
          lastSavedCampaignLocator &&
          savedGames.saves[gameStateLocatorKey(lastSavedCampaignLocator)];

        if (inPlaySave) {
          // we have just loaded and a game is already in progress from a previous session
          state.gameRunning = true;
          state.gameInPlay = inPlaySave.store.gameMenus.gameInPlay;
          state.openMenus = menusAfterRestore;
        }
      },
    );
  },
  selectors: {
    selectHasError(state: GameMenusState) {
      return state.openMenus.some((menu) => menu.menuId === "errorCaught");
    },
    selectSaveForCampaign(
      state: GameMenusState,
      campaignLocator: CampaignLocator,
    ) {
      return state.savedGames.saves[gameStateLocatorKey(campaignLocator)];
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
  assignInputStart,
  backToParentMenu,
  /**
   * @deprecated characterRoomChange is redundant and can be merged with roomExplored
   * since they do almost the same thing, and are (almost) always fired together
   */
  characterRoomChange,
  closeAllMenus,
  crownCollected,
  debugItemClicked,
  doneAssigningInput,
  errorCaught,
  errorDismissed,
  gameOver,
  gameRestoreFromSave,
  gameStarted,
  goToSubmenu,
  holdPressed,
  inputAddedDuringAssignment,
  keyAssignmentPresetChosen,
  lostLife,
  mapPressed,
  menuOpenOrExitPressed,
  nextInputDirectionMode,
  reincarnationAccepted,
  reincarnationFishEaten,
  roomExplored,
  saveGame,
  scrollRead,
  setEmulatedResolution,
  setFocussedMenuItemId,
  setGameSpeed,
  setShowBoundingBoxes,
  setShowShadowMasks,
  toggleBoolean,
} = gameMenusSlice.actions;

export const { selectHasError } = gameMenusSlice.selectors;

// provide a variant of this selector that can provide a RoomId without the callsite casting
export const selectSaveForCampaign = gameMenusSlice.selectors
  .selectSaveForCampaign as <RoomId extends string>(
  state: { gameMenus: GameMenusState },
  campaignLocator: CampaignLocator,
) => SavedGame<RoomId>;

export const gameMenusSliceActions = gameMenusSlice.actions;
