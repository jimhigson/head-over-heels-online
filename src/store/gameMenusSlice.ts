import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { ValueOf } from "type-fest";
import type { DialogId } from "../game/components/dialogs/menuDialog/menus";
import type {
  BooleanAction,
  ActionInputAssignment,
  InputAssignment,
  InputPress,
} from "../game/input/InputState";
import type { KeyAssignmentPresetName } from "../game/input/keyAssignmentPresets";
import { keyAssignmentPresets } from "../game/input/keyAssignmentPresets";
import type { Upscale } from "../game/render/calculateUpscale";
import { calculateUpscale } from "../game/render/calculateUpscale";
import { zxSpectrumResolution } from "../originalGame";
import { directionsXy4, type Xy } from "../utils/vectors/vectors";
import type { MarkdownPageName } from "../manual/pages";
import type { PlanetName } from "../sprites/planets";
import type { ToggleablePaths } from "../utils/Toggleable";
import { getAtPath, setAtPath } from "../utils/getAtPath";

export type ShowBoundingBoxes = "none" | "all" | "non-wall";

export type OpenMenu = {
  menuId: DialogId;
  // will be undefined if the menu items have not been rendered yet, since relies
  // on rendering to discover the ids
  focussedItemId?: string;
  // maintain because selecting by mouse doesn't trigger scrolling in the renderer
  scrollableSelection: boolean;
};

export type DisplaySettings = {
  emulatedResolution: Xy;
  crtFilter: boolean;
  colourise: boolean;
  showBoundingBoxes: ShowBoundingBoxes;
  showShadowMasks: boolean;
};

export type UserSettings = {
  inputAssignment: InputAssignment;
  displaySettings: DisplaySettings;
  infiniteLivesPoke: boolean;
  // optional because was introduced without a version bump in persist. Select with !!
  showFps: boolean;
  analogueControl: boolean;
  screenRelativeControl: boolean;
};

const inBrowser = typeof globalThis.window !== "undefined";
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

  userSettings: UserSettings;
  upscale: Upscale;

  planetsLiberated: Record<PlanetName, boolean>;
  roomsExplored: Record<string, true>; // RoomId ?
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
    inputAssignment: keyAssignmentPresets.default.inputAssignment,
    infiniteLivesPoke: false,

    displaySettings: {
      showBoundingBoxes: "none",
      showShadowMasks: false,
      crtFilter: true,
      colourise: true,
      emulatedResolution: zxSpectrumResolution,
    },

    showFps: false,
    analogueControl: false,
    screenRelativeControl: false,
  },
  upscale: calculateUpscale(
    inBrowser ?
      { x: globalThis.window.innerWidth, y: globalThis.window.innerHeight }
      // use zx spectrum resolution as a default for node (running tests under vitest)
    : zxSpectrumResolution,
    zxSpectrumResolution,
    1,
  ),

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
        },
      ],
  assigningInput: undefined,

  cheatsOn,
};

/**
 * a slice for all the state that is controlled in react-land
 * (most state is controlled in the game itself and not touched here)
 */
export const gameMenusSlice = createSlice({
  name: "gameMenus",
  initialState: initialGameMenuSliceState,
  reducers: {
    setUpscale(state, { payload: upscale }: PayloadAction<Upscale>) {
      state.upscale = upscale;
    },
    setEmulatedResolution(
      state,
      { payload: emulatedResolution }: PayloadAction<Xy>,
    ) {
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
        },
      ];
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

      if (totalInputs > 0) {
        // the user inputted something - use the boolean actions:
        state.userSettings.inputAssignment.presses[action] = actionInput;
        // copy axes if we're assigning something that can use them
        if (action === "left" || action === "right") {
          state.userSettings.inputAssignment.axes.x = axes;
        }
        if (action === "towards" || action === "away") {
          state.userSettings.inputAssignment.axes.y = axes;
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
        state.openMenus = [{ menuId: "mainMenu", scrollableSelection: false }];
      }
    },
    goToSubmenu(state, { payload: dialogId }: PayloadAction<DialogId>) {
      state.openMenus = [
        {
          menuId: dialogId,
          scrollableSelection: false,
        },
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
          state.openMenus = [{ menuId: "hold", scrollableSelection: false }];
        }
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
      state.openMenus = [{ menuId: "crowns", scrollableSelection: false }];
    },
    roomExplored(state, { payload: roomId }: PayloadAction<string>) {
      state.roomsExplored[roomId] = true;
    },
    gameOver(state) {
      state.gameRunning = false;
      state.openMenus = [
        { menuId: "gameOver", scrollableSelection: false },
        { menuId: "mainMenu", scrollableSelection: true },
      ];
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
  crownCollected,
  doneAssigningInput,
  gameOver,
  gameStarted,
  goToSubmenu,
  holdPressed,
  inputAddedDuringAssignment,
  keyAssignmentPresetChosen,
  menuOpenOrExitPressed,
  setEmulatedResolution,
  setFocussedMenuItemId,
  setShowBoundingBoxes,
  setShowShadowMasks,
  setUpscale,
  scrollRead,
  toggleBoolean,
  roomExplored,
} = gameMenusSlice.actions;

export const gameMenusSliceActions = gameMenusSlice.actions;
