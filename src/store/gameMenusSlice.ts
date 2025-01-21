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
import type { RenderOptions, ShowBoundingBoxes } from "../game/RenderOptions";
import { zxSpectrumResolution } from "../originalGame";
import type { Xy } from "../utils/vectors/vectors";
import type { MarkdownPageName } from "../manual/pages";

export type OpenMenu = {
  menuId: MenuId;
  selectedIndex: number;
};

export type GameMenusState = {
  /**
   * stack of menus currently open - empty if none are
   */
  menus: OpenMenu[];

  /**
   * for the key assignment menu, the key currently being assigned
   */
  actionBeingAssignedKeys: Action | undefined;

  userSettings: {
    renderOptions: RenderOptions;
    emulatedResolution: Xy;
    inputAssignment: InputAssignment;
  };

  gameRunning: boolean;
};

const initialState: GameMenusState = {
  userSettings: {
    renderOptions: {
      upscale: calculateUpscale(
        { x: window.innerWidth, y: window.innerHeight },
        zxSpectrumResolution,
      ),
      showBoundingBoxes: "none",
      showShadowMasks: false,
      crtFilter: true,
      colourise: true,
    },
    emulatedResolution: zxSpectrumResolution,
    inputAssignment: keyAssignmentPresets.default.inputAssignment,
  },
  // when we first load, show the main menu:
  menus: [{ selectedIndex: 0, menuId: "mainMenu" }],
  actionBeingAssignedKeys: undefined,

  gameRunning: false,
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
      state.userSettings.renderOptions.upscale = upscale;
    },
    setEmulatedResolution(
      state,
      { payload: emulatedResolution }: PayloadAction<Xy>,
    ) {
      state.userSettings.emulatedResolution = emulatedResolution;
    },
    showScroll(
      state,
      { payload: markdownPageName }: PayloadAction<MarkdownPageName>,
    ) {
      state.menus = [
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
      if (state.menus.length > 0) {
        if (state.menus.length === 1 && !state.gameRunning) {
          return; // can't exit main menu if game not running
        }

        // go up one menu:
        const [, ...tail] = state.menus;
        state.menus = tail;
      } else {
        state.menus = [{ menuId: "mainMenu", selectedIndex: 0 }];
      }
    },
    menuItemSelected(state) {
      const [{ menuId, selectedIndex }] = state.menus;
      const menu = menus[menuId];

      if (selectedIndex === menu.items.length) {
        // a menu item 'after' the end of the menu is the back item:
        const [, ...tail] = state.menus;
        state.menus = tail;
        return;
      }

      const selectedMenuItem = menu.items[selectedIndex];

      switch (selectedMenuItem.type) {
        case "submenu":
          state.menus = [
            { menuId: selectedMenuItem.submenu, selectedIndex: 0 },
            ...state.menus,
          ];
          break;
        case "keyPreset": {
          const [, ...tail] = state.menus;
          state.menus = tail;
          (state as GameMenusState).userSettings.inputAssignment =
            keyAssignmentPresets[selectedMenuItem.preset].inputAssignment;
          break;
        }
        case "key":
          state.actionBeingAssignedKeys = selectedMenuItem.action;
          state.userSettings.inputAssignment[selectedMenuItem.action] = [];
          break;
        case "switch":
          // we rely on the listener api to pick this up and re-dispatch the appropriate action
          // to change the value represented by the switch
          break;
        case "toGame":
          if (state.gameRunning) {
            state.menus = [];
          } else {
            // go to crowns menu page if not already started the game
            state.menus = [{ menuId: "crowns", selectedIndex: 0 }];
            state.gameRunning = true;
          }
          break;
        case "back": {
          const [, ...tail] = state.menus;
          state.menus = tail;
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
      const [{ selectedIndex, menuId }, ...tail] = state.menus;
      const menu = menus[menuId];

      state.menus = [
        {
          menuId,
          selectedIndex: (selectedIndex + 1) % menu.items.length,
        },
        ...tail,
      ];
    },
    menuUp(state) {
      if (state.actionBeingAssignedKeys !== undefined) {
        // can't move up or down in menu while assigning keys to an action
        return;
      }

      const [{ selectedIndex, menuId }, ...tail] = state.menus;
      const menu = menus[menuId];

      state.menus = [
        {
          menuId,
          selectedIndex:
            (selectedIndex - 1 + menu.items.length) % menu.items.length,
        },
        ...tail,
      ];
    },
    holdPressed(state) {
      // do nothing if hold pressed while in menus
      if (state.menus.length === 0) {
        state.menus = [{ menuId: "hold", selectedIndex: 0 }];
      } else if (state.menus[0]?.menuId === "hold") {
        state.menus = [];
      }
    },
    setShowBoundingBoxes(
      state,
      { payload: showBoundingBoxes }: PayloadAction<ShowBoundingBoxes>,
    ) {
      state.userSettings.renderOptions.showBoundingBoxes = showBoundingBoxes;
    },
    setShowShadowMasks(
      state,
      { payload: showShadowMasks }: PayloadAction<boolean>,
    ) {
      state.userSettings.renderOptions.showShadowMasks = showShadowMasks;
    },
    toggleCrtFilter(state) {
      state.userSettings.renderOptions.crtFilter =
        !state.userSettings.renderOptions.crtFilter;
    },
    toggleColourise(state) {
      state.userSettings.renderOptions.colourise =
        !state.userSettings.renderOptions.colourise;
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
  inputAssigned,
  doneAssigningInput,
} = gameMenusSlice.actions;
