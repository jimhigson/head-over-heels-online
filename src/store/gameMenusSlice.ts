import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { ValueOf } from "type-fest";
import type { MenuId } from "../game/components/dialogs/menuDialog/menus";
import { menus } from "../game/components/dialogs/menuDialog/menus";
import type {
  Action,
  AssignableInput,
  InputAssignment,
} from "../game/input/InputState";
import { keyAssignmentPresets } from "../game/input/keyAssignmentPresets";
import type { Upscale } from "../game/render/calculateUpscale";
import { calculateUpscale } from "../game/render/calculateUpscale";
import { zxSpectrumResolution } from "../originalGame";
import type { Xy } from "../utils/vectors/vectors";
import type { MarkdownPageName } from "../manual/pages";
import type { PlanetName } from "../sprites/planets";
import { always } from "../utils/always";

export type ShowBoundingBoxes = "none" | "all" | "non-wall";

export type OpenMenu = {
  menuId: MenuId;
  selectedIndex: number;
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
  livesModel: "infinite" | "original";
};

const inBrowser = typeof globalThis.window !== "undefined";
const cheatsOn =
  inBrowser ?
    // in a browser
    new URLSearchParams(window.location.search).has("cheats")
    // in node (probably vitest)
  : false;

export type GameMenusState = {
  /**
   * stack of menus currently open - empty if none are
   */
  openMenus: OpenMenu[];

  /**
   * for the key assignment menu, the key currently being assigned
   */
  actionBeingAssignedKeys: Action | undefined;

  userSettings: UserSettings;
  upscale: Upscale;

  planetsLiberated: Record<PlanetName, boolean>;
  gameRunning: boolean;

  // if cheats are on, some cheat/debugging options are available
  cheatsOn: boolean;
};

const initialState: GameMenusState = {
  userSettings: {
    inputAssignment: keyAssignmentPresets.default.inputAssignment,
    livesModel: "original",
    displaySettings: {
      showBoundingBoxes: "none",
      showShadowMasks: false,
      crtFilter: true,
      colourise: true,
      emulatedResolution: zxSpectrumResolution,
    },
  },
  upscale: calculateUpscale(
    inBrowser ?
      { x: globalThis.window.innerWidth, y: globalThis.window.innerHeight }
      // use zx spectrum resolution as a default for node (running tests under vitest)
    : zxSpectrumResolution,
    zxSpectrumResolution,
    1,
  ),

  planetsLiberated: {
    blacktooth: false,
    bookworld: false,
    egyptus: false,
    penitentiary: false,
    safari: false,
  },

  openMenus:
    cheatsOn ?
      // if cheats are on we skip menus for debugging:
      []
      // normal case: when we first load, show the main menu:
    : [{ selectedIndex: 0, menuId: "mainMenu" }],
  actionBeingAssignedKeys: undefined,

  // if cheating (debugging), the game is already running
  gameRunning: cheatsOn,

  cheatsOn,
};

/**
 * a slice for all the state that is controlled in react-land
 * (most state is controlled in the game itself and not touched here)
 */
export const gameMenusSlice = createSlice({
  name: "gameMenus",
  initialState,
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
    showScroll(
      state,
      { payload: markdownPageName }: PayloadAction<MarkdownPageName>,
    ) {
      state.openMenus = [
        { menuId: `markdown/${markdownPageName}`, selectedIndex: 0 },
      ];
    },
    /** adds another input to the currently being assigned action */
    inputAssigned(
      state,
      { payload: assignableInput }: PayloadAction<AssignableInput>,
    ) {
      if (assignableInput === undefined) {
        throw new Error(
          // should be impossible by the types, but who knows?
          `can not assign undefined to ${state.actionBeingAssignedKeys}`,
        );
      }
      if (state.actionBeingAssignedKeys === undefined) {
        throw new Error("reducer called while not assigning keys");
      }

      const currentAssignment =
        state.userSettings.inputAssignment[state.actionBeingAssignedKeys];
      if (currentAssignment.includes(assignableInput)) {
        // already assigned
        return;
      }

      currentAssignment.push(assignableInput);
    },
    doneAssigningInput(state) {
      state.actionBeingAssignedKeys = undefined;
    },
    menuPressed(state) {
      if (state.openMenus.length > 0) {
        if (state.openMenus.length === 1 && !state.gameRunning) {
          return; // can't exit main menu if game not running
        }

        // go up one menu:
        const [, ...tail] = state.openMenus;
        state.openMenus = tail;
      } else {
        state.openMenus = [{ menuId: "mainMenu", selectedIndex: 0 }];
      }
    },
    menuItemSelected(state) {
      const [{ menuId, selectedIndex }] = state.openMenus;
      const menu = menus[menuId];

      if (selectedIndex === menu.items.length) {
        // a menu item 'after' the end of the menu is the back item:
        const [, ...tail] = state.openMenus;
        state.openMenus = tail;
        return;
      }

      const selectedMenuItem = menu.items[selectedIndex];

      switch (selectedMenuItem.type) {
        case "submenu":
          state.openMenus = [
            { menuId: selectedMenuItem.submenu, selectedIndex: 0 },
            ...state.openMenus,
          ];
          break;
        case "keyPreset": {
          const [, ...tail] = state.openMenus;
          state.openMenus = tail;
          (state as GameMenusState).userSettings.inputAssignment =
            keyAssignmentPresets[selectedMenuItem.preset].inputAssignment;
          break;
        }
        case "key":
          state.actionBeingAssignedKeys = selectedMenuItem.action;
          state.userSettings.inputAssignment[selectedMenuItem.action] = [];
          break;

        case "dispatch":
        case "switch":
          // we rely on the listener api to pick this up and re-dispatch the appropriate action
          // to change the value represented by the switch
          break;
        case "toGame": {
          if (state.gameRunning) {
            state.openMenus = [];
          } else {
            // go to crowns menu page if not already started the game
            state.openMenus = [{ menuId: "crowns", selectedIndex: 0 }];
            state.gameRunning = true;
          }
          break;
        }
        case "back": {
          const [, ...tail] = state.openMenus;
          state.openMenus = tail;
          break;
        }
        case "todo":
          // not implemented - do nothing
          break;
        default:
          selectedMenuItem satisfies never;
      }
    },
    menuDown(state) {
      if (state.actionBeingAssignedKeys !== undefined) {
        // can't move up or down in menu while assigning keys to an action
        return;
      }
      const [{ selectedIndex, menuId }, ...tail] = state.openMenus;
      const menu = menus[menuId];

      let newSelectedIndex = selectedIndex;
      do {
        newSelectedIndex = (newSelectedIndex + 1) % menu.items.length;
      } while (!(menu.items[newSelectedIndex].showIf ?? always)(state));

      state.openMenus = [
        {
          menuId,
          selectedIndex: newSelectedIndex,
        },
        ...tail,
      ];
    },
    menuUp(state) {
      if (state.actionBeingAssignedKeys !== undefined) {
        // can't move up or down in menu while assigning keys to an action
        return;
      }

      const [{ selectedIndex, menuId }, ...tail] = state.openMenus;
      const menu = menus[menuId];

      let newSelectedIndex = selectedIndex;
      do {
        newSelectedIndex =
          (newSelectedIndex - 1 + menu.items.length) % menu.items.length;
      } while (!(menu.items[newSelectedIndex].showIf ?? always)(state));

      state.openMenus = [
        {
          menuId,
          selectedIndex: newSelectedIndex,
        },
        ...tail,
      ];
    },
    holdPressed(state) {
      // do nothing if hold pressed while in menus
      if (state.openMenus.length === 0) {
        state.openMenus = [{ menuId: "hold", selectedIndex: 0 }];
      } else if (state.openMenus[0]?.menuId === "hold") {
        state.openMenus = [];
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
    toggleLivesModel(state) {
      state.userSettings.livesModel =
        state.userSettings.livesModel === "infinite" ? "original" : "infinite";
    },
    toggleCrtFilter(state) {
      state.userSettings.displaySettings.crtFilter =
        !state.userSettings.displaySettings.crtFilter;
    },
    toggleColourise(state) {
      state.userSettings.displaySettings.colourise =
        !state.userSettings.displaySettings.colourise;
    },
    crownCollected(state, { payload: planet }: PayloadAction<PlanetName>) {
      state.planetsLiberated[planet] = true;
      state.openMenus = [{ menuId: "crowns", selectedIndex: 0 }];
    },
    gameOver(state) {
      state.gameRunning = false;
      state.openMenus = [
        { menuId: "gameOver", selectedIndex: 0 },
        { menuId: "mainMenu", selectedIndex: 0 },
      ];
    },
  },
});

export type GameMenusSliceAction = ReturnType<
  ValueOf<typeof gameMenusSlice.actions>
>;

export const {
  setUpscale,
  showScroll,
  menuItemSelected,
  menuDown,
  menuPressed,
  menuUp,
  holdPressed,
  setShowBoundingBoxes,
  setShowShadowMasks,
  toggleColourise,
  toggleCrtFilter,
  toggleLivesModel,
  inputAssigned,
  doneAssigningInput,
  crownCollected,
  gameOver,
} = gameMenusSlice.actions;
