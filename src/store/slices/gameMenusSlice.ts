import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { EmptyObject, ValueOf } from "type-fest";
import type { DialogId } from "../../game/components/dialogs/menuDialog/DialogId";
import type {
  ActionInputAssignment,
  InputAssignment,
  InputPress,
} from "../../game/input/InputState";
import type { KeyAssignmentPresetName } from "../../game/input/keyAssignmentPresets";
import { keyAssignmentPresets } from "../../game/input/keyAssignmentPresets";

import type { ResolutionName } from "../../originalGame";
import { resolutionNames } from "../../originalGame";
import { directionsXy4 } from "../../utils/vectors/vectors";
import type { MarkdownPageName } from "../../manual/pages";
import type { PlanetName } from "../../sprites/planets";
import type { ToggleablePaths } from "../../utils/Toggleable";
import { getAtPath, setAtPath } from "../../utils/getAtPath";
import { detectDeviceType } from "../../utils/detectDeviceType";
import {
  selectEmulatedResolutionName,
  selectInputDirectionMode,
} from "../selectors";
import type { BooleanAction } from "../../game/input/actions";
import { nextInCycle } from "../../utils/nextInCycle";
import type {
  SavableFromGameMenusState,
  SavedGameState,
} from "../../game/gameState/saving/SavedGameState";
import { REHYDRATE } from "redux-persist";
import { emptyObject } from "../../utils/empty";
import type { RootState } from "../store";
import type { SerialisableError } from "../../utils/redux/createSerialisableErrors";
import type { UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import type { CharacterName } from "../../model/modelTypes";

export type ShowBoundingBoxes = "none" | "all" | "non-wall";

type BaseOpenMenu = {
  // will be undefined if the menu items have not been rendered yet, since relies
  // on rendering to discover the ids
  focussedItemId?: string;
  // maintain because selecting by mouse doesn't trigger scrolling in the renderer
  scrollableSelection: boolean;
};
export type OpenMenu =
  | (BaseOpenMenu & {
      menuId: Exclude<DialogId, "crowns" | "errorCaught">;

      /**
       * menu-specific parameters - for example, the crowns menu can play music
       */
      menuParam: EmptyObject;
    })
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

  // sound options
  soundSettings: SoundSettings;
};

const inBrowser = detectDeviceType() !== "server";
const cheatsOn =
  inBrowser ?
    // in a browser
    new URLSearchParams(window.location.search).has("cheats")
    // in node (probably vitest)
  : false;

export type ScrollsRead = {
  [m in MarkdownPageName]?: true;
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

  planetsLiberated: Record<PlanetName, boolean>;
  roomsExplored: Record<string, true>; // RoomId ?

  /**
   * the current game, saved in case the game is closed and come back
   * to later - eg mobile app is switched away from, or the user switches
   * to another tab
   */
  currentGame?: SavedGameState;

  /**
   * The reincarnation point to continue from after losing all lives.
   *
   * Recursively (optionally) contains another reincarnationPoint, so it naturally
   * creates a linked-list of saves. This is how multiple saves are handled from
   * a single property.
   */
  reincarnationPoint?: SavedGameState;

  gameRunning: boolean;
  /**
    we don't want to show the same scroll twice, even if it is in a different room
    so record what we've read:
  */
  scrollsRead: ScrollsRead;

  // if cheats are on, some cheat/debugging options are available
  cheatsOn: boolean;
};

type BooleanStatePaths = ToggleablePaths<GameMenusState>;

const noPlanetsLiberated = {
  blacktooth: false,
  bookworld: false,
  egyptus: false,
  penitentiary: false,
  safari: false,
};

export const initialGameMenuSliceState: GameMenusState = {
  userSettings: {
    displaySettings: {},
    soundSettings: {},
  },

  planetsLiberated: noPlanetsLiberated,
  roomsExplored: {},
  scrollsRead: {},
  gameRunning: cheatsOn,

  openMenus:
    cheatsOn ?
      // if cheats are on we skip menus for debugging:
      []
      // normal case: when we first load, show the main menu:
    : [
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
  currentGame: undefined,
  reincarnationPoint: undefined,
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
    scrollRead(
      state,
      { payload: markdownPageName }: PayloadAction<MarkdownPageName>,
    ) {
      state.scrollsRead[markdownPageName] = true;
      state.openMenus = [
        {
          menuId: `markdown/${markdownPageName}`,
          scrollableSelection: false,
          menuParam: emptyObject,
        },
      ];
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
    gameStarted(state) {
      if (state.gameRunning) {
        state.openMenus = [];
      } else {
        // go to crowns menu page if not already started the game
        state.openMenus = [
          {
            menuId: "crowns",
            scrollableSelection: false,
            menuParam: { playMusic: false },
          },
        ];
        state.gameRunning = true;
        state.planetsLiberated = noPlanetsLiberated;
        state.roomsExplored = {};
        state.scrollsRead = {};
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
      { payload }: PayloadAction<"hold" | "unhold" | "toggle">,
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
      state.planetsLiberated[planet] = true;

      const allCrowns = Object.values(state.planetsLiberated).every((b) => b);

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
      state.roomsExplored[roomId] = true;
    },
    gameOver(
      state,
      {
        payload: { offerReincarnation },
      }: PayloadAction<{ offerReincarnation: boolean }>,
    ) {
      if (offerReincarnation && state.reincarnationPoint !== undefined) {
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
        delete state.reincarnationPoint;
        delete state.currentGame;
        /*
        keep these for the scores dialog
        state.planetsLiberated = noPlanetsLiberated;
        state.roomsExplored = {};
        state.scrollsRead = {};
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
    reincarnationFishEaten(state, { payload }: PayloadAction<SavedGameState>) {
      state.reincarnationPoint = payload;
    },
    reincarnationAccepted(state) {
      delete state.reincarnationPoint;
      // close the menu offering reincarnation
      state.openMenus = [
        {
          menuId: "reincarnatedRestart",
          scrollableSelection: false,
          menuParam: emptyObject,
        },
      ];
    },
    saveCurrentGame(state, { payload }: PayloadAction<SavedGameState>) {
      state.currentGame = payload;
    },
    gameRestoreFromSave(
      state,
      { payload }: PayloadAction<SavableFromGameMenusState>,
    ) {
      Object.assign(state, payload);
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
      { payload: strategy }: PayloadAction<"ignore" | "clearAllData">,
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
      }>,
    ) {},
    characterRoomChange(
      _state,
      _action: PayloadAction<{ characterName: CharacterName; roomId: string }>,
    ) {
      // currently a noop, although could be used to update the player rooms if this gets into the store
    },
  },
  extraReducers(builder) {
    type RehydrateAction = PayloadAction<
      Pick<GameMenusState, "currentGame"> | undefined,
      typeof REHYDRATE
    >;

    builder.addCase<typeof REHYDRATE, RehydrateAction>(
      REHYDRATE,
      (state, action) => {
        if (action.payload?.currentGame) {
          // we have just loaded and a game is already in progress from a previous session
          state.gameRunning = true;
          state.openMenus = [
            {
              menuId: "hold",
              scrollableSelection: false,
              menuParam: emptyObject,
            },
          ];
        }
      },
    );
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
  characterRoomChange,
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
  mapPressed,
  menuOpenOrExitPressed,
  nextInputDirectionMode,
  reincarnationAccepted,
  reincarnationFishEaten,
  roomExplored,
  saveCurrentGame,
  scrollRead,
  setEmulatedResolution,
  setFocussedMenuItemId,
  setShowBoundingBoxes,
  setShowShadowMasks,
  toggleBoolean,
} = gameMenusSlice.actions;

export const gameMenusSliceActions = gameMenusSlice.actions;
